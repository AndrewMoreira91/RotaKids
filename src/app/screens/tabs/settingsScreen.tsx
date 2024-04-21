import Button from "@/components/button"
import { useUserStore } from "@/store/user-store"
import { StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SettingsScreen() {

	const { signOut } = useUserStore()

	return (
		<SafeAreaView>
			<StatusBar barStyle={"dark-content"}/>
			<Button onPress={() => signOut()}>
				<Button.Text title="SignOut" />
			</Button>
		</SafeAreaView>
	)
}