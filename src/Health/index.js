import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Step0 from './step0';
import Step1 from './step1';
import Step2 from './step2';
import { majorColor } from '../../app.json';

class Health extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    step: 0,
    isSuccessful: false,
  }

  initialScreen = () => {
    this.setState({ step: 0 })
  }

  startProcess = () => {
    this.setState({ step: 1 });
  }

  endLoading = () => {
    this.setState({ step: 2 });
  }

  goHistoryPage = () => {
    this.props.navigation.navigate('History');
  }

  renderBackButton() {
    if (this.state.step !== 1) return null;
    const Material = MaterialCommunityIcons;
    return (
      <View style={{ position: 'absolute', top: 50, left: 30}}>
        <TouchableOpacity onPress={this.initialScreen}>
          <Material name="close-circle-outline" color="#C9415E" size={50} />
        </TouchableOpacity>
      </View>
    )
  }

  renderViewHistoryButton() {
    if (this.state.step === 1) return null;
    return (
      <TouchableOpacity style={{ marginTop: 50 }} onPress={this.goHistoryPage}>
        <Text style={{ textDecorationLine: 'underline' }}>View History</Text>
      </TouchableOpacity>
    )
  }


  render() {
    const { step, isSuccessful } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {this.renderBackButton()}
        <View style={{ flex: 1,  alignItems:'center', justifyContent: 'center' }}>
          {
            step === 0 ? <Step0 start={this.startProcess} color={majorColor} /> :
            step === 1 ? <Step1 end={this.endLoading} color={majorColor} /> :
            step === 2 ? <Step2 success={isSuccessful} reset={this.initialScreen} goHistory={this.goHistoryPage} /> :
            null
          }
          {this.renderViewHistoryButton()}
        </View>
      </View>
    ) 
  }
}

export default Health
