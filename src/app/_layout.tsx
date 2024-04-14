import "@/styles/global.css";

import { Slot } from "expo-router";

import {
	useFonts,
	NunitoSans_400Regular,
	NunitoSans_600SemiBold,
	NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans"

export default function Layout() {

	const [fontsLoaded] = useFonts({
		NunitoSans_400Regular,
		NunitoSans_600SemiBold,
		NunitoSans_700Bold,
  });

	if (!fontsLoaded) {
		return null
	}

	return <Slot />
}