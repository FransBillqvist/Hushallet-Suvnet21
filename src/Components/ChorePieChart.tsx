import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { AbstractChartProps } from 'react-native-chart-kit/dist/AbstractChart';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

interface Props extends AbstractChartProps {
  data: Array<unknown>;
  hasLegend: boolean; //Visar avatarer till höger
  width: number;
  height: number;
}

const ChorePieChart = (props: Props) => {
  return (
    <PieChart
      data={props.data}
      width={props.width}
      height={props.height}
      chartConfig={chartConfig}
      accessor='contribution'
      backgroundColor='transparent'
      paddingLeft='0'
      hasLegend={props.hasLegend}
      // center={[10, 50]}
      absolute
      // avoidFalseZero={false}
    />
  );
};
export default ChorePieChart;
