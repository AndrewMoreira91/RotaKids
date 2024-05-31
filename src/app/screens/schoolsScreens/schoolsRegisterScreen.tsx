import { useEffect, useRef, useState } from "react";
import { StatusBar, View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapView, { Marker } from "react-native-maps";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import * as Location from 'expo-location';

import { HomeStackParamList } from "@/types/reactNavigationTypes";
import api from "@/lib/axios";

import MainConteiner from "@/components/mainConteiner";
import ButtonPill from "@/components/buttonPill";
import { Input } from "@/components/input";
import Button from "@/components/button";
import Header from "@/components/header";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<HomeStackParamList, "SchoolsRegister">;

export function SchoolsRegisterScreen({ navigation }: Props) {

	const bottomSheetAddressRef = useRef<BottomSheet>(null);

	function handleSave() {
		navigation.goBack();
	}

	const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
	const [schoolLocation, setSchoolLocation] = useState<{ latitude: number, longitude: number } | null>(null);
	const [address, setAddress] = useState("");

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

	async function handleSearchAddress() {
		const response = await api.post("maps/address", { address });
		const { latitude, longitude } = response.data;
		setAddress(response.data.formattedAddress);

		setLocation({ latitude, longitude })
		setSchoolLocation({ latitude, longitude })
	}

	return (
		<>
			<Header title="Cadastrar escola" navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<View className="gap-4">

					<ScrollView>
						<View className="gap-5">
							<View>
								<Text className="text-xl font-semibold">Nome da escola</Text>
								<Input>
									<Input.Field placeholder="Digite aqui o nome da escola" />
								</Input>
							</View>

							<View>
								<Text className="text-xl font-semibold">Endereço da escola</Text>
								<TouchableOpacity activeOpacity={0.8} onPress={() => bottomSheetAddressRef.current?.snapToIndex(1)}>
									<Input>
										<Input.Field placeholder="Coloque o endereço" value={address} editable={false} />
									</Input>
								</TouchableOpacity>
							</View>

							<Button onPress={() => handleSave()}>
								<Button.Text title="Salvar" />
							</Button>
						</View>
					</ScrollView>

				</View>
				<BottomSheet
					snapPoints={["1%", '90%']}
					ref={bottomSheetAddressRef}
				>
					<BottomSheetView className="mx-4 gap-4">
						<Input>
							<Input.Field
								placeholder="Digite o endereço"
								value={address}
								onChangeText={setAddress}
							/>
						</Input>
						<Button onPress={handleSearchAddress}>
							<Button.Text title="Buscar" />
						</Button>

						{address && (
							<Text className="text-ink-light font-semibold">{address}</Text>
						)}
						<Text className="text-ink-normal text-lg font-semibold">
							Certifique que o endereço acima está correto
						</Text>
						{location && (

							<MapView
								style={{
									height: 200, borderRadius: 16, overflow: "hidden", marginVertical: 16
								}}
								initialCamera={{
									center: {
										latitude: location.latitude,
										longitude: location.longitude,
									},
									pitch: 0,
									heading: 0,
									altitude: 1000,
									zoom: 16,
								}}
								camera={{
									center: {
										latitude: location.latitude,
										longitude: location.longitude,
									},
									pitch: 0,
									heading: 0,
									altitude: 1000,
									zoom: 16,

								}}
								showsUserLocation
								zoomEnabled
								zoomControlEnabled
							>
								<Marker
									coordinate={{
										latitude: location.latitude,
										longitude: location.longitude
									}}
								/>
							</MapView>
						)}
						<ButtonPill
							onPress={() => bottomSheetAddressRef.current?.close()}
							title="O endereço está correto, continuar"
							isDisabled={!schoolLocation}
						/>
					</BottomSheetView>
				</BottomSheet>
			</MainConteiner >
		</>
	)
}