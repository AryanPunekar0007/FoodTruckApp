import { View, Text, Button } from "react-native";
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
            params: { vendorId: "123" },
          })
        }
      />
    </View>
  );
}
