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
        { title: 'Car Wash and Repair Center', description:'Sitapaila,Kathmandu', image: 'https://i.pinimg.com/originals/03/fe/50/03fe50d5afc35589ea47469b6875649a.jpg' },
        { title: 'Car Repair Center',description:'Bafal,Kathmandu', image: 'https://i.pinimg.com/originals/87/34/6d/87346d8d999efb5e0a0be9683da5e3e3.jpg' },
        { title: 'Spare Seller Center',description:'Kalimati,Kathmandu', image: 'https://i.pinimg.com/originals/d0/53/8f/d0538f2ca0e30c4ecb12d503360ea991.jpg' },
        { title: 'Car Wash and Repair Center',description:'Kalanki,Kathmandu', image: 'https://i.pinimg.com/originals/03/fe/50/03fe50d5afc35589ea47469b6875649a.jpg' },
        { title: 'Spare Seller Center',description:'Sitapaila,Kathmandu', image: 'https://i.pinimg.com/originals/d0/53/8f/d0538f2ca0e30c4ecb12d503360ea991.jpg' },
        // Add more items as needed
      ]
    };
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{ item.title }</Text>
        <Text style={styles.description}>{ item.description }</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'floralwhite',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 160, // Adjust the image height as needed
    borderRadius: 8, // Optional: if you want rounded corners
  },
  title: {
    padding:5,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10, // Space between the image and title
  },
  description: {
    fontSize: 12,
    marginBottom: 20,
  },
});

export default MyCarousel;
