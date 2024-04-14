import { ReactNode } from "react";

import { colors } from "@/styles/colors";

import { KeyboardType, TextInput, TextInputProps, View } from "react-native";

function Input({ children }: { children: ReactNode }) {
	return (
		<View
			className="w-full bg-gray-200 rounded-lg gap-3 flex-row px-4 py-3"
		>
			{children}
		</View>
	)
}

type InputPros = {
	placeHolder?: string;
	type?: KeyboardType;
}

function Field({ ...rest }: TextInputProps) {
	return (
		<TextInput
			placeholderTextColor={colors.ink.light}
			className="text-lg"
			onChange={(e) => console.log(e.nativeEvent.text)}
			{...rest}
		/>
	)
}

Input.Field = Field;

export { Input };