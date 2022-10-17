import { PieChart } from 'react-native-chart-kit';
import { AbstractChartProps } from 'react-native-chart-kit/dist/AbstractChart';
import React from 'react';

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
}

const ChorePieChart = (props: Props) => {
  return (
    <PieChart
      data={props.data}
      width={250}
      height={200}
      chartConfig={chartConfig}
      accessor='contribution'
      backgroundColor='transparent'
      paddingLeft='20'
      // center={[10, 50]}
      absolute
      hasLegend={false} //Visar statistik till höger
      avoidFalseZero={true}
    />
  );
};
export default ChorePieChart;
