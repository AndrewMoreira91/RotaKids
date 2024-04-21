import { colors } from "@/styles/colors"
import { FlexStyle, StyleProp, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import CSS from "csstype"

type Props = {
	children: React.ReactNode
}

function MainConteiner({ children }: Props) {
	const insets = useSafeAreaInsets()

	return (
		<View style={{
			flex: 1,
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			backgroundColor: colors.gray[25],
			paddingHorizontal: 16,
		}}>
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