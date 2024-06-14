import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/tabs/homeScreen";
import { HomeStackParamList } from "@/types/reactNavigationTypes";
import { PaymentsScreen } from "../screens/paymentsScreen";
import { GuardiansScreen } from "../screens/guardianScreen/guardiansScreen";
import { ManageRoutesScreen } from "../screens/routesScreens/manageRoutesScreen";
import { ChildsScreen } from "../screens/childsScreens/childsScreen";
import { ChildsRegisterScreen } from "../screens/childsScreens/childsRegisterScreen";
import { GuardianRegisterScreen } from "../screens/guardianScreen/guardiansRegisterScreen";
import Header from "@/components/header";
import { SchoolsScreen } from "../screens/schoolsScreens/schoolsScreen";
import { SchoolsRegisterScreen } from "../screens/schoolsScreens/schoolsRegisterScreen";
import { DetailsRouteScreen } from "../screens/routesScreens/detailsRouteScreen";
import DetailsChildsScreen from "../screens/childsScreens/detailsChildsScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				header: () => null
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="Childs"
				component={ChildsScreen}
			/>
			<Stack.Screen 
				name="ChildRegister"
				component={ChildsRegisterScreen}
			/>
			<Stack.Screen 
				name="DetailsChild"
				component={DetailsChildsScreen}
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
				name="GuardiansRegister"
				component={GuardianRegisterScreen}
			/>
			<Stack.Screen
				name="Schools"
				component={SchoolsScreen}
			/>
			<Stack.Screen
				name="SchoolsRegister"
				component={SchoolsRegisterScreen}
			/>
			<Stack.Screen
				name="ManageRoutes"
				component={ManageRoutesScreen}
			/>
			<Stack.Screen
				name="DetailsRoute"
				component={DetailsRouteScreen}
			/>
		</Stack.Navigator>
	)
}