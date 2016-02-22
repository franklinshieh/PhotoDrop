var Swiper = require('react-native-swiper')
// es6
// import Swiper from 'react-native-swiper'

var React = require('react-native');
var {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 StatusBarIOS,
} = React;

var Settings = require('./Settings');
var Camera = require('./Camera');
var MapView = require('./MapView');

var styles = StyleSheet.create({
 wrapper: {
 }
})

class SwiperView extends React.Component{

  _onMomentumScrollEnd (e, state, context) {
    if(state.index===1 || state.index===2) {
      StatusBarIOS.setHidden(true);
    } else {
      StatusBarIOS.setHidden(false);
      StatusBarIOS.setStyle('light-content');
    }
  }

 render () {
   StatusBarIOS.setHidden(true);	
   return (
     <Swiper style={styles.wrapper} showsButtons={true} loop={false} showsPagination={false} index={1} onMomentumScrollEnd ={this._onMomentumScrollEnd}>
       <Settings navigator={this.props.navigator}/>
       <Camera/>
       <MapView navigator={this.props.navigator}/>
     </Swiper>
   )
 }
}

module.exports = SwiperView;