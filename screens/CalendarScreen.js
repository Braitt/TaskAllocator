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
    const ev1 = new EventClass({ 
      year: 2019, month: 4, day: 10, hour: 10, minute: 0, duration: 90, 
      title: "1", category: "TRANSPORT", tags: ["SITP"],
      ammount: 2200, type: EventClass.EXPENSE, account: "BANCOLOMBIA_DEBITO" 
    });
    const ev2 = new EventClass({ 
      year: 2019, month: 4, day: 10, hour: 10, minute: 0, duration: 90, 
      title: "2", category: "TRANSPORT", tags: ["SITP"],
      ammount: 2200, type: EventClass.INCOME, account: "BANCOLOMBIA_DEBITO" 
    });
    const ev3 = new EventClass({ 
      year: 2019, month: 4, day: 11, hour: 10, minute: 0, duration: 90, 
      title: "3", category: "TRANSPORT", tags: ["SITP"],
      ammount: 2200, type: EventClass.EXPENSE, account: "BANCOLOMBIA_DEBITO" 
    });
    const ev4 = new EventClass({ 
      year: 2019, month: 4, day: 20, hour: 10, minute: 0, duration: 90, 
      title: "4", category: "TRANSPORT", tags: ["SITP"],
      ammount: 2200, type: EventClass.NEUTRAL, account: "BANCOLOMBIA_DEBITO" 
    });

    let eventList = [ev1, ev2, ev3, ev4];

    let dayEvents = {};
    let monthEvents = {};
    let markedDates = {}
    
    for(let i=0; i < eventList.length; i++ ) {
      const event = eventList[i];
      if(!dayEvents[event.getYearMonthDay()]){
        dayEvents[event.getYearMonthDay()] = { dayExpenses: 0, dayIncome: 0 }
        monthEvents[event.getYearMonthDay()] = []
        markedDates[event.getYearMonthDay()] = {marked: true, dots: []}
      }

      if(event.type === EventClass.EXPENSE) {
        dayEvents[event.getYearMonthDay()].dayExpenses += event.ammount;
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.expense);
      } else if (event.type === EventClass.INCOME) {
        dayEvents[event.getYearMonthDay()].dayIncome += event.ammount;
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.income);
      } else if (event.type === EventClass.NEUTRAL) {
        markedDates[event.getYearMonthDay()]['dots'].push(this.state.neutral);
      }

      monthEvents[event.getYearMonthDay()].push(event.getEvent());
    }
    //fill dates with no events
    for (let i = 1; i < 32; i++) {
      const date = `${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${i < 10 ? '0' + i : i}`;
      if (!monthEvents[date]) {
        monthEvents[date] = []
      }
    }
    /*let monthEvents = {
      "2019-03-10": [
        ev1.getEvent(), 
        
      ],
      "2019-03-11": [],
      "2019-03-15": []
    };*/
    console.log(monthEvents)

    this.setState({
      dayEvents: dayEvents,
      monthEvents: monthEvents,
      markedDates: markedDates
    });
  }

  //calendar_view
  // Send to agenda all the events for the month
  loadEventsForMonth(day) {
    console.log("is loading events for month");
    console.log(day)
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