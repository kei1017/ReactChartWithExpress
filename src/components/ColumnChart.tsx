import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useLayoutEffect } from 'react';

function ColumnChart(props: { chartID: string; data: any }) {
  useLayoutEffect(() => {
    const root = am5.Root.new(props.chartID);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
      })
    );

    let cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'zoomX',
      })
    );
    cursor.lineY.set('visible', false);

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: {
          count: 1,
          timeUnit: 'day',
        },
        maxDeviation: 0,
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
        valueXField: 'date',
        valueYField: 'value',
        xAxis: xAxis,
        yAxis: yAxis,
      })
    );

    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      })
    );

    series.data.setAll(props.data);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [props]);

  return <div id={props.chartID} style={{ height: 300, width: '100%' }}></div>;
}

export default ColumnChart;
