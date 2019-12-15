/**
 * Day 10
 *
 */
'use strict';

import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  // TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  View,
} from 'react-native';
import Util from './utils';
// import {BlurView} from 'react-native-blur';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      shift: new Animated.Value(-120),
      show: false,
    };
  }

  _pushMenu() {
    this.setState({
      show: true,
    });

    Animated.timing(this.state.shift, {
      toValue: Util.size.width === 375 ? 50 : 30,
      duration: 200,
      delay: 100,
      easing: Easing.elastic(1),
    }).start();
  }

  _popMenu() {
    Animated.timing(this.state.shift, {
      toValue: -120,
      duration: 200,
      delay: 100,
      easing: Easing.elastic(1),
    }).start();

    setTimeout(() => {
      this.setState({
        show: false,
      });
    }, 500);
  }

  componentDidMount() {
    StatusBar.setBarStyle(1);
  }

  render() {
    return (
      <View style={{backgroundColor: '#37465c'}}>
        <TouchableWithoutFeedback
          style={styles.imgContainer}
          onPress={() => this._pushMenu()}>
          <Image source={require('./img/tumblr.png')} style={styles.img} />
        </TouchableWithoutFeedback>
        {this.state.show ? (
          // <View>
          <ImageBackground
            source={require('./img/tumblrblur.png')}
            style={styles.menu}>
            <Animated.View style={[styles.menuItem1, {left: this.state.shift}]}>
              <Image
                style={styles.menuImg}
                source={require('./img/tumblr-text.png')}
              />
              <Text style={styles.menuText}>Text</Text>
            </Animated.View>
            <Animated.View
              style={[styles.menuItem2, {right: this.state.shift}]}>
              <Image
                style={styles.menuImg}
                source={require('./img/tumblr-photo.png')}
              />
              <Text style={styles.menuText}>Photo</Text>
            </Animated.View>
            <Animated.View style={[styles.menuItem3, {left: this.state.shift}]}>
              <Image
                style={styles.menuImg}
                source={require('./img/tumblr-quote.png')}
              />
              <Text style={styles.menuText}>Quote</Text>
            </Animated.View>
            <Animated.View
              style={[styles.menuItem4, {right: this.state.shift}]}>
              <Image
                style={styles.menuImg}
                source={require('./img/tumblr-link.png')}
              />
              <Text style={styles.menuText}>Link</Text>
            </Animated.View>
            <Animated.View style={[styles.menuItem5, {left: this.state.shift}]}>
              <Image
                style={styles.menuImg}
                source={require('./img/tumblr-chat.png')}
              />
              <Text style={styles.menuText}>Chat</Text>
            </Animated.View>
            <Animated.View
              style={[styles.menuItem6, {right: this.state.shift}]}>
              <Image
                style={styles.menuImg}
                source={require('./img/tumblr-audio.png')}
              />
              <Text style={styles.menuText}>Audio</Text>
            </Animated.View>
            <TouchableOpacity
              underlayColor="rgba(0,0,0,1)"
              activeOpacity={0}
              style={styles.dismissBtn}
              onPress={() => this._popMenu()}>
              <Text style={styles.dismiss}>NeverMind</Text>
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    height: Util.size.height,
    width: Util.size.width,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  img: {
    // resizeMode: 'repeat',
    // resizeMode: 'contain',
    resizeMode: 'stretch',
    height: Util.size.height,
    width: Util.size.width,
    // marginTop: 15,
    marginBottom: 150,
  },
  menu: {
    height: Util.size.height,
    width: Util.size.width,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  blur: {
    height: Util.size.height,
    width: Util.size.width,
  },
  menuImg: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
  menuText: {
    width: 120,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  menuItem1: {
    position: 'absolute',
    left: 50,
    top: 80,
  },
  menuItem3: {
    position: 'absolute',
    left: 50,
    top: 250,
  },
  menuItem5: {
    position: 'absolute',
    left: 50,
    top: 420,
  },
  menuItem2: {
    position: 'absolute',
    right: 50,
    top: 80,
  },
  menuItem4: {
    position: 'absolute',
    right: 50,
    top: 250,
  },
  menuItem6: {
    position: 'absolute',
    right: 50,
    top: 420,
  },
  dismissBtn: {
    position: 'absolute',
    width: Util.size.width,
    left: 0,
    bottom: 150,
  },
  dismiss: {
    textAlign: 'center',
    color: 'rgba(40,255,111,1)',
    fontWeight: '700',
    backgroundColor: 'transparent',
  },
});
