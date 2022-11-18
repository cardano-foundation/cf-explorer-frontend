import React from 'react';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './index.module.scss';

interface Props { }

const data: [string, number][] = new Array(16).fill(0).map((_, i) => ([moment().add(i - 15, "day").format("MMM DD").toString(), 880000 + Math.floor(100000 * i * (Math.random() - .3))]));
const categories = new Array(16).fill(0).map((_, i) => !i || i === 15 ? moment().add(i - 15, "day").format("MMM DD").toString() : '');

const TransactionChart: React.FC<Props> = () => {

  return (
    <div className={styles.transactionChart}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: { type: 'areaspline' },
          title: { text: '' },
          yAxis: {
            title: { text: null },
            lineWidth: 1,
            lineColor: '#E3E5E9',
            gridLineWidth: 0
          },
          xAxis: {
            categories,
            lineWidth: 1,
            lineColor: '#E3E5E9',
            plotLines: []
          },
          legend: { enabled: false },
          tooltip: { shared: true, valueSuffix: " transactions" },
          credits: { enabled: false },
          series: [{
            name: "",
            pointPlacement: 'between',
            type: "areaspline",
            marker: { enabled: false },
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, '#184C78'],
                [1, '#5A9C56']
              ]
            },
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, 'rgba(24, 76, 120, 0.3)'],
                [1, 'rgba(90, 156, 86, 0)']
              ]
            },
            data
          }]
        }}
      />
    </div>
  )

}

export default TransactionChart;