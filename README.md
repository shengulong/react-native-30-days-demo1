### 环境
+ react-native 0.61.5
+ react 16.9.0

## 项目相关

+ 创建项目：`npx react-native init thirtydays`
+ 启动项目：`npx react-native run-ios` `npx react-native run-ios --simulator "iPhone 6"`
+ ios使用CocoaPods管理依赖
    
      当前版本0.61.5引入依赖，基本上就是如下操作即可
      yarn add dependency_plugin
      cd ios
      pod install
      一般执行完pod install后，需要重新执行下命令`npx react-native run-ios`进行app更新

+ 使用xcode进行一些修改后，也建议更新app(npx react-native run-ios)      

## 优化点
+ 使用eslint进行格式校验


## 遇到问题
+ day23：对WebView里面的的html/js/css内容修改后并不能立即生效，需要更新app。
把html/js/css统一放到ios的app里面

## 资料
[图标库](https://oblador.github.io/react-native-vector-icons/)
