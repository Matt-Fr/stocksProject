import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

type DateRange =
  | 'oneDay'
  | 'fiveDays'
  | 'oneMonth'
  | 'threeMonths'
  | 'sixMonths'
  | 'oneYear'
  | 'fiveYears';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [NgxEchartsDirective, TabMenuModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [provideEcharts()],
})
export class GraphComponent implements OnChanges {
  @Input() data1: number[] = [];
  @Input() data2: number[] = [];
  @Input() dataXaxis: string[] = [];
  @Input() dataName1: string = '';
  @Input() dataName2: string = '';
  @Output() durationChanged = new EventEmitter<DateRange>();

  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  options!: EChartsOption;

  // Add a listener to detect window resizing
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setMenuItems();
  }

  ngOnInit(): void {
    this.setMenuItems();
  }

  setMenuItems(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      // For mobile screens (width <= 768px)
      this.items = [
        { label: '1D', command: () => this.selectDuration('oneDay') },
        { label: '5D', command: () => this.selectDuration('fiveDays') },
        { label: '1M', command: () => this.selectDuration('oneMonth') },
        {
          label: '3M',
          command: () => this.selectDuration('threeMonths'),
        },
      ];
    } else {
      // For larger screens
      this.items = [
        { label: '1 Day', command: () => this.selectDuration('oneDay') },
        { label: '5 Days', command: () => this.selectDuration('fiveDays') },
        { label: '1 Month', command: () => this.selectDuration('oneMonth') },
        {
          label: '3 Months',
          command: () => this.selectDuration('threeMonths'),
        },
        { label: '6 Months', command: () => this.selectDuration('sixMonths') },
        { label: '1 Year', command: () => this.selectDuration('oneYear') },
        { label: '5 Years', command: () => this.selectDuration('fiveYears') },
      ];
    }

    this.activeItem = this.items[3]; // Set default active item (e.g., 1 Day for mobile)
  }

  selectDuration(range: DateRange): void {
    this.activeItem = this.items.find((item) => item.label === range);
    this.durationChanged.emit(range); // Emit the selected range
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['data1'] ||
      changes['data2'] ||
      changes['dataXaxis'] ||
      changes['dataName1'] ||
      changes['dataName2']
    ) {
      this.updateOptions();
    }
  }

  private updateOptions(): void {
    const allData = [...this.data1, ...this.data2];
    const minValue = Math.min(...allData);
    const maxValue = Math.max(...allData);
    const margin = (maxValue - minValue) * 0.2;
    const roundedMin = Math.round(minValue - margin);
    const roundedMax = Math.round(maxValue + margin);

    this.options = {
      legend: { data: [this.dataName1, this.dataName2], align: 'left' },
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        },
        axisPointer: { type: 'cross' },
      },
      xAxis: {
        data: this.dataXaxis,
        silent: false,
        splitLine: { show: false },
      },
      yAxis: { min: roundedMin, max: roundedMax },
      series: [
        {
          name: this.dataName1,
          type: 'line',
          data: this.data1,
          animationDelay: (idx) => idx * 10 + 100,
        },
        {
          name: this.dataName2,
          type: 'line',
          data: this.data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
}
