import { Text, View } from "react-native";

type RoutesBoxProps = {
	titleRoute: string;
	startTime?: string;
	stops?: number;
	schools?: number;
}

export default function RoutesBox({ titleRoute, schools, startTime, stops }: RoutesBoxProps) {
	return (
		<>
			<View className="w-full border-b my-2 border-gray-400" />

			<View className="flex-col gap-1">
				<View className="flex-row justify-between">
					<Text className="font-semibold text-ink-normal text-2xl">
						{titleRoute}
					</Text>
					<Text className="font-regular text-lg">
						hora de inicio: {startTime}
					</Text>
				</View>

				<View className="flex-row justify-between">
					<Text>
						{stops} paradas
					</Text>
					<Text>
						{schools} escolas
					</Text>
				</View>
			</View>
		</>
	)
}