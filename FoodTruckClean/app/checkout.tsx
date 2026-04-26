import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CheckoutScreen() {
  const { cart, total } = useLocalSearchParams();

  // Parse the cart data from the query parameters
  const parsedCart = cart ? JSON.parse(cart as string) : [];

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Checkout</Text>

      {/* Order summary */}
      {parsedCart.map((item: any) => (
        <View
          key={item.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text>
            {item.name} x {item.quantity}
          </Text>
          <Text>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      ))}

      {/* Total */}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total: ${total}</Text>
    </View>
  );
}
