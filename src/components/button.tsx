import { colors } from "@/styles/colors";
import { ReactNode } from "react";

import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
	children: ReactNode;
	theme?: "primary" | "secondary";
}

function Button({ children, theme = "primary" }: ButtonProps) {
	return (
		<TouchableOpacity
			className="rounded-lg w-full items-center justify-center p-4 flex-row gap-3"
			style={{
				backgroundColor: theme === "primary" ? colors.blue[900] : colors.gray[200]
			}}
			activeOpacity={0.8}
		>
			{children}
		</TouchableOpacity>
	)
}

type TextButtonProps = {
	title: string;
	theme?: "primary" | "secondary";
}

function TextButton({ title, theme="primary"}: TextButtonProps) {
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