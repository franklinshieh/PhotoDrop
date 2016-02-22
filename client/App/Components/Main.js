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
 StatusBar,
   Dimensions,
} = React;

var Settings = require('./Settings');
var Camera = require('./Camera');
var MapView = require('./MapView');

var PhotosView = require('./PhotosView');

var styles = StyleSheet.create({
 wrapper: {
 }
})

var { width, height } = Dimensions.get('window');
var ASPECT_RATIO = width / height;
var LATITUDE_DELTA = 0.005;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class SwiperView extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      userLocation: { //where the user actually is
        latitude: undefined,
        longitude: undefined
      },
      region: {  //where the center of the map view is (changes as you pan around)
        latitude: undefined,
        longitude: undefined,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
    navigator.geolocation.getCurrentPosition(
      location => {
        this.setState({
          region: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          userLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
        });
        // console.log('main state:',this.state);
        // console.log(this.props);
      });
  }

  componentWillMount() {
    // StatusBarIOS.setHidden(true);
    // StatusBarIOS.setStyle('light-content');
    console.log("mounted main");
  }

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
       <MapView navigator={this.props.navigator} userLocationData={this.state}/>
     </Swiper>
   )
 }
}

module.exports = SwiperView;