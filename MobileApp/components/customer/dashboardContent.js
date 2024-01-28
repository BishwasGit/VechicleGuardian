import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import MyCarousel from "./MyCarousel";
import MyStatistics from "./MyStatistics";

const DashboardContent = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Pie Chart Section */}
        <Card style={styles.card}>
          <Card.Content>
            <MyStatistics />
          </Card.Content>
        </Card>

        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
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
  },
  container: {
    padding: 10,
  },
  carouselContainer: {
    height: 200,
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
