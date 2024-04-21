import { FontAwesome } from "@expo/vector-icons"
import { View, Text, Image, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ListItemProps = TouchableOpacityProps & {
	icon: ImageSourcePropType
	title: string
	description: string
}

export default function ListItem({ icon, description, title, ...rest }: ListItemProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			className="flex-row w-full items-center"
			{...rest}
		>

			<View className="py-4 px-3">
				<Image
					source={icon}
					width={50}
					height={50}
				/>
			</View>

			<View className="py-4 gap-1 flex-col flex-auto">
				<Text className="font-semibold text-ink-normal text-lg">{title}</Text>
				<Text className="font-regular text-gray-800">{description}</Text>
			</View>

			<View className="px-5">
				<FontAwesome name="chevron-right" />
			</View>

		</TouchableOpacity>
	)
}