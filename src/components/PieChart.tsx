import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useLayoutEffect } from 'react';

function Pie(props: { chartID: string; data: any }) {
  useLayoutEffect(() => {
    const root = am5.Root.new(props.chartID);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {})
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        categoryField: 'category',
        valueField: 'value',
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
export default Pie;
