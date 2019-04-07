import React, { Component } from 'react';

import {
  View,
  Platform,
  TextInput,
  Text
} from 'react-native';
import EventClass from './eventClass';

export default class Event_view extends Component {

  render() {
    let style = this.props.style;
    let event = this.props.event;
    if( event.category === EventClass.categories.REPORT) {
      style.backgroundColor = 'blue'
    }
      return(
        <View style={style}>
          <Text>
            {this.props.event.title}
            
            {/**Ponerle la hora y color dependiendo del tipo de evento */}

            {this.props.event.dayEvent !== null &&
              "Today's income: " + this.props.event.dayEvent.dayIncome + "\n" +
              "Today's expenses: " + this.props.event.dayEvent.dayExpenses + "\n" 
              //this.props.

            }
          </Text>
        </View>
      )
  }
}