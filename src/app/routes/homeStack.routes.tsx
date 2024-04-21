import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/tabs/homeScreen";
import { ChildsScreen } from "../screens/childsScreen";
import { HomeStackParamList } from "@/types/reactNavigationTypes";
import { PaymentsScreen } from "../screens/paymentsScreen";
import { GuardiansScreen } from "../screens/guardiansScreen";
import { ManageRoutesScreen } from "../screens/driver/manageRoutesScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
			/>
			<Stack.Screen
				name="Childs"
				component={ChildsScreen}
			/>
			<Stack.Screen
				name="Payments"
				component={PaymentsScreen}
			/>
			<Stack.Screen
				name="Guardians"
				component={GuardiansScreen}
			/>
			<Stack.Screen
				name="ManageRoutes"
				component={ManageRoutesScreen}
			/>
		</Stack.Navigator>
	)
}