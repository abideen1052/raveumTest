import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type CarouselItem = {
  id: string;
  color: string;
  name: string;
  place: string;
  price: string;
};

type CarouselWithHeaderProps = {
  title: string;
  data: CarouselItem[];
};

export const CarouselWithHeader: React.FC<CarouselWithHeaderProps> = ({
  title,
  data,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    const nextIndex = currentIndex + 1 < data.length ? currentIndex + 1 : 0;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      currentIndex - 1 >= 0 ? currentIndex - 1 : data.length - 1;
    flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    setCurrentIndex(prevIndex);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>What our clients say</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.iconButton} onPress={handlePrev}>
            <MaterialIcons name="chevron-left" size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleNext}>
            <MaterialIcons name="chevron-right" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* CAROUSEL */}
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 40}
        decelerationRate="fast"
        scrollEnabled={false} // Only move with buttons
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: "#eeeeeeff" }]}>
            <View style={styles.starLoop}>
              {Array.from({ length: 5 }).map((_, index) => (
                <MaterialIcons key={index} name="star" size={28} color="#333" />
              ))}
              <Text style={styles.cardRating}>Based on appstore</Text>
            </View>
            <Text style={styles.cardPlace}>{item.place}</Text>
            <View style={styles.cardInfo}>
              <View style={styles.cardText}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardPlace}>{"September 25, 2025"}</Text>
              </View>
              <MaterialIcons name="flag" size={28} color="#333" />
            </View>
          </View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    //backgroundColor: "#eee",
    borderRadius: 8,
    padding: 6,
  },
  starLoop: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    width: width - 40,
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    // shadowColor: "#000",
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 4,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    //marginTop: 25,
  },
  cardDate: {
    fontSize: 18,
    //fontWeight: "700",
    color: "#222",
    marginVertical: 4,
  },
  cardRating: {
    fontSize: 16,
    fontWeight: "400",
    color: "#222",
    textDecorationLine: "underline",
    marginLeft: 8,
  },
  cardPlace: {
    fontSize: 18,
    color: "#555",
    marginTop: 15,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //borderWidth: 1,
    marginTop: 25,
  },
  cardText: {
    justifyContent: "center",
  },
});
