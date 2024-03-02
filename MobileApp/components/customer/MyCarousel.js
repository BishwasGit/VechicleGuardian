import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = 300; // You can adjust this width as per your design

const MyCarousel = ({repairCenters }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchRepairCenters = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getRepairCentersList`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setEntries(data.repairCenters);
      } catch (error) {
        console.error("Error fetching repair centers:", error);
        // Handle errors as needed
      }
    };

    fetchRepairCenters();
  }, []);

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: item.documents }}
          style={styles.image}
        />
        <Text style={styles.title}>{item.repaircenter_fname}</Text>
        <Text style={styles.description}>{item.address}</Text>
      </View>
    );
  };
  return (
    <>
    <Carousel
      ref={(c) => { this._carousel = c; }}
      data={entries}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      autoplay={true} // Enable auto play
      loop={true} // Enable looping
    />
  </>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808000',
    borderRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  image: {
    marginTop: 5,
    backgroundColor: 'white',
    width: '95%',
    height: 120, // Adjust the image height as needed
    borderRadius: 5, // Optional: if you want rounded corners
  },
  title: {
    paddingTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color:"white",
  },
  description: {
    fontSize: 11,
    color:"white",
    marginBottom: 10,
  },
});

export default MyCarousel;
