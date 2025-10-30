import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

type CarouselItem = {
  id: string;
  color: string;
  name: string;
  place: string;
  price: string;
};

type CarouselProps = {
  data: CarouselItem[];
};

export const Carousel: React.FC<CarouselProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      snapToAlignment="center"
      snapToInterval={width * 0.8 + 16} // makes each card snap
      decelerationRate="fast"
      contentContainerStyle={{
        paddingHorizontal: 5,
        paddingTop: 18,
        paddingBottom: 10,
      }}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: item.color }]}>
          <View style={styles.topContainer}>
            <FontAwesome
              name={"info-circle"}
              size={24}
              color="#333"
              style={styles.leftIcon}
            />
            <Text>Early Access</Text>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.textIconContainer}>
              <FontAwesome
                name={"info-circle"}
                size={34}
                color="#333"
                style={styles.leftIcon}
              />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.place}>{item.place}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.itemHead}>8.25%</Text>
                <Text style={styles.itemSubHead}>Cap Rate</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.itemHead}>8.25%</Text>
                <Text style={styles.itemSubHead}>Cap Rate</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.itemHead}>8.25%</Text>
                <Text style={styles.itemSubHead}>Cap Rate</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 6,
    width: "45%",
    borderRadius: 25,
  },
  leftIcon: {
    marginRight: 10,
  },
  card: {
    width: width * 0.8,
    borderRadius: 26,
    padding: 15,
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: "space-between",
  },
  textContainer: {
    // backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 12,
    padding: 10,
    marginTop: 150,
  },
  textIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  place: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginTop: 4,
  },
  infoContainer: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 35,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  infoItem: {
    alignItems: "center",
  },
  itemHead: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  itemSubHead: {
    fontSize: 14,
    color: "#555",
  },
});
