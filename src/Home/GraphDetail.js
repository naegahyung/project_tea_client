import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import LineGraph from './LineGraph';
import { retrieveRecords } from './dataController'; 

export class GraphDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Details for ${navigation.getParam('title', '')}`
    }
  }

  state = {
    data: [],
    isFetchingLiveData: false,
  }

  liveData = null

  componentDidMount() {
    this.liveData = setInterval(() => {
      this.callData();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  callData = async () => {
    const data = await retrieveRecords(this.props.navigation.getParam('title', ''));
    this.setState({ data });
  }

  componentWillUnmount() {
    this.resetAppendingData();
  }

  resetAppendingData() {
    clearInterval(this.liveData);
    this.liveData = null;
  }
  
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', '')
    const { data } = this.state;
    return (
      <View style={{ flex: 1, marginVertical: 20, marginHorizontal: 10 }}>
        <LineGraph
          isDetailGraph
          data={data}
          title={title}
          unit={navigation.getParam('unit', '')}
        />
      </View>
    )
  }
}

export default GraphDetail
