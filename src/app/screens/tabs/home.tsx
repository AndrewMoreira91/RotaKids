import { useUserStore } from "@/store/user-store"
import { router } from "expo-router"
import { Text } from "react-native"

export default function Home() {

	const userStore = useUserStore()

	if (userStore.user) {
		return (
			<Text className="flex-1 justify-center items-center">
				Olá, {userStore.user.firstName}
			</Text>
		)
	} else {
		userStore.signOut()
		router.push("./routes/auth.stack")
	}
}