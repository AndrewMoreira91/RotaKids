import { StatusBar, Text, View } from "react-native";

function sendDocuments() {
	return (
		<View className="flex-1 bg-gray-25 px-4 justify-between my-6">
			<StatusBar barStyle={"dark-content"} />

			<View className="mt-10 gap-3">
				<Text className="font-semibold text-ink-normal text-3xl">
					Para prosseguir, precisamos de algumas fotos de seus documentos.
				</Text>
				<Text className="font-regular text-ink-light text-lg">
					Por favor, tenha certeza que as fotos ficaram nitidas
				</Text>
			</View>

		</View>
	)
}

export default sendDocuments;