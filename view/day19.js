/**
 * Day 19
 *
 */
'use strict';

import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Util from './utils';
import TouchID from 'react-native-touch-id';
import {EnterPassword} from './day16';

class Main extends Component {
  componentDidMount() {
    StatusBar.setBarStyle(0);
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.text}>You are in Day19</Text>
      </View>
    );
  }
}

class RequireTouchID extends Component {
  constructor() {
    super();
    this.state = {
      enterApp: false,
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle(1);
    this._touchID();
  }

  _enterPassword() {
    this.setState({
      enterApp: true,
    });
  }

  _touchID = () => {
    const optionalConfigObject = {
      // title: 'Authentication Required', // Android
      // imageColor: '#e00606', // Android
      // imageErrorColor: '#ff0000', // Android
      // sensorDescription: 'Touch sensor', // Android
      // sensorErrorDescription: 'Failed', // Android
      // cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // console.info('support TouchID/FaceID');
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
        }
        TouchID.authenticate('Unlock Day19', optionalConfigObject)
          .then(success => {
            this.setState({
              enterApp: true,
            });
          })
          .catch(error => {});
      })
      .catch(error => {
        console.error('not support TouchID/FaceID');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.enterApp ? (
          <Main />
        ) : (
          <EnterPassword
            enterPassword={() => this._enterPassword()}
            password="123"
          />
        )}
      </View>
    );
  }
}

export default class extends Component {
  render() {
    return (
      <View>
        <RequireTouchID />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: Util.size.height,
    width: Util.size.width,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Util.size.height,
    width: Util.size.width,
  },
  text: {
    fontSize: 30,
  },
});
