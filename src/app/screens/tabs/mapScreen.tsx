import { useCallback, useMemo, useRef, useState } from "react"
import { FontAwesome } from "@expo/vector-icons"
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import MapView, {
  Marker,
  PROVIDER_GOOGLE
} from "react-native-maps"
import BottonSheet, {
  BottomSheetDraggableView,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetView
} from "@gorhom/bottom-sheet"

import childs from "../../../../assets/data/childs.json"

import { colors } from "@/styles/colors"
import { mapStyle } from "@/styles/mapStyle"

import Divisor from "@/components/divisor"
import ListItemDrag from "@/components/listItemDrag"

export default function MapScreen() {

  const [region, setRegion] = useState({
    latitude: -23.411917251639174,
    longitude: -46.506087351590395,
    latitudeDelta: 0.005304291382309145,
    longitudeDelta: 0.0031787529587745667
  })

  const bottomSheetRef = useRef<BottonSheet>(null)
  const snapPoints = useMemo(() => ["10%", "50%", "90%"], [])
  const handleClosePress = () => bottomSheetRef.current?.close()
  const handleSnapPress = () => bottomSheetRef.current?.snapToIndex(1)

  return (
    <View style={styles.conteiner}>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapContainer}
        initialRegion={region}
        onRegionChange={(region) => setRegion(region)}
        zoomControlEnabled
        showsUserLocation
        pitchEnabled
        customMapStyle={mapStyle}
      >
        {childs.map(child => (
          <Marker
            key={child.id}
            coordinate={{
              latitude: child.latitude,
              longitude: child.longitude
            }}
          >
            <View className="bg-gray-25 flex-row items-center rounded-full">
              <FontAwesome name="child" className="my-1 ml-2" size={30} color={colors.blue[500]} />
              <Text className="text-sm font-bold mr-2">{child.name}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <BottonSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        index={1}
      >
        <BottomSheetDraggableView>
          <View className="items-center">
            <Text className="font-bold text-2xl">Gerenciar paradas</Text>
            <Divisor style={{ marginVertical: 8 }} />
          </View>

          <View className="flex-col justify-between px-4" >
            <Text className="text-lg font-semibold">Tempo total da rota:
              <Text className="font-bold"> 2:35h</Text>
            </Text>

            <Text className="text-base mt-2 text-blue-500">Próxima parada</Text>
            
            <FlatList
              data={childs}
              renderItem={({ item }) => (
                <ListItemDrag name={item.name} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </BottomSheetDraggableView>
      </BottonSheet>

    </View>
  )
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  mapContainer: {
    width: "100%",
    height: "100%"
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: '#80f',
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
  },
})