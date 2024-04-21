import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStackParamList } from "@/types/reactNavigationTypes";

import InitialAccessScreen from "@/app/screens/InitialAcess/InitialAccessScreen";
import PhoneRegisterScreen from "../screens/InitialAcess/phoneRegisterScreen";
import CheckCodeScreen from "@/app/screens/InitialAcess/checkCodeScreen";
import RegisterScreen from "@/app/screens/InitialAcess/registerScreen";
import PrivacyPoliciesScreen from "@/app/screens/InitialAcess/privacyPoliciesScreen";
import SendDocumentsScreen from "@/app/screens/InitialAcess/sendDocumentsScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
	return (
		<Stack.Navigator initialRouteName="InitialAcessPage">
      <Stack.Screen
        name="InitialAcessPage"
        component={InitialAccessScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PhoneRegister"
        component={PhoneRegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CheckCode"
        component={CheckCodeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPoliciesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SendDocuments"
        component={SendDocumentsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
	)
}