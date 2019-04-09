import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import MapView, { Polyline } from 'react-native-maps'

import decode from '../utils/decode'
import data from './data/trip.json'
import { majorColor } from '../../app.json';

export class TravelMap extends Component {
  state = {
    coordinates: [],
  }

  mapViewRef = null;
  trip = data[`trip${this.props.tripId}`]

  componentDidMount() {
    this.setState({ coordinates: decode(this.trip.code) });
  }

  initializeMap = () => {
    this.mapViewRef.fitToCoordinates(this.state.coordinates, {
      edgePadding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
      animated: false
    })
  }

  render() {
    const { region } = this.props; 
    return (
      <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, paddingVertical: 5 }}>
        <View style={{ margin: 20, height: 250, }}>
          <MapView
            liteMode
            ref={ref => this.mapViewRef = ref}
            style={{ flex: 1 }}
            onLayout={this.initializeMap}
          >
            <Polyline
              coordinates={this.state.coordinates}
              strokeColor={majorColor}
              strokeWidth={2}
            />
          </MapView>
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: 'black', fontSize: 15 }}>Distance: {this.trip.distance}</Text>
            <Text><Text style={{ color: 'black', fontSize: 15 }}>Start:</Text> {this.trip.start_address}</Text>
            <Text><Text style={{ color: 'black', fontSize: 15 }}>End:</Text> {this.trip.end_address}</Text>
            <TouchableOpacity style={{ marginTop: 10 }}>
              <Text style={{ textDecorationLine: 'underline'}}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default TravelMap
