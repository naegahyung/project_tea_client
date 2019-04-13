import React, { Component } from 'react'
import { Text, View, Alert, ScrollView, Button } from 'react-native'

import { retrieveAllRecords, deleteAllRecord, storeRecord } from './dataController';

class DataRecording extends Component {
  static navigationOptions = {
    title: "Data recording"
  }

  state = {
    records: [],
  }

  device = null;

  readInterval = null;

  componentDidMount() {
    this.mockData();
    this.device = this.props.navigation.getParam('device', null);
    if (!this.device) {
      this.setState({ records: [] });
      return;
    }
    this.readInterval = setInterval(() => {
      this.getInfo();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.readInterval);
  }

  getInfo = async () => {
    let characteristic = await device.readCharacteristicForDevice('00:DB:DF:7C:FD:43', null, null)
    console.log(characteristic);
    this.setState(prevState => ({ 
      records: prevState.records.concat([ JSON.stringify(characteristic )]) 
    }));
  }

  deleteAll = () => {
    Alert.alert(
      'Delete All',
      'This is irreversible deletion. Continue?',
      [
        {text: 'Yes', onPress: async () => {
          await deleteAllRecord();
          this.setState({ records: [] })
        }},
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  }

  mockData = () => {
    const records = [];
    for (let i = 0; i < 100; i++) {
      records.push("hey " + i);
    } 
    this.setState({ records });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderScrollView()}
        <View style={{ height: 50 }}>
          <Button 
            style={{ flex: 1 }}
            title="delete All"
            color="red"
            onPress={this.deleteAll}
          />
        </View>
      </View>
    )
  }

  renderScrollView() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {
          this.state.records.map((record, i) => (
            <View key={`${record}_${i}`} style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, padding: 5}}>
              <Text>{record}</Text>
            </View>
          ))
        }
      </ScrollView>
    )
  }
}

export default DataRecording
