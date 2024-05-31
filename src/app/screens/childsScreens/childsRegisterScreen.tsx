import { useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar, View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { HomeStackParamList } from "@/types/reactNavigationTypes";
import { formatDate } from "@/utils/formatToTexts";

import { Input } from "@/components/input";
import MainConteiner from "@/components/mainConteiner";
import Button from "@/components/button";
import Header from "@/components/header";

type Props = NativeStackScreenProps<HomeStackParamList, "ChildRegister">;

export function ChildsRegisterScreen({ navigation }: Props) {

	const [date, setDate] = useState<Date>(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const [dateOfBirth, setDateOfBirth] = useState("16 de julho de 2002");

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

	const handleClosePress = () => {
		if (bottomSheetGuardianRef.current) {
			bottomSheetGuardianRef.current.close();
		}
	};

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
										<Input.Field placeholder="Escolha escola da criança" editable={false} />
									</Input>
								</TouchableOpacity>
							</View>

							<View>
								<Text className="text-xl font-semibold">Endereço da criança</Text>
								<Input>
									<Input.Field placeholder="Digite aqui o endereço" />
								</Input>
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
						<Button>
							<Button.Text title="Adicionar nova escola" />
						</Button>
					</BottomSheetView>
				</BottomSheet>
			</MainConteiner >
		</>
	)
}