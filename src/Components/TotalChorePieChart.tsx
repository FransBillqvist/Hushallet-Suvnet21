import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { AbstractChartProps } from 'react-native-chart-kit/dist/AbstractChart';
import { Text } from 'react-native-paper';

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

const TotalChorePieChart = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={{ marginLeft: 230 }}>
          <PieChart
            data={props.data}
            width={props.width}
            height={props.height}
            chartConfig={chartConfig}
            accessor='contribution'
            backgroundColor='transparent'
            paddingLeft='0'
            hasLegend={false}
            center={[0, 0]}
            absolute
          />
        </View>
        <View>
          <Text>Totalt</Text>
        </View>
      </View>
      <View style={styles.legendContainer}>
        {props.data.map(({ name, color }: any) => (
          <View key={name} style={styles.legendContainer2}>
            <View style={[styles.colorContainer, { backgroundColor: color }]}></View>
            <View>
              <Text style={styles.textContainer}>{name}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  legendContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorContainer: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  textContainer: {
    paddingLeft: 8,
    fontSize: 25,
  },
});

export default TotalChorePieChart;
