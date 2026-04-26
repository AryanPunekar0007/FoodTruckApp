import { View, Text, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function CheckoutScreen() {
  const { cart, total } = useLocalSearchParams();

  // Parse the cart data from the query parameters
  const parsedCart = cart ? JSON.parse(cart as string) : [];

  const [name, setName] = useState("");

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Checkout</Text>

      <Text style={{ marginBottom: 5 }}>Customer Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
      />
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

      {/* Place Order Button */}
      <Text
        onPress={() => {
          if (!name) {
            alert("Please enter your name");
            return;
          }
          console.log("ORDER:", {
            name,
            items: parsedCart,
            total,
          });
          alert("Order placed successfully!");
        }}
        style={{
          marginTop: 20,
          backgroundColor: "green",
          color: "white",
          padding: 15,
          textAlign: "center",
          borderRadius: 5,
          fontWeight: "bold",
        }}
      >
        Place Order
      </Text>
    </View>
  );
}
