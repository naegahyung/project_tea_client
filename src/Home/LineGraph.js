import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Grid, LineChart, YAxis } from 'react-native-svg-charts'
import { majorColor, lightColor } from '../../app.json';
import * as shape from 'd3-shape'

class LineGraph extends Component {
  shouldComponentUpdate() {
    return true;
  } 
  
  render() {
    const { data, title, onGraphClick, isDetailGraph } = this.props;

    if (!data || !data.length) {
      return (
        <View style={styles.chartContainer}>
          <Text style={{ textAlign: 'center' }}>No Data Available For</Text>
          {this.renderTitle(title)}
        </View>
      )
    }
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={onGraphClick} disabled={isDetailGraph}>
        <View style={styles.chartContainer}>
          {this.renderGraph(data)}
          {!isDetailGraph && this.renderTitle(title)}
        </View>
      </TouchableOpacity>
    )
  }

  renderTitle = (title) => (
    <Text style={{ textAlign: 'center', color: 'black' }}>{title}</Text>
  )

  renderGraph = (data) => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <YAxis
        data={ data }
        contentInset={{ top: 20, bottom: 20 }}
        svg={{
            fill: 'black',
            fontSize: 10,
        }}
        numberOfTicks={ 5 }
        formatLabel={ value => `${value} ${this.props.unit}` }
      />
      <LineChart
          style={styles.chart}
          data={ data }
          curve={shape.curveNatural }
          svg={{ stroke: majorColor }}
          contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid/>
      </LineChart>
    </View>
  )
}

const styles = {
  chart: {
    flex: 1,
  },
  chartContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  
  }
}

export default LineGraph
