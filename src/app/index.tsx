import { SafeAreaProvider } from "react-native-safe-area-context";
import Router from "./routes/router";

import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function App() {

  return <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Router />
    </GestureHandlerRootView>
  </SafeAreaProvider>
}
