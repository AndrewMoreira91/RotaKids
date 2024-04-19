import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/types/reactNavigationTypes";

import InitialAccessPage from "./InitialAccessPage";
import TelRegister from "./phoneRegister";
import CheckCode from "./checkCode";
import Register from "./register";
import PrivacyPolicies from "./privacyPolicies";
import SendDocuments from "./sendDocuments";

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function InitialAcessApp() {
	return (
		<Stack.Navigator initialRouteName="InitialAcessPage">
      <Stack.Screen
        name="InitialAcessPage"
        component={InitialAccessPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TelRegister"
        component={TelRegister}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CheckCode"
        component={CheckCode}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicies}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SendDocuments"
        component={SendDocuments}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
	)
}