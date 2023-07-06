import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-chart-matrix',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './chart-matrix.component.html',
  styleUrls: ['./chart-matrix.component.scss'],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts: () => import('echarts') }),
    },
  ],
})
export class ChartMatrixComponent implements OnChanges {
  @Input() public model_name = '';
  @Input() public data: number[] = [];

  public chartOption!: EChartsOption;
  public mergeOption!: EChartsOption;
  public labels: Array<string> = [];

  ngOnChanges(): void {
    this.labels = [
      'Confusion matrix for',
      'Predicted results',
      'Actual results',
    ];

    this.mergeOption = {
      title: {
        text: 'Confusion matrix for ' + this.model_name,
      },
      xAxis: {
        name: 'Predicted results',
        data: this.labels,
      },
      yAxis: {
        name: 'Actual results',
        data: this.labels.slice().reverse(),
      },
    };
    this.chartOption = {
      title: {
        top: 'top',
        left: 'center',
      },
      animation: false,
      grid: {
        height: '80%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        nameLocation: 'middle',
        nameTextStyle: {
          fontSize: 14,
          lineHeight: 60,
        },
        position: 'top',
        splitArea: {
          show: true,
        },
        type: 'category',
      },
      yAxis: {
        nameLocation: 'middle',
        nameTextStyle: {
          fontSize: 14,
          lineHeight: 60,
        },
        type: 'category',
        splitArea: {
          show: true,
        },
        axisLabel: {
          show: true,
          rotate: 90,
        },
      },
      visualMap: {
        inRange: {
          color: [
            '#35193e',
            '#701f57',
            '#ad1759',
            '#e13342',
            '#f37651',
            '#f6b48f',
          ],
        },
        show: false,
      },
      dataset: {
        source: {
          x: [0, 1, 2, 0, 1, 2, 0, 1, 2],
          y: [2, 2, 2, 1, 1, 1, 0, 0, 0],
          score: this.data,
        },
      },
      series: [
        {
          type: 'heatmap',
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }
}
