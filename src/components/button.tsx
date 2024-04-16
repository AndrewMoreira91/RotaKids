import { colors } from "@/styles/colors";
import { ReactNode } from "react";

import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
	children: ReactNode;
	theme?: "primary" | "secondary";
	isDisabled?: boolean;
}

function Button({ children, theme = "primary", isDisabled, ...rest }: ButtonProps) {

	return (
		<TouchableOpacity
			className="rounded-lg w-full items-center justify-center p-4 flex-row gap-3"
			style={{
				backgroundColor: theme === "primary" ? colors.blue[900] : colors.gray[200],
				opacity: isDisabled ? 0.7 : 1,
			}}
			activeOpacity={0.8}
			{...rest}
			disabled={isDisabled}
		>
			{children}
		</TouchableOpacity>
	)
}

type TextButtonProps = {
	title: string;
	theme?: "primary" | "secondary";
}

function TextButton({ title, theme="primary", }: TextButtonProps) {
	return (
		<Text
			className="font-semibold text-lg"
			style={{color: theme == "primary" ? colors.gray[25] : colors.ink.normal}}
		>
			{title}
		</Text>
	)
}

Button.Text = TextButton;

export default Button;