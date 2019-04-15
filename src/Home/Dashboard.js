import React, { Component } from 'react'
import { Text, View } from 'react-native'

import LineGraph from './LineGraph';

export class Dashboard extends Component {
  state = {
    speedData: [],

  }
  render() {
    return (
      <React.Fragment>
        {this.renderTopGraphs()}
        {this.renderBottomGraphs()}
      </React.Fragment>
    )
  }

  renderTopGraphs = () => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {this.renderDashboard1()}
      {this.renderDashboard2()}
    </View>  
  )

  renderBottomGraphs = () => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {this.renderDashboard3()}
      {this.renderDashboard4()}
    </View>
  )

  renderDashboard1 = () => (
    <View style={{ flex: 1 }}>
      <LineGraph
        data={this.props.incomingData.filter(data => data.name && data.name.includes('Speed')).map(({ value }) => value)}
        title="Speed"
        unit="KPH"
        onGraphClick={() => this.props.navigation.navigate('DetailPage', {
          title: 'Vehicle Speed',
          unit: 'MPH',
        })}
      />
    </View>
  )

  renderDashboard2 = () => (
    <View style={{ flex: 1 }} >
      <LineGraph 
        data={this.props.incomingData.filter(data => data.name && data.name.includes('Temp')).map(({ value }) => value)}
        title="Engine Temperature" 
        unit="°C" 
      />
    </View>
  )

  renderDashboard3 = () => (
    <View style={{ flex: 1 }}>
      <LineGraph 
        data={this.props.incomingData.filter(data => data.name && data.name.includes('Fuel')).map(({ value }) => value)}
        title="Fuel Level" 
        unit="%" 
      />
    </View>
  )

  renderDashboard4 = () => (
    <View style={{ flex: 1 }}>
      <LineGraph 
        data={this.props.incomingData.filter(data => data.name && data.name.includes('Revolution')).map(({ value }) => value)}
        title="Revolution" 
        unit="rpm" 
      />
    </View>
  )
}

export default Dashboard
