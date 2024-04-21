import { useUserStore } from "@/store/user-store"
import { StatusBar } from "react-native"

import Button from "@/components/button"
import MainConteiner from "@/components/mainConteiner"

export default function SettingsScreen() {

	const { signOut } = useUserStore()

	return (
		<MainConteiner>
			<StatusBar barStyle={"dark-content"} />

			<MainConteiner.middle>
				<Button onPress={() => signOut()}>
					<Button.Text title="SignOut" />
				</Button>
			</MainConteiner.middle>
			
		</MainConteiner>
	)
}