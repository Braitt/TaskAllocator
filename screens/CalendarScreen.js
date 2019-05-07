//exp build:android
//exp build:status
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import Event_view from './Event_view.js';

import EventClass from './eventClass.js';
import DayClass from './dayClass.js';
import MockDB from './mockDB.js';

import { Icon } from 'expo';

export default class AgendaScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expense: { key: 'expense', color: 'blue' },
      income: { key: 'income', color: 'orange' },
      neutral: { key: 'neutral', color: 'green' },

      monthEvents: {},
      markedDates: {},
    };
    //this.loadEvents = this.loadEvents.bind(this);
  }

  render() {
    return (
      <Agenda
        //  displayLoadingIndicator={true}
        renderKnob={() => {
          return (<Icon.Ionicons
            name={'md-arrow-round-down'}
            size={26}
            //style={{ marginBottom: -3 }}
            color={'orange'}
          />);
        }}
        items={this.state.monthEvents}
        firstDay={1}
        selected={new Date()}
        loadItemsForMonth={this.loadEventsForMonth.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={5}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={5}
        markedDates={this.state.markedDates}
        markingType={'multi-dot'}
        theme={{
          agendaKnobColor: 'gray'
        }}
      />
    );
  }

  getMonthEventsDaybyDay(day) {
    console.log(day)

    let calendar = MockDB.getCalendar();
    console.log(calendar)

    let markedDates = {}

    for (let i = 0; i < eventList.length; i++) {
      const event = eventList[i];
      if (!monthEvents[event.getYearMonthDay()]) {
        markedDates[event.getYearMonthDay()] = { startingDay: true, endingDay: true, color: 'black', marked: true, dots: [] }
      }
      if (event.type === EventClass.getTypes().EXPENSE) {
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.expense);
      } else if (event.type === EventClass.getTypes().INCOME) {
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.income);
      } else if (event.type === EventClass.getTypes().NEUTRAL) {
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.neutral);
      }
    }

    this.setState({
      monthEvents: calendar,
      markedDates: markedDates
    });
  }

  //calendar_view
  // Send to agenda all the events for the month
  loadEventsForMonth(day) {
    setTimeout(() => {
      this.getMonthEventsDaybyDay(day);
    }, 1000);
  }

  // Event_view
  renderItem(event) {
    return (
      <Event_view
        style={[styles.event, { height: event.duration * 1.5 }]}
        event={event}
      />
    );
  }
  // Event_view
  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>You have no events for this date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getCalendar(calendar) {
    let calendarR = {};
    let markedDates = {};

    for(event in calendar) {
        calendarR[event] = this.calendar[event].getEvents();
    }

    return {calendarR, markedDates}
}
}

const styles = StyleSheet.create({
  event: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 20
  },
  emptyDate: {
    height: 15,
    flex: 1,
    marginTop: 40,
    padding: 10,
  }
});