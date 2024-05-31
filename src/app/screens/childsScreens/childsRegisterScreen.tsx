import { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar, View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import * as Location from 'expo-location';

import { HomeStackParamList } from "@/types/reactNavigationTypes";
import { formatDate } from "@/utils/formatToTexts";

import { Input } from "@/components/input";
import MainConteiner from "@/components/mainConteiner";
import Button from "@/components/button";
import Header from "@/components/header";
import MapView, { Marker } from "react-native-maps";

import api from "@/lib/axios";
import ButtonPill from "@/components/buttonPill";

type Props = NativeStackScreenProps<HomeStackParamList, "ChildRegister">;

export function ChildsRegisterScreen({ navigation }: Props) {

	const [date, setDate] = useState<Date>(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const [dateOfBirth, setDateOfBirth] = useState("16 de julho de 2002");

	const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
	const [childLocation, setChildLocation] = useState<{ latitude: number, longitude: number } | null>(null);
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
		setChildLocation({ latitude, longitude })
	}

	console.log(address);

	const togleDatePicker = () => {
		setShowPicker(!showPicker);
	}

	const onChange = ({ type }: DateTimePickerEvent, seletedDate: Date | undefined) => {
		if (type === "set") {
			if (seletedDate) {
				setDate(seletedDate);
				if (Platform.OS === "android") {
					togleDatePicker()
					setDateOfBirth(formatDate(seletedDate))
				}
			}
		} else {
			togleDatePicker();
		}
	}

	const bottomSheetGuardianRef = useRef<BottomSheet>(null);
	const bottomSheetSchollRef = useRef<BottomSheet>(null);
	const bottomSheetAddressRef = useRef<BottomSheet>(null);

	return (
		<>
			<Header title="Cadastrar crianças" navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<ScrollView>
					<View className="gap-5">
						<View>
							<Text className="text-xl font-semibold">Nome da criança completo</Text>
							<Input>
								<Input.Field placeholder="Digite aqui o nome da criança" />
							</Input>
						</View>

						<View>
							<Text className="text-xl font-semibold">Data de nascimento</Text>
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
							<TouchableOpacity onPress={togleDatePicker} activeOpacity={0.9}>
								<Input>
									<Input.Field
										className="text-lg text-ink-normal"
										placeholder={"16 de julho de 2002"}
										editable={false}
										value={dateOfBirth}
									/>
								</Input>
							</TouchableOpacity>
						</View>

						<View>
							<Text className="text-xl font-semibold">Responsavel</Text>
							<TouchableOpacity onPress={() => bottomSheetGuardianRef.current?.snapToIndex(1)}>
								<Input>
									<Input.Field placeholder="Escolha o responsavel da criança" editable={false} />
								</Input>
							</TouchableOpacity>
						</View>

						<View>
							<Text className="text-xl font-semibold">Escola</Text>
							<TouchableOpacity onPress={() => bottomSheetSchollRef.current?.snapToIndex(1)}>
								<Input>
									<Input.Field placeholder="Escolha a escola da criança" editable={false} />
								</Input>
							</TouchableOpacity>
						</View>

						<View>
							<Text className="text-xl font-semibold">Endereço da criança</Text>
							<TouchableOpacity onPress={() => bottomSheetAddressRef.current?.snapToIndex(1)}>
								<Input>
									<Input.Field placeholder="Coloque o endereço" value={address} editable={false} />
								</Input>
							</TouchableOpacity>
						</View>

						<Button>
							<Button.Text title="Salvar" />
						</Button>
					</View>
				</ScrollView>

				<BottomSheet
					snapPoints={["1%", '90%']}
					ref={bottomSheetGuardianRef}
				>
					<BottomSheetView className="mx-4 gap-4">
						<Input>
							<Input.Field placeholder="Digite o nome do responsavel" />
						</Input>
						<Button onPress={() => {
							bottomSheetGuardianRef.current?.close();
							navigation.navigate("GuardiansRegister")
						}}>
							<Button.Text title="Adicionar novo responsavel" />
						</Button>
					</BottomSheetView>
				</BottomSheet>

				<BottomSheet
					snapPoints={["1%", '90%']}
					ref={bottomSheetSchollRef}
				>
					<BottomSheetView className="mx-4 gap-4">
						<Input>
							<Input.Field placeholder="Digite o nome da escola" />
						</Input>
						<Button onPress={() => {
							navigation.navigate("SchoolsRegister")
							bottomSheetSchollRef.current?.close()
						}}>
							<Button.Text title="Adicionar nova escola" />
						</Button>
					</BottomSheetView>
				</BottomSheet>

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
							isDisabled={!childLocation}
						/>
					</BottomSheetView>
				</BottomSheet>
			</MainConteiner >
		</>
	)
}