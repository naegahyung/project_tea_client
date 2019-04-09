import React from 'react'
import { Text, View, ActivityIndicator, Animated } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class Step1 extends React.Component  {
  state = {
    fadeAnim: new Animated.Value(0),
    textStep: 0,
  }
  textLoop = null;
  messages = [
    'Trying to connect to your vehicle...',
    'Checking if your vehicle has any common issue...',
    'Looks good so far. Running more thorough check-ups...',
    'Did you know that',
    'Please wait one moment while we wrap up the result!',
  ]

  componentDidMount() {
    const { fadeAnim } = this.state;
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500
        })
      ]),
      {
        iterations: -1,
        useNativeDriver: true,
      }
    ).start()
    this.loopTextMessages();
  }

  componentWillUnmount() {
    clearTimeout(this.textLoop);
  }

  loopTextMessages() {
    this.textLoop = setTimeout(() => {
      this.setState(prevState => ({ 
        textStep: prevState.textStep + 1 
      }), () => {
        if (this.state.textStep < 4) {
          this.loopTextMessages();
        } else {
          this.props.end();
        }
      })
    }, (Math.random() * 2000) + 3000)
  }

  render() {
    const Material = MaterialCommunityIcons;
    const { fadeAnim, text } = this.state;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Material name="progress-wrench" size={100} color={this.props.color}/>
        </Animated.View>
        <View style={{ marginTop: 30 }}>
          <Text style={{ color: 'black' }}>{this.messages[this.state.textStep]}</Text>
        </View>
      </View>
    )
  }
  
}

export default Step1
