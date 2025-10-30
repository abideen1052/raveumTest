// AccordionList.tsx
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

// Enable animation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionItem = {
  id: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  title: string;
  subtitle: string;
  items: string[];
};

type AccordionListProps = {
  data: AccordionItem[];
};

const AccordionItemComponent: React.FC<{
  item: AccordionItem;
  expanded: boolean;
  onPress: () => void;
}> = ({ item, expanded, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <FontAwesome
          name={item.icon || "info-circle"}
          size={24}
          color="#333"
          style={styles.leftIcon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-right"}
          size={28}
          color="#555"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.body}>
          {item.items.map((text, index) => (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.bullet}>{"\u2022"}</Text>
              <Text style={styles.bulletText}>{text}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export const AccordionList: React.FC<AccordionListProps> = ({ data }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handlePress = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id)); // toggle expand
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <AccordionItemComponent
          item={item}
          expanded={item.id === expandedId}
          onPress={() => handlePress(item.id)}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 16,
        paddingHorizontal: 2,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    //flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  body: {
    marginTop: 8,
    paddingLeft: 36,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 2,
  },
  bullet: {
    fontSize: 14,
    marginRight: 6,
    color: "#444",
  },
  bulletText: {
    fontSize: 14,
    color: "#444",
    flexShrink: 1,
  },
});
