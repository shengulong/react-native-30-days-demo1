/**
 * Day 21
 *
 */
'use strict';

import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  StatusBar,
  TouchableHighlight,
  LayoutAnimation,
  View,
} from 'react-native';
import Util from './utils';
import {ReminderContainer} from './day20';

export default class extends Component {
  constructor() {
    super();
    this.listData = [
      {
        title: 'Scheduled',
        numOfItems: 0,
        theme: '#979797',
        list: [],
      },
      {
        title: 'Movie',
        numOfItems: 0,
        theme: '#cb7adf',
        list: [],
      },
      {
        title: 'Work',
        numOfItems: 0,
        theme: '#f9005f',
        list: [],
      },
      {
        title: 'Home',
        numOfItems: 0,
        theme: '#00a8f4',
        list: [],
      },
      {
        title: 'Reminder',
        numOfItems: 0,
        theme: '#68d746',
        list: [],
      },
      {
        title: 'Development',
        numOfItems: 6,
        theme: '#fe952b',
        list: [
          {
            selected: false,
            text: 'day20',
          },
          {
            selected: false,
            text: 'day21',
          },
          {
            selected: false,
            text: 'day22',
          },
          {
            selected: false,
            text: 'day23',
          },
          {
            selected: false,
            text: 'day24',
          },
          {
            selected: false,
            text: 'day25',
          },
        ],
      },
    ];

    this.animations = {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        springDamping: 0.5,
      },
    };

    this.state = {
      isOn: this.isOn,
      init: true,
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle(1);
  }

  _switch(index) {
    const isOn = this.listData.map(() => {
      return false;
    });
    isOn[index] = true;
    this.setState({
      isOn,
      init: false,
    });
    LayoutAnimation.configureNext(this.animations);
  }

  _reset() {
    const isOn = this.listData.map(() => {
      return false;
    });
    this.setState({
      isOn,
      init: true,
    });
    LayoutAnimation.configureNext(this.animations);
  }

  render() {
    const len = this.listData.length;
    const lists = this.listData.map((elem, index) => {
      return (
        <ReminderContainer
          ref={'list' + index}
          switch={() => this._switch(index)}
          key={'list' + index}
          listData={elem}
          listStyle={
            this.state.init
              ? {top: 20 + index * 65}
              : {
                  top: this.state.isOn[index]
                    ? 20
                    : Util.size.height + 5 * index - 5 * len,
                }
          }
        />
      );
    });

    return (
      <View style={styles.container}>
        <ImageBackground source={{uri: 'desktop'}} style={styles.container}>
          {lists}
        </ImageBackground>

        <TouchableHighlight
          // underlayColor="transparent"
          style={styles.reset}
          onPress={() => this._reset()}>
          <View>
            <Image source={{uri: 'packed'}} />
            <Text style={styles.back}>back</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Util.size.height,
    width: Util.size.width,
  },
  reset: {
    height: 30,
    width: Util.size.width,
    position: 'absolute',
    bottom: 100,
    // left: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#c6c6c6',
    width: 50,
    height: 50,
    borderRadius: 11,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowColor: '#aaa',
    shadowOpacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
