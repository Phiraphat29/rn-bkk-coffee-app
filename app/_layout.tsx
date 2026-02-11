import { NotoSansThai_400Regular, NotoSansThai_700Bold, useFonts } from "@expo-google-fonts/noto-sans-thai";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    NotoSansThai_400Regular,
    NotoSansThai_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: "Top 10 Bangkok Coffee",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "NotoSansThai_700Bold", color: "#fff" },
          headerStyle: { backgroundColor: "#72594A" },
        }} />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียดร้าน",
          headerBackButtonDisplayMode: "minimal",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "NotoSansThai_700Bold", color: "#fff" },
          headerStyle: { backgroundColor: "#72594A" },
          headerTintColor: "#fff",
        }} />
    </Stack>
  );
}
