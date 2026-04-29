import { View, Text, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CheckoutScreen() {
  const { cart, total } = useLocalSearchParams();

  // Parse the cart data from the query parameters
  const parsedCart = cart ? JSON.parse(cart as string) : [];

  const [name, setName] = useState("");

  // State to manage loading state during order placement
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Checkout</Text>

      <Text style={{ marginBottom: 5 }}>Customer Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Please enter your name"
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
        onPress={async () => {
          if (!name) {
            alert("Please enter your name");
            return;
          }

          setLoading(true);

          //insert order
          const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .insert({
              customer_name: name,
              total: parseFloat(total as string),
            })
            .select()
            .single();

          if (orderError) {
            console.error("Error creating order:", orderError);
            alert("Failed to place order. Please try again.");
            setLoading(false);
            return;
          }

          const orderId = orderData.id;

          // Insert order items
          const orderItems = parsedCart.map((item: any) => ({
            order_id: orderId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }));

          const { error: itemsError } = await supabase
            .from("order_items")
            .insert(orderItems);

          if (itemsError) {
            console.error("Error inserting order items:", itemsError);
            alert("Failed to save order items.");
            setLoading(false);
            return;
          }
          console.log("ORDER:", {
            name,
            items: parsedCart,
            total,
          });
          alert("Order placed successfully!");
          router.replace("/");
          setLoading(false);
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
