import { useEffect, useRef, useState } from "react";
import { StatusBar, View, Text, ScrollView, Alert } from "react-native";
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
import { SchoolProps } from "@/types/userType";

type Props = NativeStackScreenProps<HomeStackParamList, "SchoolsRegister">;

export function SchoolsRegisterScreen({ navigation }: Props) {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [schoolLocation, setSchoolLocation] = useState<{ latitude: number, longitude: number } | null>(null);

	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const bottomSheetAddressRef = useRef<BottomSheet>(null);

	function handleButton() {
		if (name && address) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}

	const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

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
		if (address === "") return;
		setIsLoading(true);
		try {
			await api.post("maps/address", { address })
				.then(response => {
					const { latitude, longitude, formattedAddress } = response.data;
					setSchoolLocation({ latitude, longitude });
					setLocation({ latitude, longitude });
					setAddress(formattedAddress);
					return response.data;
				})
				.catch(error => {
					console.log(error);
					return null;
				})
				.finally(() => setIsLoading(false));
		} catch (error) {
			console.log(error);
		}
	}

	function handleSave() {
		if (name && address && schoolLocation) {
			setIsLoading(true)
			const data = {
				name,
				address,
				latitude: schoolLocation.latitude,
				longitude: schoolLocation.longitude
			} as SchoolProps
			api.post("/schools", data)
				.then(response => {
					console.log(response.data)
					navigation.goBack()
				})
				.catch(error => {
					console.log(error)
					Alert.alert("Erro", "Não foi possível cadastrar a escola, tente novamente mais tarde")
				})
				.finally(() => {
					setIsLoading(false)
				})
		}
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
									<Input.Field
										placeholder="Digite aqui o nome da escola"
										value={name}
										onChangeText={value => {
											setName(value)
											handleButton()
										}}
									/>
								</Input>
							</View>

							<View>
								<Text className="text-xl font-semibold">Endereço da escola</Text>
								<TouchableOpacity activeOpacity={0.8} onPress={() => bottomSheetAddressRef.current?.snapToIndex(1)}>
									<Input>
										<Input.Field
											placeholder="Coloque o endereço"
											value={address}
											editable={false}
										/>
									</Input>
								</TouchableOpacity>
							</View>

							<Button isLoading={isLoading} isDisabled={isDisabled} onPress={() => handleSave()}>
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
						<Button isLoading={isLoading} onPress={handleSearchAddress}>
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
							isLoading={isLoading}
							onPress={() => {
								handleButton()
								bottomSheetAddressRef.current?.close()
							}}
							title="O endereço está correto, continuar"
							isDisabled={!schoolLocation}
						/>
					</BottomSheetView>
				</BottomSheet>
			</MainConteiner >
		</>
	)
}