import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function VendorMenuScreen() {
  const { vendorId } = useLocalSearchParams();

  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("vendor_id", vendorId);

      if (error) {
        setMessage("Error: " + error.message);
      } else {
        setMessage(`Fetched ${data.length} items`);
        console.log(data);
      }
    };

    fetchMenu();
  }, [vendorId]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Vendor ID: {vendorId}</Text>
      <Text>{message}</Text>
    </View>
  );
}
