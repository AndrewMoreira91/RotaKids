import { View, Text, StatusBar } from "react-native"

export default function Home() {

  return (
    <View className="flex-1 items-center justify-center p-8">
      <StatusBar barStyle={"light-content"} />
     <Text className="text-7xl font-regular">Home</Text>
    </View>
  )
}