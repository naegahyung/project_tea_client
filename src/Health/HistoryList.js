import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { redColor, greenColor } from '../../app.json';

export class HistoryList extends Component {
  static navigationOptions = {
    title: 'Vehicle Health History'
  }

  history = [
    { id: '123', status: 'ERROR', timestamp: moment().subtract(2, 'h'), error: {
      text: 'Engine Fault',
      errorCode: '77038',
      details: 'Engine is overheated.'
    } },
    { id: '234', status: 'OK', timestamp:  moment().subtract(3,'d'), error: {} },
  ]

  renderHistories() {
    return this.history.map(record => <IndividualRecord key={`record_${record.id}`} data={record} />);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.renderHistories()}
        </ScrollView>
      </View>
    )
  }
}

const IndividualRecord = ({ data }) => {
  const { status, timestamp, error } = data;
  const colorStatus = status === 'OK' ? greenColor : redColor
  const icon = status === 'OK' ? 'check-circle-outline' : 'alert-circle-outline';
  const Material = MaterialCommunityIcons;
  return (
    <View style={{
        height: 200,
        borderBottomColor: colorStatus,
        borderBottomWidth: 1,
        flexDirection: 'row',
      }}>
      <View style={{ borderWidth: 5, borderColor: colorStatus, width: 10, height: 199 }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Material name={icon} size={50} color={colorStatus} />
      </View>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          {
            status === 'ERROR' ?
            <React.Fragment>
              <Text style={styles.textStyle}>{error.text}</Text>
              <Text style={styles.textStyle}>{error.errorCode}</Text>
              <Text style={styles.textStyle}>{error.details}</Text>
            </React.Fragment> :
            <React.Fragment>
              <Text style={styles.textStyle}>We found no error code.</Text>
              <Text style={styles.textStyle}>The vehicle looked healthy!</Text>
            </React.Fragment>
          }
          <View style={{ bottom: 20, position: 'absolute' }}>
            <Text>Checked {timestamp.fromNow()}</Text>
          </View>
        </View>
    </View>
  )
}

const styles = {
  textStyle: {
    color: 'black',
    fontSize: 18,
  }
}

export default HistoryList
