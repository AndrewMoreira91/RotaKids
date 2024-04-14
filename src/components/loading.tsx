import { colors } from "@/styles/colors";
import { ActivityIndicator } from "react-native";

export default function Loading() {
	return <ActivityIndicator className="flex-1 bg-transparent" color={colors.blue[700]} size={40}/>;
}