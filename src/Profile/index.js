import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Material = MaterialCommunityIcons;

class Profile extends Component {
  settings = [
    { title: 'Vehicle Health History', icon: 'heart-outline' },
    { title: 'Data and Storage', icon: 'database' },
    { title: 'Privacy and Security', icon: 'lock-outline' },
    { title: 'Notifications and Permissions', icon: 'bell-outline' },
    { title: 'Terms of Use Services and Conditions', icon: 'file-outline'},
  ]

  renderUserInfo() {
    return (
      <View style={{ height: 100, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Material name="human-greeting" size={50} color="black" />
        </View>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, color: 'black' }}>Jin Kim</Text>
          <Text>Vehicle: </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderUserInfo()}
        {
          this.settings.map(({ title, icon }) => (
            <SettingRow key={`setting_${title}`} title={title} icon={icon} />
          ))
        }
      </View>
    )
  }
}

const SettingRow = ({ title, icon }) => {
  return (
    <TouchableOpacity style={{ height: 60 }}>
      <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 30, borderBottomColor: 'grey', borderBottomWidth: 0.5 }}>
        <View style={{ width: 50, justifyContent: 'center' }}>
          <Material name={icon} size={30} color="black" />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}><Text>{title}</Text></View>
      </View>
    </TouchableOpacity>
  )
}

export default Profile
