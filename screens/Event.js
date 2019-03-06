import React, { Component } from 'react';

import {
  View,
  Platform,
  TextInput,
  Text
} from 'react-native';

export default class Event extends Component {

  render() {
      return(
        <View style={this.props.style}>
          <Text>
            {this.props.item.title}
            </Text>
        </View>
      )
  }
}