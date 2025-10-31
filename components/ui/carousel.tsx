import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { Shimmer } from "../shimmers/home-shimmer";

const { width } = Dimensions.get("window");

export const ASSET_BASE = "https://cdn.raveum.com/";

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

const getTrimmedAddress = (address?: string): string => {
  if (!address) return "";
  const index = address.indexOf(",");
  return index !== -1 ? address.slice(index + 1).trim() : address;
};
export const formatPrice = (price?: number, currency: string = "USD") => {
  if (price == null) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0, // removes decimals
  }).format(price);
};

const renderEmptyComponent = () => {
  return (
    <View style={styles.shimmerList}>
      {[...Array(5)].map((_, i) => (
        <Shimmer
          key={i}
          height={250}
          width={Dimensions.get("window").width - 80}
          style={styles.shimmerItem}
        />
      ))}
    </View>
  );
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
      renderItem={({ item }) => {
        console.log(`${ASSET_BASE}${item?.thumbnail}`);
        return (
          <View style={[styles.card, { backgroundColor: item.color }]}>
            <View>
              <Image
                source={{ uri: `${ASSET_BASE}${item?.thumbnail}` }}
                style={styles.imageBackground}
              />
              <View style={{ padding: 10 }}>
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
                      <Text style={styles.place}>
                        {getTrimmedAddress(item.address)}
                      </Text>
                      <Text style={styles.price}>
                        ${formatPrice(item?.propertyPrice)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                      <Text
                        style={styles.itemHead}
                      >{`${item?.capRateValue}%`}</Text>
                      <Text style={styles.itemSubHead}>Cap Rate</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.itemHead}>{item?.builtYear}</Text>
                      <Text style={styles.itemSubHead}>Cap Rate</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text
                        style={styles.itemHead}
                      >{`${item?.capRateValue}%`}</Text>
                      <Text style={styles.itemSubHead}>Cap Rate</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      }}
      ListEmptyComponent={() => renderEmptyComponent()}
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
    // elevation: 4,
    justifyContent: "space-between",
  },
  imageContainer: {
    marginTop: 20,
    borderRadius: 26,
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
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  place: {
    fontSize: 15,
    color: "black",
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
  imageBackground: {
    height: "100%",
    width: "100%",
    position: "absolute",
    borderRadius: 26,
  },
  shimmerList: { gap: 12, flexDirection: "row" },
  shimmerItem: { borderRadius: 10, backgroundColor: "#e8e0e6ff" },
});
