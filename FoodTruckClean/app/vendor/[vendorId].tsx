import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string | null;
};

type CartItem = MenuItem & {
  quantity: number;
};

export default function VendorScreen() {
  const { vendorId } = useLocalSearchParams();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("vendor_id", vendorId);

      if (error) {
        console.log(error);
      } else {
        setMenuItems(data || []);
      }
    };

    fetchMenuItems();
  }, [vendorId]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Vendor Menu</Text>

      {/* Menu Items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Text>

            <Text>${item.price.toFixed(2)}</Text>

            {item.description && <Text>{item.description}</Text>}

            <Text
              onPress={() => addToCart(item)}
              style={{
                marginTop: 10,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              Add to Cart
            </Text>
          </View>
        )}
      />

      {/* Cart */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Cart ({cart.reduce((t, i) => t + i.quantity, 0)})
        </Text>

        {cart.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text>
              {item.name} x {item.quantity}
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text
                onPress={() => decreaseQuantity(item.id)}
                style={{ color: "blue", fontWeight: "bold" }}
              >
                Decrease
              </Text>

              <Text
                onPress={() => addToCart(item)}
                style={{ color: "blue", fontWeight: "bold" }}
              >
                Increase
              </Text>

              <Text
                onPress={() => removeItem(item.id)}
                style={{ color: "red", fontWeight: "bold" }}
              >
                Remove
              </Text>
            </View>
          </View>
        ))}

        {/* Total */}
        <Text style={{ marginTop: 10, fontWeight: "bold" }}>
          Total: $
          {cart
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)}
        </Text>

        {/* Checkout Button */}
        <Text
          onPress={() =>
            router.push({
              pathname: "/checkout",
              params: {
                total: cart
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2),
              },
            })
          }
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            borderRadius: 8,
          }}
        >
          Proceed to Checkout
        </Text>
      </View>
    </View>
  );
}
