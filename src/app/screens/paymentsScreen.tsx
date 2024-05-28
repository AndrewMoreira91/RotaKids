import { StatusBar, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParamList } from "@/types/reactNavigationTypes";

import ButtonPill from "@/components/buttonPill";
import MainConteiner from "@/components/mainConteiner";

type Props = NativeStackScreenProps<HomeStackParamList, "Payments">;

export function PaymentsScreen({ navigation }: Props) {
	return (
		<MainConteiner>
			<StatusBar barStyle={"dark-content"} />
			<MainConteiner.middle>
				<Text className="text-5xl">
				PaymentsScreen
				</Text>

				<View className="w-full flex-row justify-between">
					<ButtonPill
						theme="secondary"
						arrowIcon="left"
						onPress={() => navigation.goBack()}
					/>
					<ButtonPill
						title="Next"
						arrowIcon="right"
					/>
				</View>
			</MainConteiner.middle>
		</MainConteiner>
	)
}