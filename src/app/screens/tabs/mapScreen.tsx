import { useEffect, useMemo, useRef, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
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

import MapViewDirections from "react-native-maps-directions"
import * as Location from 'expo-location';

import api from "@/lib/axios"
import { ChildProps, SchoolProps } from "@/types/userType"

import { colors } from "@/styles/colors"
import { mapStyle } from "@/styles/mapStyle"
import { useUserStore } from "@/store/user-store"

import Divisor from "@/components/divisor"
import Button from "@/components/button"
import { useRoutesStore } from "@/store/routes-strore"
import ButtonPill from "@/components/buttonPill"
import { RouteProps } from "@/types/routeType"
import { TouchableOpacity } from "react-native-gesture-handler"
import { FontAwesome5 } from "@expo/vector-icons"


export default function MapScreen() {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY || ''

  const [isLoading, setIsLoading] = useState(true)
  const [showsTraffic, setShowsTraffic] = useState(false)

  const { user } = useUserStore()

  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  const { routes } = useRoutesStore()

  const [selectedRoute, setSelectedRoute] = useState<RouteProps | null>(null)

  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    })();
  }, []);

  function moveCameraToLocation() {
    if (location === null) return
    mapRef.current?.animateCamera({
      center: location,
      zoom: 14,
    })
  }

  {
    const bottomSheetRef = useRef<BottonSheet>(null)
    const snapPoints = useMemo(() => ["5%", "50%", "90%"], [])

    return (
      <View style={styles.conteiner}>

        {location &&
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.mapContainer}
            initialCamera={{
              center: location,
              zoom: 14,
              pitch: 0,
              heading: 0,
              altitude: 0
            }}
            zoomControlEnabled
            showsUserLocation
            pitchEnabled
            customMapStyle={mapStyle}
            userLocationUpdateInterval={1000}
            showsTraffic={showsTraffic}
            loadingEnabled
          >
            {selectedRoute &&
              selectedRoute.halts.map(halt => (
                <Marker
                  key={halt.id}
                  coordinate={{
                    latitude: halt.latitude,
                    longitude: halt.longitude
                  }}
                  title={halt.name}
                  description={halt.address}
                >
                  <View>
                    <View className="bg-slate-50 border p-1 justify-center items-center rounded-lg">
                      <Text className="text-lg font-bold">{halt.order}</Text>
                    </View>
                    {halt.type === 'school' ? <FontAwesome5 name="school" size={32} color={colors.ink.normal} /> :
                      <FontAwesome5 name="child" size={32} color={colors.blue[500]} />
                    }
                  </View>
                </Marker>
              ))}

            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              title="Você"
              description="Sua localização"
            >
              <FontAwesome5 name="home" size={32} color={colors.blue[900]} />
            </Marker>

            {selectedRoute &&
              <MapViewDirections
                apikey={"AIzaSyCmpVIPiRg3d3lBp96yC9xWd80iz2w262w"}
                origin={location}
                destination={location}
                strokeWidth={4}
                strokeColor="blue"
                mode="DRIVING"
                lineCap="round"
                waypoints={selectedRoute.halts.map(halt => ({
                  latitude: halt.latitude,
                  longitude: halt.longitude,
                }))}
                optimizeWaypoints
                onStart={(params) => {
                  console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={(result) => {
                  console.log(`Distance: ${result.distance} km`)
                  console.log(`Duration: ${result.duration} min.`)
                }}
                precision="high"
              />}
          </MapView>
        }

        <BottonSheet
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          index={1}
        >
          <BottomSheetDraggableView>
            <View className="items-center">
              <Text className="font-bold text-2xl">Iniciar rota</Text>
              <Divisor style={{ marginVertical: 8 }} />
            </View>

            <View className="flex-col justify-between px-4" >


              {selectedRoute ?
                <View className="flex-col">
                  <View className="flex-row gap-4 items-center">
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setSelectedRoute(null)}
                    >
                      <FontAwesome5 name="arrow-left" size={24} color={colors.blue[500]} />
                    </TouchableOpacity>
                    <Text className="font-semibold text-lg">
                      Voltar para as rotas
                    </Text>
                  </View>
                  <View className="mt-2">
                    <View className="flex-row justify-between items-end pb-1">
                      <Text className="text-3xl font-semibold">
                        {selectedRoute.name}
                      </Text>
                      <Text className="text-lg">
                        {selectedRoute.halts.length} paradas
                      </Text>
                    </View>
                    <Button>
                      <Button.Text title="Começar" />
                    </Button>

                    <BottomSheetFlatList
                      data={selectedRoute.halts}
                      key={selectedRoute.id}
                      renderItem={({ item }) => (
                        <View className="flex-row justify-between items-center">
                          <View className="flex-col">
                            <Text className="text-lg font-semibold text-blue-900">
                              {item.name}
                            </Text>
                            <Text className="text-sm">
                              {item.address}
                            </Text>
                          </View>
                          <ButtonPill
                            title="Iniciar"
                            onPress={() => { }}
                          />
                        </View>
                      )}
                    />
                  </View>
                </View>
                :
                <View>
                  <Text className="text-xl font-regular">
                    Inicie uma rota:
                  </Text>
                  {routes.map(route => (
                    <View key={route.id}>
                      <View
                        className="flex-row mb-3 justify-between items-center"
                      >
                        <View>
                          <Text className="text-3xl font-bold text-blue-900">
                            {route.name}
                          </Text>
                          <Text className="text-lg">
                            {route.halts.length} paradas
                          </Text>
                        </View>
                        <ButtonPill
                          title="Iniciar"
                          onPress={() => setSelectedRoute(route)}
                        />
                      </View>
                      <Divisor />
                    </View>
                  ))}
                </View>
              }

            </View>
          </BottomSheetDraggableView>
        </BottonSheet>

      </View>
    )
  }
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