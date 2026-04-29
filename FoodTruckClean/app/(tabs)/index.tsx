import { router } from "expo-router";
import { Button, Text, View } from "react-native";

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

      <Text
        onPress={() => router.push("./vendor-dashboard")}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          borderRadius: 8,
        }}
      >
        Go to Vendor Dashboard
      </Text>
    </View>
  );
}
