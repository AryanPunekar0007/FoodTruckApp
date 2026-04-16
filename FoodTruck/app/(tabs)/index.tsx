import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { supabase } from "/Users/aryan/Desktop/Project/FoodTruckApp/FoodTruck/lib/supabase";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Open Vendor Test"
        onPress={() =>
          router.push({
            pathname: "/vendor/[vendorId]" as any,
            params: { vendorId: "2054e0d4-3d75-4c90-a814-bfb80bb12051" },
          })
        }
      />
    </View>
  );
}
