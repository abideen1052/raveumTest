import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

const Toast = ({
  visible,
  message,
  type = "error",
  duration = 3000,
  onHide,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          if (onHide) onHide();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, fadeAnim, onHide]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { opacity: fadeAnim, backgroundColor: getBackgroundColor(type) },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const getBackgroundColor = (type) => {
  switch (type) {
    case "success":
      return "#4BB543";
    case "info":
      return "#2E86C1";
    case "error":
    default:
      return "#E74C3C";
  }
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 5,
    zIndex: 9999,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Toast;
