import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = 300; // You can adjust this width as per your design

export class MyCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        { title: 'Item 1', image: 'https://via.placeholder.com/150' },
        { title: 'Item 2', image: 'https://via.placeholder.com/150' },
        { title: 'Item 3', image: 'https://via.placeholder.com/150' },
        { title: 'Item 4', image: 'https://via.placeholder.com/150' },
        { title: 'Item 5', image: 'https://via.placeholder.com/150' },
        // Add more items as needed
      ]
    };
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{ item.title }</Text>
      </View>
    );
  }

  render () {
    return (
        <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.state.entries}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        autoplay={true} // Enable auto play
        loop={true} // Enable looping
      />
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    width: itemWidth,
    height: 200, // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'floralwhite',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 120, // Adjust the image height as needed
    borderRadius: 8, // Optional: if you want rounded corners
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10, // Space between the image and title
  },
});

export default MyCarousel;
