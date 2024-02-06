import React from "react";
import { Title,View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import MyCarousel from "./MyCarousel";
import MyStatistics from "./MyStatistics";

const DashboardContent = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Pie Chart Section */}
        <View style={styles.statisticsContainer}>
            <MyStatistics />
            </View>

        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
      
        <Text style={{ fontSize: 14, marginBottom: 15,marginLeft: 15, }}>Nearby Repair Centers</Text>
          <MyCarousel />
        </View>

        {/* Image Card Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Card with Image</Text>
          </Card.Content>
          <Card.Cover
            source={{
              uri: "https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg",
            }}
            style={styles.cardImage}
          />
          <Card.Content>
            <Text style={styles.paragraph}>Some additional text or description here.</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop:40,
  
  },
  container: {
    padding: 10,
   
   
   
  },
  overlay: {
    marginTop: 50,
    alignItems: "center",
  },
  statisticsContainer:{
    marginBottom: 30,
    padding : 15,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselItem: {
    backgroundColor: "floralwhite",
    borderRadius: 8,
    height: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  carouselText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    marginBottom: 20,
    padding : 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph:{
    marginTop : 5,
  }
});
export default DashboardContent;
