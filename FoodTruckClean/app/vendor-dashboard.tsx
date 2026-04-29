import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function VendorDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
      id,
      customer_name,
      total,
      created_at,
      order_items (
        name,
        price,
        quantity
      )
    `,
        )
        .order("created_at", { ascending: false });

      console.log("ORDERS DATA:", data);
      console.log("ORDERS ERROR:", error);

      if (error) {
        alert(error.message);
        return;
      }

      setOrders(data || []);
    };

    fetchOrders();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Vendor Dashboard</Text>

      {orders.map((order) => (
        <View
          key={order.id}
          style={{
            padding: 15,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{order.customer_name}</Text>

          {/* Order items */}
          {order.order_items.map((item: any, index: number) => (
            <Text key={index}>
              {item.name} x {item.quantity}
            </Text>
          ))}

          <Text style={{ marginTop: 5 }}>Total: ${order.total}</Text>

          <Text style={{ fontSize: 12, color: "gray" }}>
            {new Date(order.created_at).toLocaleString()}
          </Text>
        </View>
      ))}
    </View>
  );
}
