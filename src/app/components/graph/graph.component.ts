import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [provideEcharts()],
})
export class GraphComponent implements OnChanges {
  @Input() data1: number[] = [];
  @Input() data2: number[] = [];
  @Input() dataXaxis: number[] = [];

  options!: EChartsOption;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data1'] || changes['data2'] || changes['dataXaxis']) {
      this.updateOptions();
    }
  }

  private updateOptions(): void {
    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: this.dataXaxis,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'line',
          data: this.data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
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
