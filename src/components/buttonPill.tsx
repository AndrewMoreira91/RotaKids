import { colors } from "@/styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";

type ButtonPillProps = TouchableOpacityProps & {
	title?: string;
	arrowIcon?: "left" | "right";
	iconPosition?: "left" | "right"
	theme?: "primary" | "secondary";
	variant?: "default" | "small",
	isDisabled?: boolean;
	isLoading?: boolean;
}

function ButtonPill({
	title,
	arrowIcon,
	iconPosition = "left",
	theme = "primary",
	isDisabled,
	variant = "default",
	isLoading,
	...rest
}: ButtonPillProps) {
	return (
		<TouchableOpacity
			className="self-start rounded-full flex-row items-center justify-center gap-1"
			style={{
				backgroundColor: theme === "primary" ? colors.blue[500] : colors.gray[200],
				opacity: isDisabled ? 0.5 : 1,
				padding: variant === "small" ? 8 : 12,
			}}
			activeOpacity={0.7}
			{...rest}
			disabled={isDisabled}
		>
			{isLoading && <ActivityIndicator color={colors.gray[25]} />}
			{
				iconPosition === "left" ?
					arrowIcon && <MaterialCommunityIcons
						name={`arrow-${arrowIcon}`}
						size={20}
						color={theme === "primary" ? colors.gray[25] : colors.ink.normal}
					/> :
					null
			}

			{title &&
				<Text
					className="font-semibold"
					style={{
						color: theme === "primary" ? colors.gray[25] : colors.ink.normal,
						fontSize: variant === "small" ? 12 : 16,
					}}
				>
					{title}
				</Text>}

			{
				iconPosition === "right" ?
					arrowIcon && <MaterialCommunityIcons
						name={`arrow-${arrowIcon}`}
						size={20}
						color={theme === "primary" ? colors.gray[25] : colors.ink.normal}
					/> :
					null
			}
		</TouchableOpacity>
	);
}


export default ButtonPill;