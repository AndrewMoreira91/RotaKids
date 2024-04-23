import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons"
import Divisor from "./divisor";

type ListItemDragProps = {
	name: string
}

export default function ListItemDrag({ name }: ListItemDragProps) {
	return (
		<View className="my-4">
			<View className="flex-row justify-between">
				<View>
					<Text
						className="text-2xl font-bold text-ink-normal"
					>
						Rua Exemplo dos Testes, 154
					</Text>

					<Text
						className="text-xl text-ink-light font-regular"
					>{name}</Text>
				</View>

				<View className="justify-center flex">
					<FontAwesome
						name="bars"
						size={30}
					/>
				</View>
			</View>

			<Divisor />
		</View>
	)
}