import React, { Component } from 'react'
import { View, Text } from 'react-native';
import LineGraph from './LineGraph';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const speedData = [0,3,8,14,20,28,30,32,29,27,27,27,29,33,35] //15
const airFlowRateData = [10.3, 11.31, 11.78, 19.83, 30.25, 35.69, 39.19, 41.11, 40.82, 38.32, 38.11, 38.19, 40.18, 44.36, 45.11 ];
const temperatureData = [ 195.6, 195.6, 195.7, 195.7, 195.7, 195.8, 195.8, 195.9, 196.0, 196.0, 196.1, 196.1, 196.0, 195.9, 196.0 ];
const data = [];

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderTopBar()}
        {this.renderTopGraphs()}
        {this.renderBottomGraphs()}
      </View>
    )
  }

  renderTopBar() {
    return (
      <View style={{ height: 30, marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'black' }}>Welcome Jin!</Text>
        {this.renderSettingIcon()}
      </View>
    )
  }

  renderSettingIcon() {
    const Material = MaterialCommunityIcons
    return (
      <View style={{
        marginHorizontal: 20,
        top: 2,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
      }}>
        <Material name="car-side" size={30} style={{ left: 5 }} />
        <Material name="information-variant" size={20} style={{ right: 2 }} />
      </View>
    );
  }

  renderTopGraphs = () => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {this.renderSpeedDashboard()}
      {this.renderRPMDashboard()}
    </View>  
  )

  renderBottomGraphs = () => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {this.renderTemperatureDashboard()}
      {this.renderPressureDashboard()}
    </View>
  )

  renderSpeedDashboard = () => (
    <View style={{ flex: 1 }}>
      <LineGraph
        data={speedData}
        title="Speed"
        unit="MPH"
        onGraphClick={() => this.props.navigation.navigate('DetailPage', {
          data: speedData,
          title: 'Speed',
          unit: 'MPH',
        })}
      />
    </View>
  )

  renderRPMDashboard = () => (
    <View style={{ flex: 1 }} >
      <LineGraph data={airFlowRateData.map(e => e * 1.5)} title="Mass Air Flow Rate" unit="g/s" />
    </View>
  )

  renderTemperatureDashboard = () => (
    <View style={{ flex: 1 }}>
      <LineGraph data={temperatureData} title="Temperature" unit="°F" />
    </View>
  )

  renderPressureDashboard = () => (
    <View style={{ flex: 1 }}>
      <LineGraph data={data} title="Pressure" unit="Pa" />
    </View>
  )
}

export default HomeScreen
