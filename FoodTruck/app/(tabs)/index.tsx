import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { supabase } from "/Users/aryan/Desktop/Project/FoodTruckApp/FoodTruck/lib/supabase";

export default function HomeScreen() {
  const [message, setMessage] = useState("Testing Supabase...");

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from("vendors").select("*");

      if (error) {
        console.log("ERROR:", error);
        setMessage(`Error: ${error.message}`);
      } else {
        console.log("DATA:", data);
        setMessage(`Success: fetched ${data.length} vendor(s)`);
      }
    };

    testConnection();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{message}</Text>
    </View>
  );
}
