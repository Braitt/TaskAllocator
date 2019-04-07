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

export default class AgendaScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expense: {key:'expense', color: 'blue'},
      income: {key:'income', color: 'green'},
      neutral: {key:'neutral', color: 'orange'},

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
        renderKnob={() => {return (<Icon.Ionicons
          name={'md-create'}
          size={26}
          //style={{ marginBottom: -3 }}
          color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />);}}
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

  getMonthEventsDaybyDay(day){
    console.log(day)

    const ev1 = new EventClass({ 
      year: 2019, month: 4, day: 10, hour: 10, minute: 0, duration: 90, 
      title: "1", category: EventClass.categories.TRANSPORT, tags: ["SITP"],
      ammount: 2200, type: EventClass.types.EXPENSE, 
      account: EventClass.accounts.DEBITO_BANCOLOMBIA 
    });
    const ev2 = new EventClass({ 
      year: 2019, month: 4, day: 10, hour: 10, minute: 0, duration: 90, 
      title: "2", category: EventClass.categories.TRANSPORT, tags: ["SITP"],
      ammount: 2200, type: EventClass.types.INCOME, 
      account: EventClass.accounts.DEBITO_BANCOLOMBIA 
    });
    const ev3 = new EventClass({ 
      year: 2019, month: 4, day: 11, hour: 10, minute: 0, duration: 90, 
      title: "3", category: EventClass.category.TRANSPORT, tags: ["SITP"],
      ammount: 2200, type: EventClass.types.EXPENSE, 
      account: EventClass.accounts.DEBITO_BANCOLOMBIA 
    });
    const ev4 = new EventClass({ 
      year: 2019, month: 4, day: 20, hour: 10, minute: 0, duration: 90, 
      title: "4", category: EventClass.categories.TRANSPORT, tags: ["SITP"],
      ammount: 0, type: EventClass.types.NEUTRAL, 
      account: EventClass.accounts.DEBITO_BANCOLOMBIA 
    });

    let eventList = [ev1, ev2, ev3, ev4];

    let dayEvents = {};
    let monthEvents = {};
    let markedDates = {}

    const accounts = EventClass.accounts;
    const keys = Object.keys(accounts);
    console.log(keys);

    for(let i=0; i < eventList.length; i++ ) {
      const event = eventList[i];
      if(!dayEvents[event.getYearMonthDay()]){
        dayEvents[event.getYearMonthDay()] = { };
        for(let j = 0; j< keys.length; j++ ){
          dayEvents[event.getYearMonthDay()][accounts[keys]].dayIncomes = 0;
          dayEvents[event.getYearMonthDay()][accounts[keys]].dayExpenses = 0;
        }

        monthEvents[event.getYearMonthDay()] = []
        markedDates[event.getYearMonthDay()] = {startingDay: true, selected: true, endingDay: true, color: 'green', textColor: 'gray', marked: true, dots: []}
      }

      if(event.type === EventClass.EXPENSE) {
        dayEvents[event.getYearMonthDay()][event.account].dayExpenses += event.ammount;
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.expense);
      } else if (event.type === EventClass.INCOME) {
        dayEvents[event.getYearMonthDay()][event.account].dayIncome += event.ammount;
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.income);
      } else if (event.type === EventClass.NEUTRAL) {
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.neutral);
      }

      monthEvents[event.getYearMonthDay()].push(event.getEvent());
    }
    //fill dates with no events
    
    for (let i = 1; i < 32; i++) {
      const date = `${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${i < 10 ? '0' + i : i}`;
      const dayEvent = dayEvents[date];
      let evReport = new EventClass({
        year: 2019, month: 1, day: 1, hour: 1, minute: 0, duration: 90,
        title: "Report at end day", category: EventClass.categories.REPORT, tags: [],
        ammount: 0, type: EventClass.types.NEUTRAL,
        account: EventClass.accounts.NONE,
        dayEvent: dayEvent
      });
      monthEvents[date].unshift(evReport.getEvent());
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