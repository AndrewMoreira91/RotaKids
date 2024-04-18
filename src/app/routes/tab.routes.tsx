import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Home from "../screens/tabs/home"
import Maps from "../screens/tabs/maps"
import SettingsScreen from "../screens/tabs/settingsScreen"

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
	return(
		<Tab.Navigator>
			<Tab.Screen 
				name="Home"
				component={Home}
			/>
			<Tab.Screen 
				name="Maps"
				component={Maps}
			/>
			<Tab.Screen 
				name="Settings"
				component={SettingsScreen}
			/>
		</Tab.Navigator>
	)
}