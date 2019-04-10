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
import { Icon } from 'expo';

export default class AgendaScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expense: { key: 'expense', color: 'blue' },
      income: { key: 'income', color: 'orange' },
      neutral: { key: 'neutral', color: 'green' },

      dayEvents: {},
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
    let storage = {
      CASH: 10000,
      DEBITO_BANCOLOMBIA: 100000,
      CREDITO_BANCOLOMBIA_AMERICAN: 800000,
      CREDITO_BANCOLOMBIA_VISA: 900000,
    }
    const ev1 = new EventClass({
      year: 2019, month: 4, day: 10, hour: 10, minute: 0, duration: 90,
      title: "1", category: EventClass.getCategories().TRANSPORT, tags: ["SITP"],
      amount: 2200, type: EventClass.getTypes().EXPENSE,
      account: EventClass.getAccounts().DEBITO_BANCOLOMBIA
    });
    const ev2 = new EventClass({
      year: 2019, month: 4, day: 10, hour: 10, minute: 0, duration: 90,
      title: "2", category: EventClass.getCategories().TRANSPORT, tags: ["UBER"],
      amount: 2200, type: EventClass.getTypes().INCOME,
      account: EventClass.getAccounts().DEBITO_BANCOLOMBIA
    });
    const ev3 = new EventClass({
      year: 2019, month: 4, day: 10, hour: 10, minute: 0, duration: 90,
      title: "3", category: EventClass.getCategories().TRANSPORT, tags: ["UBER"],
      amount: 2200, type: EventClass.getTypes().INCOME,
      account: EventClass.getAccounts().DEBITO_BANCOLOMBIA
    });
    const ev4 = new EventClass({
      year: 2019, month: 4, day: 11, hour: 10, minute: 0, duration: 90,
      title: "4", category: EventClass.getCategories().TRANSPORT, tags: ["SITP"],
      amount: 2200, type: EventClass.getTypes().EXPENSE,
      account: EventClass.getAccounts().DEBITO_BANCOLOMBIA
    });
    const ev5 = new EventClass({
      year: 2019, month: 4, day: 11, hour: 10, minute: 0, duration: 90,
      title: "5", category: EventClass.getCategories().TRANSPORT, tags: ["SITP"],
      amount: 2200, type: EventClass.getTypes().EXPENSE,
      account: EventClass.getAccounts().DEBITO_BANCOLOMBIA
    });
    const ev6 = new EventClass({
      year: 2019, month: 4, day: 20, hour: 10, minute: 0, duration: 90,
      title: "6", category: EventClass.getCategories().TRANSPORT, tags: ["SITP"],
      ammount: 0, type: EventClass.getTypes().NEUTRAL,
      account: EventClass.getAccounts().DEBITO_BANCOLOMBIA
    });

    let eventList = [ev1, ev2, ev3, ev4, ev5, ev6];

    let dayEvents = {};
    let monthEvents = {};
    let markedDates = {}

    const accounts = EventClass.getAccounts();
    const keys = Object.keys(accounts);
    for (let i = 1; i < 32; i++) {
      const date = `${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${i < 10 ? '0' + i : i}`;
      dayEvents[date] = {};
      for (let j = 0; j < keys.length; j++) {
        dayEvents[date][accounts[keys[j]]] = {}
        dayEvents[date][accounts[keys[j]]].dayIncome = 0;
        dayEvents[date][accounts[keys[j]]].dayExpenses = 0;
        dayEvents[date][accounts[keys[j]]].remaining = -1;
      }
    }
    for (let i = 0; i < eventList.length; i++) {
      const event = eventList[i];
      if (!monthEvents[event.getYearMonthDay()]) {
        monthEvents[event.getYearMonthDay()] = []
        markedDates[event.getYearMonthDay()] = { startingDay: true, endingDay: true, color: 'black', marked: true, dots: [] }
      }

      if (event.type === EventClass.getTypes().EXPENSE) {
        dayEvents[event.getYearMonthDay()][event.account].dayExpenses += event.amount;
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.expense);
      } else if (event.type === EventClass.getTypes().INCOME) {
        dayEvents[event.getYearMonthDay()][event.account].dayIncome += event.amount;
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.income);
      } else if (event.type === EventClass.getTypes().NEUTRAL) {
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.neutral);
      }
      monthEvents[event.getYearMonthDay()].push(event.getEvent());
    }
    //fill dates with no events
    for (let i = 1; i < 32; i++) {
      const date = `${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${i < 10 ? '0' + i : i}`;
      const yesterday = `${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${i <= 10 ? '0' + (i-1) : (i-1)}`;
      let dayEvent = dayEvents[date];
      if (i === 1 ){
        for (let j = 0; j < keys.length; j++) {
          dayEvent[accounts[keys[j]]].remaining = storage[accounts[keys[j]]] + 
          dayEvent[accounts[keys[j]]].dayIncome - dayEvent[accounts[keys[j]]].dayExpenses;
        }
      }
      else{
        for (let j = 0; j < keys.length; j++) {
          console.log(yesterday)
          console.log(dayEvents[yesterday])
          dayEvent[accounts[keys[j]]].remaining = 
          dayEvents[yesterday][accounts[keys[j]]].remaining +
          dayEvent[accounts[keys[j]]].dayIncome - dayEvent[accounts[keys[j]]].dayExpenses;
        }
      }
      
      let evReport = new EventClass({
        year: 2019, month: 1, day: 1, hour: 1, minute: 0, duration: 90,
        title: "Report", category: EventClass.getCategories().REPORT, tags: [],
        amount: 0, type: EventClass.getTypes().NEUTRAL,
        account: EventClass.getAccounts().NONE,
        dayEvent: dayEvent
      });
      if (monthEvents[date]) {
        monthEvents[date].unshift(evReport.getEvent());
      }
      else {
        monthEvents[date] = [evReport.getEvent()];
      }
    }
    /*
      Supuestamente a este punto ya crea un evento al inicio del día informando
      los gastos del día
    */
    this.setState({
      dayEvents: dayEvents,
      monthEvents: monthEvents,
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