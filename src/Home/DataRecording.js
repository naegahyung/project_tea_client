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

  manager = null;

  componentDidMount() {
    this.mockData();
    this.manager = this.props.navigation.getParam('manager', null);
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
