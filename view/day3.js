/**
 * Day 3
 * twitter entrance animation
 */
'use strict';

import React, {Component} from 'react';
import {
  Platform,
  Animated,
  Easing,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PropTypes from 'prop-types';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component {
  static propTypes = {
    hideThis: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      transformAnim: new Animated.Value(1),
      opacityAnim: new Animated.Value(1),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.transformAnim, {
      toValue: 50,
      duration: 1200,
      delay: 2000,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.state.opacityAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.elastic(1),
      delay: 2200,
    }).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 1000);
  }

  render() {
    return (
      <Animated.View
        style={[styles.entrance, {opacity: this.state.opacityAnim}]}>
        <AnimatedIcon
          size={60}
          style={[
            styles.twitter,
            {transform: [{scale: this.state.transformAnim}]},
          ]}
          name="logo-twitter"
        />
      </Animated.View>
    );
  }
}

class TwitterPost extends Component {
  constructor() {
    super();
    this.state = {
      isRefreshing: false,
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 1000);
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={() => this._onRefresh()}
          />
        }>
        <Image
          source={require('./img/day3.png')}
          style={{width: Util.size.width, height: Util.size.height - 140}}
        />
      </ScrollView>
    );
  }
}

// class TwitterFlow extends Component {
//   render() {
//     return (
//       <View>
//         <View style={styles.nav}>
//           <View style={styles.navLeft}>
//             <Icon
//               name="ios-person-add"
//               size={23}
//               style={{color: '#1b95e0', paddingLeft: 10}}
//             />
//           </View>
//           <View style={styles.navMid}>
//             <Icon name="logo-twitter" size={27} style={{color: '#1b95e0'}} />
//           </View>
//           <View style={styles.navRight}>
//             <Icon
//               name="ios-search"
//               size={23}
//               style={{color: '#1b95e0', width: 30}}
//             />
//             <Icon
//               name="ios-create"
//               size={23}
//               style={{color: '#1b95e0', width: 30, paddingRight: 10}}
//             />
//           </View>
//         </View>
//         <TwitterPost />
//       </View>
//     );
//   }
// }

// renderTabBar:用于渲染TabBar。添加该属性，需要在引入组件之时加上它的子组件。
// 系统提供两种方式，DefaultTabBar和ScrollableTabBar。
// DefaultTabBar表示Tab.item会平分水平方向上的空间。
// ScrollableTabBar表示所有的tabBar.item的长度将会超过屏幕宽度，但是当滚动屏幕之时可以显示出来。
// 下面我们自定义它的模式
class FacebookTabBar extends Component {
  constructor() {
    super();
    this.tabIcons = [];
  }

  static propTypes = {
    // 有三个属性是系统传入的,即goToPage、activeTab、tabs
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
  };

  componentDidMount() {
    setTimeout(() => this.props.goToPage(0), 0);
    this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  setAnimationValue({value}) {
    this.tabIcons.forEach((icon, i) => {
      const progress = value - i >= 0 && value - i <= 1 ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 49 + (159 - 49) * progress;
    const green = 149 + (159 - 149) * progress;
    const blue = 215 + (159 - 215) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {/*<View style={styles.tabs}>*/}
        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setTimeout(() => this.props.goToPage(i), 0)}
              style={styles.tab}>
              <Icon
                name={tab}
                size={30}
                color={
                  this.props.activeTab === i
                    ? 'rgb(49,149,215)'
                    : 'rgb(159,159,159)'
                }
                ref={icon => {
                  this.tabIcons[i] = icon;
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

class TwitterTab extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: '主页',
      title: '主页',
    };
  }

  changeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }

  _updateTitle(obj) {
    const {i} = obj;
    let title = '';
    switch (i) {
      case 0:
        title = '主页';
        break;
      case 1:
        title = '通知';
        break;
      case 2:
        title = '私信';
        break;
      case 3:
        title = '我';
        break;
    }
    this.setState({
      title,
    });
  }

  render() {
    // todo 实现ios风格的导航栏
    // const iosTabView = (
    //   <TabBarIOS barTintColor="#fff" tintColor="#1b95e0">
    //     <Icon.TabBarItem
    //       title="主页"
    //       iconName="ios-home"
    //       selectedIconName="ios-home"
    //       onPress={() => this.changeTab('主页')}
    //       selected={this.state.selectedTab === '主页'}>
    //       <TwitterFlow />
    //     </Icon.TabBarItem>
    //     <Icon.TabBarItem
    //       title="通知"
    //       iconName="ios-notifications"
    //       selectedIconName="ios-notifications"
    //       onPress={() => this.changeTab('通知')}
    //       selected={this.state.selectedTab === '通知'}>
    //       <TwitterFlow />
    //     </Icon.TabBarItem>
    //     <Icon.TabBarItem
    //       title="私信"
    //       iconName="ios-mail"
    //       selectedIconName="ios-mail"
    //       onPress={() => this.changeTab('私信')}
    //       selected={this.state.selectedTab === '私信'}>
    //       <TwitterFlow />
    //     </Icon.TabBarItem>
    //     <Icon.TabBarItem
    //       title="我"
    //       iconName="ios-person"
    //       selectedIconName="ios-person"
    //       onPress={() => this.changeTab('我')}
    //       selected={this.state.selectedTab === '我'}>
    //       <TwitterFlow />
    //     </Icon.TabBarItem>
    //   </TabBarIOS>
    // );
    const androidTabView = (
      <>
        <View>
          <View style={styles.navAndroid}>
            <View style={styles.logoContainer}>
              <Icon name="logo-twitter" color="#fff" size={27} />
              <Text style={styles.title}>{this.state.title}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="ios-search" color="#fff" size={25} />
              <Icon name="ios-create" color="#fff" size={25} />
            </View>
          </View>
        </View>
        <ScrollableTabView
          onChangeTab={obj => this._updateTitle(obj)}
          // todo 没有实现导航栏在下面的情况
          // tabBarPosition={'bottom'}
          // tabBarPosition={'overlayBottom'}
          // tabBarPosition={'overlayTop'}
          tabBarPosition={'top'}
          renderTabBar={() => <FacebookTabBar />}>
          <TwitterPost tabLabel="ios-home" />
          <TwitterPost tabLabel="ios-notifications" />
          <TwitterPost tabLabel="ios-mail" />
          <TwitterPost tabLabel="ios-person" />
        </ScrollableTabView>
      </>
    );
    return Platform.OS === 'ios' ? androidTabView : androidTabView;
  }
}

export default class extends Component {
  static navigationOptions = {
    title: 'day3',
  };
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(0);
    }
  }

  _hideEntrance() {
    this.setState({
      show: false,
    });
  }

  render() {
    let entrance = this.state.show ? (
      <Entrance hideThis={() => this._hideEntrance()} />
    ) : (
      <View />
    );
    return (
      <View style={styles.twitterContainer}>
        <TwitterTab />
        {entrance}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  twitterContainer: {
    width: Util.size.width,
    height: Util.size.height,
  },
  entrance: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor: '#1b95e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitter: {
    color: '#fff',
    position: 'relative',
    top: -20,
    textAlign: 'center',
  },
  nav: {
    flexDirection: 'row',
    paddingTop: 30,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    backgroundColor: '#fff',
  },
  navLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  navMid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navRight: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  navAndroid: {
    backgroundColor: '#3195d7',
    width: Util.size.width,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 30,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    // paddingTop: 5,
    // borderWidth: 1,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // borderRightWidth: 0,
    // borderBottomColor: 'rgba(0,0,0,0.05)',
    // backgroundColor: '#111',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
