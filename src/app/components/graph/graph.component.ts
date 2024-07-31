import { Component, Input, input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css',
  providers: [provideEcharts()],
})
export class GraphComponent {
  options!: EChartsOption;
  constructor() {}
  @Input() data1!: number[];

  ngOnInit(): void {
    const xAxisData = [];

    // const data2 = [];

    for (let i = 0; i < 100; i++) {
      //need to change this
      xAxisData.push('category' + i);
      // data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      // data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
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
        // {
        //   name: 'bar2',
        //   type: 'line',
        //   data: data2,
        //   animationDelay: (idx) => idx * 10 + 100,
        // },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
}
