import React, { Component } from 'react';

import {
  View,
  Platform,
  TextInput,
  Text
} from 'react-native';

export default class Event_view extends Component {

  render() {
      return(
        <View style={this.props.style}>
          <Text>
            {this.props.event.title}
          </Text>
        </View>
      )
  }
}