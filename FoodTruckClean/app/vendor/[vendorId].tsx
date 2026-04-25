import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function VendorScreen() {
  const { vendorId } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 40, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, color: "black" }}>Vendor ID:</Text>
      <Text style={{ fontSize: 24, color: "black" }}>{vendorId}</Text>
    </View>
  );
}
