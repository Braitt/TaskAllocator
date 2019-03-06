import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import Event from './Event.js';

export default class AgendaScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      markedDates: {},
      expense: {key:'expense', color: 'blue'},
      income: {key:'income', color: 'green'},
      neutral: {key:'neutral', color: 'orange'},
    };
    //this.loadEvents = this.loadEvents.bind(this);
  }

  render() {
    console.log(this.state.markedDates);
    return (
      <Agenda
        items={this.state.items}
        firstDay={1}
        selected={new Date()}
        loadItemsForMonth={this.loadItems.bind(this)}
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

  loadItems(day) {
    console.log(day)
    setTimeout(() => {
      let newItems = {
        "2019-03-10": [
          { height: 90, title: "hola", type: 'expense' }, 
          { height: 90, title: "hola", type: 'income' }],
        "2019-03-11": [{ height: 90, title: "hola", type: 'expense' }],
        "2019-03-15": [{ height: 90, title: "hola", type: 'neutral' }]
      };
      let markedDates = {}
      for (var date in newItems) {
        let events = newItems[date];
        markedDates[date] = {marked: true, dots: []}
        for(let i=0; i< events.length; i++){
          let event = events[i];
          if (event.type === 'income') {
            markedDates[date]['dots'].push(this.state.income);
          }
          else if (event.type === 'expense') {
            markedDates[date]['dots'].push(this.state.expense);
          }
          else if (event.type === 'neutral') {
            markedDates[date]['dots'].push(this.state.neutral);
          }
        }
      }
      for (let i = 1; i < 32; i++) {
        if (!newItems[`${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${i < 10 ? '0' + i : i}`]) {
          newItems[`${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${i < 10 ? '0' + i : i}`] = []
        }
      }
      this.setState({
        items: newItems,
        markedDates: markedDates
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <Event style={[styles.item, { height: item.height }]} 
             item={item}
      />
    );
  }

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
  item: {
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