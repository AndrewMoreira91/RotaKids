import MainConteiner from "@/components/mainConteiner"
import { useEffect, useRef, useState } from "react"
import { Platform, ScrollView, StatusBar, Text, TextInput, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "@/types/reactNavigationTypes"
import Header from "@/components/header"
import { ChildProps, GuardianProps } from "@/types/userType"
import { formatDate } from "@/utils/formatToTexts"

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Input } from "@/components/input"
import Button from "@/components/button"
import MapView, { Marker } from "react-native-maps"
import ButtonPill from "@/components/buttonPill"

import * as Location from 'expo-location';
import api from "@/lib/axios"

type Props = NativeStackScreenProps<HomeStackParamList, "DetailsChild">;

export function DetailsChildsScreen({ navigation, route }: Props) {

	const [child, setChild] = useState<ChildProps | null>(null)

	const [guardian, setGuardian] = useState<GuardianProps | null>(null)

	const [date, setDate] = useState<Date>(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
	const [childLocation, setChildLocation] = useState<{ latitude: number, longitude: number } | null>(null);
	const [address, setAddress] = useState("");

	const bottomSheetAddressRef = useRef<BottomSheet>(null);

	function loadGuardian(guardianId: string) {
		console.log(child)
		api.get(`/guardians/${guardianId}`)
			.then(response => {
				console.log(response.data)
				setGuardian(response.data)
			})
			.catch(error => {
				console.log(error)
			})
	}

	async function handleSearchAddress() {
		if (address === "") return;
		setIsLoading(true);
		try {
			await api.post("maps/address", { address })
				.then(response => {
					const { latitude, longitude, formattedAddress } = response.data;
					setChildLocation({ latitude, longitude });
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

	const onChange = ({ type }: DateTimePickerEvent, seletedDate: Date | undefined) => {
		if (type === "set") {
			if (seletedDate) {
				setDate(seletedDate);
				if (Platform.OS === "android") {
					togleDatePicker()
					setChild(prevChild => prevChild ? { ...prevChild, birthDate: seletedDate } : null)
				}
			}
		} else {
			togleDatePicker();
		}
	}

	const togleDatePicker = () => {
		setShowPicker(!showPicker);
	}

	useEffect(() => {
		setChild(route.params.child),
			loadGuardian(route.params.child.guardianId)
	}, [route.params.child, route.params.child.guardianId])

	if (!child) {
		return
	}

	return (
		<>
			<Header title={child.name} navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<ScrollView>
					<View className="gap-4">

						<View className="gap-1">
							<Text className="font-regular">Nome:</Text>
							<TextInput
								className="text-gray-700 font-bold text-2xl"
								onChangeText={text => setChild({ ...child, name: text })}
							>{child.name}</TextInput>
						</View>

						<View className="gap-1">
							<Text className="font-regular">Data de nascimento:</Text>
							<Text onPress={togleDatePicker} className="text-gray-700 font-bold text-2xl">{formatDate(child.birthDate)}</Text>
						</View>

						<View className="gap-1">
							<Text className="font-regular">Endereço:</Text>
							<Text onPress={() => bottomSheetAddressRef.current?.snapToIndex(1)} className="text-gray-700 font-bold text-2xl">{child.address}</Text>
						</View>

						{guardian && (
							<View>
								<Text className="font-regular">Responsável:</Text>
								<View className="flex-row justify-between items-center">
									<Text className="text-gray-700 font-bold text-2xl">
										{`${guardian.firstName} ${guardian.lastName}`}
									</Text>
									<ButtonPill title="Detalhes"/>
								</View>
							</View>
						)}

					</View>
				</ScrollView>
			</MainConteiner>

			{showPicker && (
				<DateTimePicker
					mode="date"
					value={date}
					display="spinner"
					onChange={onChange}
					maximumDate={new Date()}
					minimumDate={new Date(2000, 0, 1)}
				/>
			)}

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
						onPress={() => bottomSheetAddressRef.current?.close()}
						title="O endereço está correto, continuar"
						isDisabled={!childLocation}
					/>
				</BottomSheetView>
			</BottomSheet>
		</>
	)
}

export default DetailsChildsScreen