import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

class MyTabBar extends Component {
  static propTypes = {
    tabNames: PropTypes.array, // 保存Tab名称
  }; // 注意这里有分号

  render() {
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
      </View>
    );
  }

  ///  处理tabbar的颜色和字体及图标
  renderTabOption(tab, i) {
    let color = this.props.activeTab == i ? '#FF3399' : '#ADADAD'; // 判断i是否是当前选中的tab，设置不同的颜色
    return (
      //因为要有点击效果 所以要引入可触摸组件
      <TouchableOpacity
        onPress={() => this.props.goToPage(i)}
        style={styles.tab}
        key={tab}>
        <View style={styles.tabItem}>
          <Icon name={tab} size={30} color={color} />
          <Text style={{color: color}}>{this.props.tabNames[i]}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class APP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabNames: ['主页', '分类', '她他群', '我的'],
    };
  }

  render() {
    let tabNames = this.state.tabNames;
    return (
      <ScrollableTabView
        //renderTabBar={() => <DefaultTabBar/>}
        tabBarPosition={'overlayBottom'}
        renderTabBar={() => <MyTabBar tabNames={tabNames} />}>
        <View tabLabel="ios-home" style={styles.center}>
          <Text>每一天都不同</Text>
          <IconFont.Button name="facebook" backgroundColor="#FF3399" size={20}>
            妲己会一直爱主人
          </IconFont.Button>
          <Icon name="md-alarm" size={50} />
          <IconFont.Button name="twitter" backgroundColor="#FF3399" size={20}>
            因为被设定成这样
          </IconFont.Button>
        </View>

        <View tabLabel="ios-grid" style={styles.center}>
          <Text style={{color: 'pink'}}>小乔要努力变强</Text>
        </View>
        <View tabLabel="logo-buffer" style={styles.center}>
          <Text style={{color: 'red'}}>萝莉身御姐心</Text>
        </View>

        <View tabLabel="ios-contact" style={styles.center}>
          <Text style={{color: '#70f3ff'}}>别靠近我,阿福不想带来不幸</Text>
        </View>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    height: 50,
  },

  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
