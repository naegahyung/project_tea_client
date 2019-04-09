import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Step0 = ({ start, color }) => {
  const Material = MaterialCommunityIcons;
  return (
    <React.Fragment>
      <TouchableOpacity onPress={start}>
        <View style={{ transform: [{ rotate: '20deg' }] }}>
          <Material name="flash-circle" size={150} color={color} />
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 20 }}>Hit <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Flash</Text> to start diagnosing!</Text>
      </View>
    </React.Fragment>
  )
}

export default Step0
