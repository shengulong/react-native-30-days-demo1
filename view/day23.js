/**
 * Day 23
 * local webview
 * D3.js
 */
'use strict';

import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import RNFS from 'react-native-fs';

export class Poincare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
    };
  }

  componentDidMount(): void {
    RNFS.readFile(`${RNFS.MainBundlePath}/html/demo1.html`)
      .then(data => {
        this.setState({
          html: data,
        });
      })
      .catch(error => {
        console.error('fail');
        console.error(error);
      });
    // 各类路径
    // * RNFS.MainBundlePath app的跟目录即thirtydays.app/，可以把静态资源放在其下面
    // * RNFS.CachesDirectoryPath
    // * RNFS.DocumentDirectoryPath
    // * RNFS.TemporaryDirectoryPath
    // * RNFS.LibraryDirectoryPath
    // * RNFS.ExternalDirectoryPath
    // * RNFS.ExternalStorageDirectoryPath
    // console.info(RNFS.MainBundlePath);
    // console.info(RNFS.DocumentDirectoryPath);
    // console.info(RNFS.ExternalDirectoryPath);
    // console.info(RNFS.ExternalStorageDirectoryPath);
  }

  render() {
    const html = this.state.html;
    return (
      <WebView
        // automaticallyAdjustContentInsets={false}
        // source={require('./public/html/demo1.html')}
        source={{html, baseUrl: 'js/'}}
        // 必须设置下面的选项：Loads static HTML or a URI (with optional headers) in the WebView. Note that static HTML will require setting originWhitelist to ["*"].
        originWhitelist={['*']}
        // javaScriptEnabled={true}
        // domStorageEnabled={true}
        // decelerationRate="normal"
        // startInLoadingState={true}
      />
    );
  }
}

export class Sphere extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
    };
  }
  componentDidMount(): void {
    RNFS.readFile(`${RNFS.MainBundlePath}/html/demo2.html`)
      .then(data => {
        this.setState({
          html: data,
        });
        // console.info(data);
      })
      .catch(error => {
        console.error('fail');
      });
  }

  render() {
    const html = this.state.html;
    return (
      <WebView
        automaticallyAdjustContentInsets={false}
        // source={require('./public/html/demo2.html')}
        // 这里的参数key为html(string类型),baseUrl(string类型)
        source={{html, baseUrl: 'js/'}}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
      />
    );
  }
}

export default class extends Component {
  _show(index) {
    if (index) {
      // this.props.navigator.push({
      //   index: 231,
      //   title: 'Sphere',
      //   component: Sphere,
      //   hideNav: false,
      // });
      this.props.navigation.navigate('Sphere');
    } else {
      // this.props.navigator.push({
      //   index: 232,
      //   title: 'Poincare',
      //   component: Poincare,
      //   hideNav: false,
      // });
      this.props.navigation.navigate('Poincare');
    }
  }

  render() {
    return (
      <View style={styles.menu}>
        <TouchableHighlight style={styles.btn} onPress={() => this._show(0)}>
          <View>
            <Image source={require('./img/poincare.png')} style={styles.img} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Poincaré Disk</Text>
              <Icon style={styles.itemNav} name="ios-arrow-forward" size={35} />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.btn} onPress={() => this._show(1)}>
          <View>
            <Image source={require('./img/sphere.jpg')} style={styles.img} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Sphere</Text>
              <Icon style={styles.itemNav} name="ios-arrow-forward" size={35} />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  itemWrapper: {
    backgroundColor: '#f3f3f3',
  },
  menu: {
    paddingTop: 80,
    backgroundColor: '#ffffff',
    width: Util.size.width,
    height: Util.size.height,
  },
  btn: {
    height: 100,
    marginBottom: 20,
    width: 375,
  },
  img: {
    height: 100,
    width: 375,
    resizeMode: 'cover',
  },
  textContainer: {
    height: 100,
    width: 375,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
    paddingLeft: 20,
  },
  itemNav: {
    color: '#fff',
    position: 'absolute',
    right: 20,
    top: 32,
  },
});
