import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/types/reactNavigationTypes";

import InitialAccessPage from "@/app/screens/InitialAcessApp/InitialAccessPage";
import PhoneRegister from "../screens/InitialAcessApp/phoneRegister";
import CheckCode from "@/app/screens/InitialAcessApp/checkCode";
import Register from "@/app/screens/InitialAcessApp/register";
import PrivacyPolicies from "@/app/screens/InitialAcessApp/privacyPolicies";
import SendDocuments from "@/app/screens/InitialAcessApp/sendDocuments";

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function AuthStack() {
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
        name="PhoneRegister"
        component={PhoneRegister}
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