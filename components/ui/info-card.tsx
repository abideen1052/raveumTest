import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type InfoItem = {
  id: string;
  head: string;
  subhead: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  isShadow: boolean;
};

type InfoListProps = {
  data: InfoItem[];
  isShadow: boolean;
};

const InfoCard: React.FC<{ item: InfoItem }> = ({ item, isShadow }) => (
  <View style={[styles.card, isShadow ? styles.shadow : styles.nonShadowBox]}>
    <View style={styles.textContainer}>
      <Text style={styles.head}>{item.head}</Text>
      <Text style={styles.subhead}>{item.subhead}</Text>
    </View>
    <MaterialIcons name={item.icon} size={28} color="#333" />
  </View>
);

export const InfoList: React.FC<InfoListProps> = ({ data, isShadow }) => (
  <FlatList
    scrollEnabled={false}
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <InfoCard item={item} isShadow={isShadow} />}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.listContainer}
  />
);

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 2,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    paddingVertical: 25,
    marginBottom: 12,
  },
  shadow: {
    // Small shadow on sides and bottom only
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  nonShadowBox: {
    backgroundColor: "#e8e0e6ff",
  },
  textContainer: {
    flex: 1,
  },
  head: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  subhead: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});
