import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CheckoutScreen() {
  const { total } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 24 }}>Checkout</Text>
      <Text style={{ marginTop: 10 }}>Total: ${total}</Text>
    </View>
  );
}
