import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class AgendaScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      workout: {key:'workout', color: 'green'},
      massage: {key:'massage', color: 'blue', selectedDotColor: 'blue'},
      vacation: {key:'vacation', color: 'red', selectedDotColor: 'blue'}
    };
    //this.loadEvents = this.loadEvents.bind(this);
  }

  render() {
    console.log(this.state.items);
    const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
    const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key:'workout', color: 'green'};
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
        markedDates={{
          "2019-03-10": {selected: true, marked: true,dots: [vacation]},
          "2019-03-11": {marked: true,dots: [vacation,massage]},
          "2019-03-15": {disabled: true}
        }}
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
        "2019-03-10": [{ height: 90, name: "hola" }, { height: 90, name: "hola" }],
        "2019-03-11": [{ height: 90, name: "hola" }],
        "2019-03-15": [{ height: 90, name: "hola" }]
      };
      for (let i = 1; i < 32; i++) {
        if (!newItems[`${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${i < 10 ? '0' + i : i}`]) {
          newItems[`${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${i < 10 ? '0' + i : i}`] = []
        }
      }
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
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
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});