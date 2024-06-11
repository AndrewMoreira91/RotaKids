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
import ListItemDrag from "@/components/listItemDrag"
import axios from "axios"
import Button from "@/components/button"


export default function MapScreen() {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY || ''

  const [isLoading, setIsLoading] = useState(true)
  const [showsTraffic, setShowsTraffic] = useState(true)

  const { user } = useUserStore()

  const [childsList, setChildsList] = useState<ChildProps[]>([])
  const [schoolsList, setSchoolsList] = useState<SchoolProps[]>([])

  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  async function loadSchools() {
    try {
      await api.get(`/schools/search?driverId=${user?.id}`)
        .then(response => {
          setSchoolsList(response.data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  async function loadChilds() {
    try {
      await api.get(`/childs/search?driverId=${user?.id}`)
        .then(response => {
          setChildsList(response.data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

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

  {
    const bottomSheetRef = useRef<BottonSheet>(null)
    const snapPoints = useMemo(() => ["5%", "50%", "90%"], [])
    const handleClosePress = () => bottomSheetRef.current?.close()

    const handleSnapPress = () => bottomSheetRef.current?.snapToIndex(1)

    const url = "https://api.mapbox.com/optimized-trips/v1/mapbox/driving/13.388860,52.517037;13.397634,52.529407;13.428555,52.523219;13.418555,52.523215?roundtrip=true&distributions=3,1&access_token=pk.eyJ1IjoiYW5kcmV3bW9yZWlyYSIsImEiOiJjbHgzM3BjdGMwZG5yMnFvdDAxdG92YWFiIn0.lvQlpcf6iJyGEMwrYIoKdA"

    // async function getRoute() {
    //   const response = await axios.get(url)
    //     .then(response => {
    //       console.dir(response.data, { depth: null });
    //       const resWayPoints: { waypoints: { location: number[] }[] } = response.data.waypoints
    //       waypoints = resWayPoints.waypoints.map(waypoint => ({
    //         latitude: waypoint.location[1],
    //         longitude: waypoint.location[0]
    //       }))
    //       return waypoints;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       return waypoints;
    //     });
    //   return response;
    // }

    useEffect(() => {
      loadChilds()
      loadSchools()
    }, [])

    return (
      <View style={styles.conteiner}>

        {location &&
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapContainer}
            initialCamera={{
              center: location,
              zoom: 14,
              pitch: 0,
              heading: 0,
              altitude: 0
            }}
            // onRegionChange={(region) => setRegion(region)}
            zoomControlEnabled
            showsUserLocation
            pitchEnabled
            customMapStyle={mapStyle}
            showsTraffic={showsTraffic}
            loadingEnabled
          >
            {schoolsList.map(school => (
              <Marker
                key={school.id}
                coordinate={{
                  latitude: school.latitude,
                  longitude: school.longitude
                }}
                title={school.name}
                description={school.address}
                pinColor={colors.blue[300]}
              />
            ))}
            {childsList.map(child => (
              <Marker
                key={child.id}
                coordinate={{
                  latitude: child.latitude,
                  longitude: child.longitude
                }}
                title={child.name}
                description={child.address}
                pinColor={colors.lime[300]}
              />
            ))}
            {childsList.length > 0 && schoolsList.length > 0 &&
              <MapViewDirections
                apikey={"AIzaSyCmpVIPiRg3d3lBp96yC9xWd80iz2w262w"}
                origin={location}
                destination={{
                  latitude: schoolsList[0].latitude,
                  longitude: schoolsList[0].longitude
                }}
                strokeWidth={4}
                strokeColor="blue"
                mode="DRIVING"
                lineCap="round"
                waypoints={childsList.map(child => ({
                  latitude: child.latitude,
                  longitude: child.longitude
                }))}
                optimizeWaypoints
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
              <Text className="font-bold text-2xl">Gerenciar paradas</Text>
              <Divisor style={{ marginVertical: 8 }} />
            </View>

            <View className="flex-col justify-between px-4" >
              <Text className="text-lg font-semibold">Tempo total da rota:
                <Text className="font-bold"> 2:35h</Text>
              </Text>

              <Text className="text-base mt-2 text-blue-500">Próxima parada</Text>

              <FlatList
                data={childsList}
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