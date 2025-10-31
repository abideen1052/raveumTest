import { apiManager } from "@/api";
import { AccordionList } from "@/components/ui/accordian";
import { CarouselWithHeader } from "@/components/ui/button-corousel";
import { Carousel } from "@/components/ui/carousel";
import { InfoList } from "@/components/ui/info-card";
import Toast from "@/components/ui/toast";

import { BUTTON_CAROUSEL_DATA, DATA, INFO_DATA } from "@/utilties/data";
import { getData, storeData } from "@/utilties/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [properties, setProperties] = React.useState<any>([]);
  const [visible, setVisible] = React.useState(false);
  const getProperties = async () => {
    try {
      const data = await apiManager("/propertiesj", "POST");
      storeData("properties", data?.properties);
      setProperties(data?.properties);
    } catch (err) {
      console.error("API Error:", err);
      getStoredData();
      showToast();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const getStoredData = async () => {
    try {
      const data = await getData("properties");
      setProperties(data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const showToast = () => {
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar style="dark" backgroundColor="white" />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Raveum</Text>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={32} color="black" />
            <Ionicons name="person" size={32} color="black" />
          </View>
        </View>
        <Text style={styles.subText}>
          Invest in <Text style={styles.headerText}>LOS ANGLES</Text> from
          anywhere
        </Text>
        <Text style={styles.shortText}>Learn more about raveum</Text>
        <AccordionList data={DATA} />
        <Text style={styles.subText}>Tending Properties</Text>
        <Carousel data={properties} />
        <CarouselWithHeader title="Best Picks" data={BUTTON_CAROUSEL_DATA} />
        <Text style={styles.subText}>Discover more</Text>
        <InfoList data={INFO_DATA} isShadow={true} />
        <Text style={styles.subText}>Your finances</Text>
        <InfoList data={INFO_DATA} isShadow={false} />
      </ScrollView>
      <Toast
        visible={visible}
        message="Something went wrong!"
        type="error"
        onHide={() => setVisible(false)}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  headerContainer: {
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  subText: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
  },
  shortText: {
    color: "black",
    fontSize: 14,
  },
});
