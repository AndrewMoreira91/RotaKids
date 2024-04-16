import { ReactNode } from "react";

import { colors } from "@/styles/colors";

import { TextInput, TextInputProps, View } from "react-native";

type InputProps = {
	variant?: "default" | "square" | "outline";
	children: ReactNode;
}

function Input({ children, variant="default" }: InputProps) {
	return (
		<View
			className="rounded-lg gap-3 flex-row px-4 py-3 items-center"
			style={{
				width: variant === "square" ? null : "100%",
				backgroundColor: variant === "outline" ? "transparent" : colors.gray[200],
				borderBottomWidth: variant === "outline" ? 1 : 0,
				borderColor: colors.ink.light,
			}}
		>
			{children}
		</View>
	)
}

function Field({ variant="default", ref, ...rest }: TextInputProps & { variant?: "default" | "square", ref?: any }) {
	return (
		<TextInput
			placeholderTextColor={colors.ink.light}
			className="text-lg self-start items-center justify-center"
			maxLength={variant === "square" ? 1 : undefined}
			{...rest}
		/>
	)
}

Input.Field = Field;

export { Input };