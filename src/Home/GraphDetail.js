import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import LineGraph from './LineGraph';

export class GraphDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Details for ${navigation.getParam('title', '')}`
    }
  } 

  state = {
    data: this.props.navigation.getParam('data', []),
    isFetchingLiveData: false,
  }

  liveData = null
  liveDataSubscription = null

  componentDidMount() {
    this.liveDataSubscription = this.props.navigation.addListener(
      'willBlur',
      () => {
        this.resetAppendingData();
        this.setState({ isFetchingLiveData: false });
      })
  }

  componentWillUnmount() {
    this.resetAppendingData();
    this.liveDataSubscription.remove();
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
        {this.renderLiveDataFetchButton()}
      </View>
    )
  }

  renderLiveDataFetchButton() {
    const { isFetchingLiveData } = this.state;
    return (
      <View>
        <Button onPress={this.toggleLiveData} title={isFetchingLiveData ? "Stop Data Feeding" : "Start Data Feeding"} />
      </View>
    )
  }

  toggleLiveData = () => {
    if (!this.state.isFetchingLiveData) {
      this.appendData();
      this.liveData = setInterval(() => {
        this.appendData();
      }, 3000)
    } else {
      clearInterval(this.liveData);
      this.setState({ isFetchingLiveData: false });
    }
  }

  appendData = () => {
    this.setState(prevState => ({
      data: prevState.data.slice(1).concat([ Math.random() * 5 + 35 ]),
      isFetchingLiveData: true,
    }));
  }
}

export default GraphDetail
