import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EasyBluetooth from 'easy-bluetooth-classic';

import { greenColor, redColor} from '../../app.json'
import { saveRecord, deleteAllRecords, retrieveDataForMainPage } from './dataController';
import Dashboard from './Dashboard';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    scanning: false,
    message: '',
    isConnected: false,
    flip: false,
    incomingData: [],
  }

  timer = null;

  componentDidMount() {
    this.onStatusChangeEvent = EasyBluetooth.addOnStatusChangeListener(this.onStatusChange.bind(this));
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
    this.getSavedData();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.onStatusChangeEvent.remove();
    this.onDataReadEvent.remove();
  }

  getSavedData = async () => {
    const incomingData = await retrieveDataForMainPage();
    if (incomingData) {
      this.setState({ incomingData });
    }
  }

  onStatusChange(status) {
    if (status === 'NONE') {
      clearInterval(this.timer);
      this.setState({ isConnected: false });
    } 
    console.log("onStatusChange");
    console.log(status);
  }

  onDataRead = async (data) => {
    if (!data) return;
    const arrayOfData = JSON.parse(data.replace(/\n/g, '').replace(/'/g, '"'));
    if (!arrayOfData.length) return;
    this.setState(prevState => ({ 
      incomingData: [ 
        ...prevState.incomingData.slice(prevState.incomingData.length > 20 ? arrayOfData.length : 0),
        ...arrayOfData,
      ]
    }))
    for (let i = 0; i < arrayOfData.length; i++) {
      let response = await saveRecord(arrayOfData[i]);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderBluetoothConnection()}
        <Dashboard incomingData={this.state.incomingData} navigation={this.props.navigation} />
      </View>
    )
  }

  renderBluetoothConnection() {
    const Material = MaterialCommunityIcons;
    const { message, scanning, isConnected } = this.state;
    let header = <View /> 
    if (isConnected) { 
      header = (
        <TouchableOpacity onPress={this.disconnectBluetooth} style={{ alignItems: 'center' }}>
          <Material name="emoticon-happy-outline" color={greenColor} size={30} />
          <Text style={{ fontSize: 8 }}>DISCONNECT</Text>
        </TouchableOpacity>
      )
    } else if (!isConnected && scanning) {
      header = <ActivityIndicator size="large" color="#0000ff" />
    } else if (!isConnected) {
      header = (
        <TouchableOpacity onPress={this.connectToBluetooth} style={{ alignItems: 'center' }}>
          <Material name="emoticon-dead-outline" color={redColor} size={30} />
          <Text style={{ fontSize: 8 }}>CONNECT</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{ height: 45, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10, marginRight: 20  }}>
        <Button 
          title="clear all"
          color="red"
          onPress={this.deleteAllData}
        />
        <View style={{ marginHorizontal: 5 }}>{message.length > 0 ? <Text>{message}</Text> : null}</View>
        {header}
      </View>
    )
  }

  deleteAllData = async () => {
    const response = await deleteAllRecords();
    if (response === 'success') this.setState({ incomingData: [] });
  }

  disconnectBluetooth = async () => {
    try {
      await EasyBluetooth.stopService();
      this.setState({ message: 'disconnected', isConnected: false, scanning: false });
    } catch (e) {
      this.setState({ message: 'disconnecting failed' })
    }
  }

  connectToBluetooth = async () => {
    const config = {
      uuid: "94f39d29-7d6d-437d-973b-fba39e49d4ee",
      deviceName: "Capstone Project",
      bufferSize: 1024,
      characterDelimiter: "\n"
    }

    await EasyBluetooth.init(config);
    this.setState({ message: 'Ready to Connect' });
    console.log("config done!");


    this.setState({ scanning: true, message: 'connecting' });
    const devices = await EasyBluetooth.startScan();
    this.setState({ message: 'devices found.' });
    let target;
    console.log(devices);
    for (let i = 0; i < devices.length; i++) {
      let c = devices[i];
      if (c.address === "68:07:15:3F:C5:09") {
        target = devices[i];
        break;
      }
    }

    if (target) {
      this.setState({ message: 'connecting to the target'});
      try {
        await EasyBluetooth.connect(target);
        this.setState({ scanning: false, isConnected: true, message: '' });
      } catch (e) {
        this.setState({ scanning: false, message: 'failed to connect ' + e });
        return;
      } 
    } else {
      this.setState({ scanning: false, message: 'device not found' });
    }
  }
}

export default HomeScreen
