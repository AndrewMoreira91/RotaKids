import { useSafeAreaInsets } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { NavigationProp } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/styles/colors"

type HeaderProps = {
	title: string
	navigation: NavigationProp<any>
}

function Header({ title, navigation }: HeaderProps) {
	const insets = useSafeAreaInsets()

	return (
		<View style={{
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
		}}>
			<View
				className="bg-gray-25 px-4 py-4 flex-row items-center shadow-xl shadow-black gap-4"
				style={{
					borderBottomWidth: 1,
					borderBottomColor: colors.gray[400]
				}}
			>
				<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
					<MaterialCommunityIcons name="arrow-left" size={28} />
				</TouchableOpacity>
				<Text className="font-semibold text-2xl">{title}</Text>
			</View>
		</View>
	)
}

export default Header