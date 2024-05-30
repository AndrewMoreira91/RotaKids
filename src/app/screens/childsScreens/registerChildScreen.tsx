import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar, View, Text, Platform, TouchableOpacity } from "react-native";

import { HomeStackParamList } from "@/types/reactNavigationTypes";

import MainConteiner from "@/components/mainConteiner";
import ButtonPill from "@/components/buttonPill";
import { Input } from "@/components/input";
import { ScrollView } from "react-native-gesture-handler";

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { formatDate } from "@/utils/formatToTexts";

type Props = NativeStackScreenProps<HomeStackParamList, "RegisterChild">;

export function RegisterChildsScreen({ navigation }: Props) {

	const [date, setDate] = useState<Date>(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const [dateOfBirth, setDateOfBirth] = useState("16 de julho de 2002 ");

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

	return (
		<MainConteiner>
			<StatusBar barStyle={"dark-content"} />
			<View className="gap-4">

				<ButtonPill
					theme="secondary"
					arrowIcon="left"
					iconPosition="left"
					title="Voltar"
					onPress={() => navigation.goBack()}
				/>
				<ScrollView>
					<Text className="text-xl font-semibold">Nome da criança completo</Text>
					<Input>
						<Input.Field placeholder="Digite aqui o nome da criança" />
					</Input>

					<Text className="text-xl font-semibold">Idade</Text>
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
								className="text-lg text-ink-light"
								placeholder={dateOfBirth}
								editable={false}
								value={dateOfBirth}
							/>
						</Input>
					</TouchableOpacity>
				</ScrollView>

			</View>
		</MainConteiner >
	)
}