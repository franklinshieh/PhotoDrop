var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var _ = require('lodash');
var api = require('../Utils/api');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicatorIOS,
  StatusBarIOS
} = React;

var {width, height} = Dimensions.get('window');

var latitude;
var longitude;

navigator.geolocation.getCurrentPosition(
  location => {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  }
);

var IMAGES_PER_ROW = 3

class ReactNativeLayouts extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentScreenWidth: width,
      currentScreenHeight: height,
      imageUrls: undefined
    };
    api.fetchPhotos(latitude, longitude, (photos) => {
      var photosArr = JSON.parse(photos);
      var photosUrls = photosArr.map((photo) => {
        return photo.url;
      });
      this.setState({imageUrls:photosUrls});
    })
  }

  componentWillUnmount() {
    StatusBarIOS.setHidden(true);
  }

  handleRotation(event) {
    var layout = event.nativeEvent.layout;
    this.setState({currentScreenWidth: layout.width, currentScreenHeight: layout.height });
  }

  calculatedSize() {
    var size = this.state.currentScreenWidth / IMAGES_PER_ROW;
    return {width: size, height: size};
  }

  renderRow(images) {
    return images.map((uri) => {
      return (
        <Image style={[styles.image, this.calculatedSize()]} source={{uri: uri}} />
      )
    })
  }

  renderImagesInGroupsOf(count) {
    return _.chunk(IMAGE_URLS, IMAGES_PER_ROW).map((imagesForRow) => {
      return (
        <View style={styles.row}>
          {this.renderRow(imagesForRow)}
        </View>
      )
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavigationBar title={{title: 'Swipe Down to Dismiss', tintColor: 'white'}} tintColor={'black'} statusBar={{style: 'light-content'}}/>
        <ScrollView onLayout={this.handleRotation.bind(this)} contentContainerStyle={styles.scrollView}>
          {this.state.imageUrls ? this.renderRow(this.state.imageUrls) : <ActivityIndicatorIOS size={'large'} style={styles.centering} />}
        </ScrollView>
      </View>
    );
  }

};

var styles = StyleSheet.create({
  centering: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
   flexDirection: 'row',
   flexWrap: 'wrap'
  },
  row: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'flex-start'
  },
  image: {
   borderWidth: 1,
   borderColor: '#fff'
  }
});

module.exports = ReactNativeLayouts;