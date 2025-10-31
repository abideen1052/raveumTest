import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { StyleSheet } from "react-native";
const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

interface ShimmerProps {
  width?: string | number;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const Shimmer = ({
  width = "50%",
  height = 300,
  borderRadius = 8,
  style = {},
}: ShimmerProps) => {
  return (
    <ShimmerPlaceHolder
      visible={false}
      style={[
        {
          width,
          height,
          borderRadius,
        },
        style,
        // styles.container,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
