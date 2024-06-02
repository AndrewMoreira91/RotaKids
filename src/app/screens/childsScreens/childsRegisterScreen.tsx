import { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar, View, Text, Platform, TouchableOpacity, ScrollView, FlatList } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";

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
import { useGuardianStore } from "@/store/guardian-store";
import { ChildProps, GuardianProps, SchoolProps } from "@/types/userType";
import Loading from "@/components/loading";

type Props = NativeStackScreenProps<HomeStackParamList, "ChildRegister">;

export function ChildsRegisterScreen({ navigation }: Props) {
	const [name, setName] = useState("");
	const [childLocation, setChildLocation] = useState<{ latitude: number, longitude: number } | null>(null);
	const [guardian, setGuardian] = useState<GuardianProps | null>(null);
	const [school, setSchool] = useState<SchoolProps | null>(null);
	const [date, setDate] = useState<Date>(new Date());

	const [isLoading, setIsLoading] = useState(false);

	const [guardiansList, setGuardiansList] = useState<GuardianProps[]>([])
	const [schoolsList, setSchoolsList] = useState<SchoolProps[]>([])

	const [showPicker, setShowPicker] = useState(false);

	const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
	const [address, setAddress] = useState("");

	const [dateOfBirth, setDateOfBirth] = useState("");

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

	async function loadGuardians() {
		try {
			await api.get("/users/search?role=guardian")
				.then(response => {
					setGuardiansList(response.data)
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

	async function loadSchools() {
		try {
			await api.get("/schools")
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

	function handleSave() {
		if (!name || !dateOfBirth || !guardian || !school || !childLocation) return;
		console.log("salvando")
		setIsLoading(true);
		const data = {
			name,
			birthDate: date,
			address,
			latitude: childLocation.latitude,
			longitude: childLocation.longitude,
			guardianId: guardian.id,
			schoolId: school.id
		} as ChildProps
		console.log(data)
		api.post("/childs", data)
			.then(response => {
				navigation.goBack()
			})
			.catch(error => {
				console.log(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
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
								<Input.Field
									placeholder="Digite aqui o nome da criança"
									value={name}
									onChangeText={setName}
								/>
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
										placeholder={"Escolha a data de nascimento"}
										editable={false}
										value={dateOfBirth}
									/>
								</Input>
							</TouchableOpacity>
						</View>

						<View>
							<Text className="text-xl font-semibold">Responsavel</Text>
							<TouchableOpacity onPress={() => {
								loadGuardians()
								bottomSheetGuardianRef.current?.snapToIndex(1)
							}}>
								<Input>
									<Input.Field
										value={guardian ? `${guardian.firstName} ${guardian.lastName}` : ""}
										placeholder="Escolha o responsavel da criança"
										editable={false}
									/>
								</Input>
							</TouchableOpacity>
						</View>

						<View>
							<Text className="text-xl font-semibold">Escola</Text>
							<TouchableOpacity activeOpacity={0.9} onPress={() => {
								loadSchools()
								bottomSheetSchollRef.current?.snapToIndex(1)
							}}>
								<Input>
									<Input.Field
										value={school ? school.name : ""}
										placeholder="Escolha a escola da criança"
										editable={false}
									/>
								</Input>
							</TouchableOpacity>
						</View>

						<View>
							<Text className="text-xl font-semibold">Endereço da criança</Text>
							<TouchableOpacity activeOpacity={0.9} onPress={() => bottomSheetAddressRef.current?.snapToIndex(1)}>
								<Input>
									<Input.Field placeholder="Coloque o endereço" value={address} editable={false} />
								</Input>
							</TouchableOpacity>
						</View>

						<Button isLoading={isLoading} onPress={handleSave}>
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

						{guardiansList.length === 0 ?
							<View className="flex-1 mt-6">
								<Loading />
							</View> :
							guardiansList.map((guardian, index) => (
								<TouchableOpacity key={index} onPress={() => {
									bottomSheetGuardianRef.current?.close();
									setGuardian(guardian)
								}}>
									<Text className="text-ink-normal text-lg">{guardian.firstName} {guardian.lastName}</Text>
								</TouchableOpacity>
							)
							)}
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

						{schoolsList.length === 0 ?
							<View className="flex-1 mt-6">
								<Loading />
							</View> :
							schoolsList.map((school, index) => (
								<TouchableOpacity key={index} onPress={() => {
									bottomSheetSchollRef.current?.close();
									setSchool(school)
								}}>
									<Text className="text-ink-normal text-lg">{school.name}</Text>
								</TouchableOpacity>
							)
							)}
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
			</MainConteiner >
		</>
	)
}