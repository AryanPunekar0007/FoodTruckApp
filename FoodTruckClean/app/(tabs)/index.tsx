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
            params: { vendorId: "d6af3841-80e6-405e-96e3-5fcb55e64ec6" },
          })
        }
      />
    </View>
  );
}
