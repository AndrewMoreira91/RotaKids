import "@/styles/global.css";

import { Slot, Stack } from "expo-router";

import {
	useFonts,
	NunitoSans_400Regular,
	NunitoSans_600SemiBold,
	NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans"

import { useUserStore } from "@/store/user-store";

import Loading from "@/components/loading";

export default function Layout() {

	const { user } = useUserStore();

	const [fontsLoaded] = useFonts({
		NunitoSans_400Regular,
		NunitoSans_600SemiBold,
		NunitoSans_700Bold,
	});

	if (!fontsLoaded) {
		return <Loading />;
	}

	return <Stack screenOptions={{
		header(props) {
			return null;
		},
	}} />
}