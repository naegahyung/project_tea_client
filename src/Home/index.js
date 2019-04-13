import React, { Component } from 'react'
import { View, Text, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import LineGraph from './LineGraph';

const speedData = [0,3,8,14,20,28,30,32,29,27,27,27,29,33,35] //15
const airFlowRateData = [10.3, 11.31, 11.78, 19.83, 30.25, 35.69, 39.19, 41.11, 40.82, 38.32, 38.11, 38.19, 40.18, 44.36, 45.11 ];
const temperatureData = [ 195.6, 195.6, 195.7, 195.7, 195.7, 195.8, 195.8, 195.9, 196.0, 196.0, 196.1, 196.1, 196.0, 195.9, 196.0 ];
const data = [];

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    scanning: false,
    message: '',
    isConnected: false,
    device: null,
  }

  bluetoothManager = new BleManager();

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderBluetoothConnection()}
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

  renderBluetoothConnection() {
    const { message, scanning, isConnected } = this.state;
    let header = <View /> 
    if (isConnected) { 
      header = <Text>Connected 00:DB:DF:7C:FD:43</Text>
    } else if (!isConnected && scanning) {
      header = <ActivityIndicator size="large" color="#0000ff" />
    } else {
      header = (
        <Button
          title="Connect"
          onPress={this.connectToBluetooth}
        />
      )
    }
    return (
      <View>
        {message.length > 0 ? <Text>{message}</Text> : null}
        {header}
      </View>
    )
  }

  connectToBluetooth = () => {
    let timeout; 
    this.setState({ scanning: true });
    this.bluetoothManager.startDeviceScan(null, null, async (error, device) => {
      if (!device) return;
      timeout = setTimeout(() => {
        this.stopScanning();
      }, 30000)
      if (error) {
        return
      }

      if (device.id == '00:DB:DF:7C:FD:43') {
        clearTimeout(timeout);
        this.stopScanning();
        try {
          let device = await this.bluetoothManager.connectToDevice('00:DB:DF:7C:FD:43');
          device = await device.discoverAllServicesAndCharacteristics()
          console.log(device);
          this.setState({ device });
          return;
        } catch (e) {
          this.setState({ message: 'failed to connect after discovery ' + e })
          this.connectToBluetooth();
          console.log("error ", e);
        }
      }
    });
  }

  stopScanning = () => {
    this.setState({ scanning: false, message: '' });
    this.bluetoothManager.stopDeviceScan();
  }

  navigateToDataCollection = () => {
    this.props.navigation.navigate('RecordsPage', {
      device: this.state.device,
    })
  }

  renderSettingIcon() {
    const Material = MaterialCommunityIcons
    return (
      <TouchableOpacity onPress={this.navigateToDataCollection}>
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
      </TouchableOpacity>
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
