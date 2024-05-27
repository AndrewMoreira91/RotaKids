import { colors } from "@/styles/colors"
import { View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Props = {
	children: React.ReactNode
	style?: ViewStyle
}

function MainConteiner({ children, style }: Props) {
	const insets = useSafeAreaInsets()

	return (
		<View style={[{
			flex: 1,
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			backgroundColor: colors.gray[25],
			paddingHorizontal: 16,
			marginTop: 16,
		}, style]}>
				{children}
		</View>
	)
}

function MiddleConteiner({ children }: Props) {
	return (
		<View style={{
			flex: 1,
			justifyContent: "space-between",
			paddingVertical: 24,
		}}>
				{children}
		</View>
	)
}

MainConteiner.middle = MiddleConteiner

export default MainConteiner