import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons"

import HomeStack from "./homeStack.routes"
import Maps from "../screens/tabs/maps"
import SettingsScreen from "../screens/tabs/settingsScreen"


const Tab = createBottomTabNavigator()

export default function TabRoutes() {
	return (
		<Tab.Navigator screenOptions={{
			header(props) {
				return null
			},
			tabBarLabelStyle: { fontSize: 14, },
		}}
		>
			<Tab.Screen
				name="HomeStack"
				component={HomeStack}
				options={{
					tabBarIcon: () => <MaterialCommunityIcons name="home" size={30} />,
					tabBarLabel: "Home",
				}}
			/>
			<Tab.Screen
				name="Maps"
				component={Maps}
				options={{
					tabBarIcon: () => <MaterialCommunityIcons name="map" size={30} />,
					tabBarLabel: "Maps",
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarIcon: () => <FontAwesome name="user-circle" size={30} />,
					tabBarLabel: "Conta",
				}}
			/>
		</Tab.Navigator>
	)
}