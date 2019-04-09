import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native';
import TravelMap from './TravelMap';

export class TripScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderTitle()}
        <ScrollView>
          <TravelMap tripId={1} />
          <TravelMap tripId={2} />
          <TravelMap tripId={3}/>
          <TravelMap tripId={4}/>
        </ScrollView>
      </View>
    )
  }

  renderTitle() {
    return (
      <View style={{ height: 80, backgroundColor: '#2980b9' }}>
        <View style={{ marginHorizontal: 30, marginTop: 20 }}>
          <Text style={{ fontSize: 30, color: 'white' }}>
            Travel History
          </Text>
        </View>
      </View>
    )
  }
}

export default TripScreen
