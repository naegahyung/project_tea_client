import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Animated } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { redColor, greenColor } from '../../app.json';

const Material = MaterialCommunityIcons;

export class Step2 extends Component {
  state = {
    springAnim: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.spring(
      this.state.springAnim,
      {
        toValue: 1,
        friction: 10
      }
    ).start()
  }

  renderResult() {
    return this.props.success ?
      <SuccessStep2 scale={this.state.springAnim} /> :
      <FailStep2 scale={this.state.springAnim} />
  }

  render() {
    return (
      <React.Fragment>
        {this.renderResult()}
        <TouchableOpacity
          style={{ backgroundColor: 'white', marginTop: 50, borderColor: 'grey', borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10 }}
          onPress={this.props.reset} 
        >
          <Text style={{ color: 'black' }}>Go Back</Text>
        </TouchableOpacity>
      </React.Fragment>
    )
  }
}

const SuccessStep2 = ({ scale }) => {
  return (
    <React.Fragment>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Material name="check-circle-outline" size={200} color={greenColor} />
      </Animated.View>
      <Text style={{ fontSize: 20, color: 'black' }}>Everything looks good for now!</Text>
      <Text style={{ fontSize: 20, color: 'black' }}>We could not find any error.</Text>
    </React.Fragment>
  )
}

const FailStep2 = ({ scale }) => {
  return (
    <React.Fragment>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Material name="alert-circle-outline" size={200} color={redColor} />
      </Animated.View>
      <Text style={{ fontSize: 20, color: 'black' }}>{2} Warnings</Text>
      <TouchableOpacity style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, color: 'black', textDecorationLine: 'underline' }}>Click to view Details</Text>
      </TouchableOpacity>
    </React.Fragment>
  )
}



export default Step2
