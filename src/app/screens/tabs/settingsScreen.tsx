import Button from "@/components/button"
import { useUserStore } from "@/store/user-store"

export default function SettingsScreen() {

	const { signOut } = useUserStore()

	return (
		<Button onPress={() => signOut()}>
			<Button.Text title="SignOut"/>
		</Button>
	)
}