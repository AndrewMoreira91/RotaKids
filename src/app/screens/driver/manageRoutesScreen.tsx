import ButtonPill from "@/components/buttonPill";
import MainConteiner from "@/components/mainConteiner";
import { HomeStackParamList } from "@/types/reactNavigationTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar, Text, View } from "react-native";

type Props = NativeStackScreenProps<HomeStackParamList, "ManageRoutes">;

export function ManageRoutesScreen({ navigation }: Props) {
	return (
		<MainConteiner>
			<StatusBar barStyle={"dark-content"} />
			<MainConteiner.middle>
				<Text className="text-5xl">
					ManageRoutesScreen
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