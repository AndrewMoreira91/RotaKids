import { useCallback, useRef, useState } from "react"
import { FontAwesome } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"

import childs from "../../../../assets/data/childs.json"

import { colors } from "@/styles/colors"
import { mapStyle } from "@/styles/mapStyle"

import "react-native-gesture-handler"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function MapScreen() {

  const [region, setRegion] = useState({
    latitude: -23.411917251639174,
    longitude: -46.506087351590395,
    latitudeDelta: 0.005304291382309145,
    longitudeDelta: 0.0031787529587745667
  })

  const snapPoints = ['25%', '50%', '90%'];

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View className="flex-1">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%" }}
        initialRegion={region}
        onRegionChange={(region) => setRegion(region)}
        zoomControlEnabled
        showsUserLocation
        pitchEnabled
        customMapStyle={mapStyle}
      >
        {/* {childs.map(child => (
          <Marker
            key={child.id}
            coordinate={{
              latitude: child.latitude,
              longitude: child.longitude
            }}
          >
            <View className="items-center">
              <View className="bg-gray-25 flex-row items-center rounded-full">
                <FontAwesome name="child" className="my-1 ml-2" size={30} color={colors.blue[500]} />
                <Text className="text-sm font-bold mr-2">{child.name}</Text>
              </View>
              <FontAwesome name="map-marker" size={30} color={colors.blue[900]} />
            </View>
          </Marker>
        ))} */}
      </MapView>

      <GestureHandlerRootView
        style={styles.container}
      >
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // zIndex: 100,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});