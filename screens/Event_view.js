import React, { Component } from 'react';

import {
  View,
  Platform,
  TextInput,
  Text
} from 'react-native';
import EventClass from './eventClass';

export default class Event_view extends Component {

  getReport(dayEvent) {
    let keys = Object.keys(dayEvent);
    let totalIncome = 0;
    let totalExpenses = 0;
    let moneyRemaining = '';
    let moneyByAccount = '';

    for (let i = 0; i < keys.length; i++) {
      const account = dayEvent[keys[i]];
      if (keys[i] !== EventClass.getAccounts().NONE) {
        if (account.dayIncome) {
          moneyByAccount += '\n' + keys[i] + ' incomes: ' + account.dayIncome;
          totalIncome += account.dayIncome
        }
        if (account.dayExpenses) {
          moneyByAccount += '\n' + keys[i] + ' expenses: ' + account.dayExpenses;
          totalExpenses += account.dayExpenses
        }
        moneyRemaining += '\n' + keys[i] + ' remaining: ' + account.remaining;
      }
    }
    return `\nToday's Income: ${totalIncome} \nToday's Expenses: ${totalExpenses}` + 
    `${moneyByAccount} ${moneyRemaining}`
  }

  render() {
    let style = this.props.style;
    let event = this.props.event;

    if (event.category === EventClass.getCategories().REPORT) {
      style.push({ 'backgroundColor': '#A5FFFD' })
    }
    return (
      <View style={style}>
        <Text>
          {this.props.event.title}

          {/**Ponerle la hora y color dependiendo del tipo de evento */}

          {this.props.event.dayEvent &&
            this.getReport(this.props.event.dayEvent)
          }
        </Text>
      </View>
    )
  }
}