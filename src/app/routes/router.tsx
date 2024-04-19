import { NavigationContainer } from "@react-navigation/native";

import { useUserStore } from "@/store/user-store";

import TabRoutes from "./tab.routes";
import AuthStack from "./auth.stack";

export default function Router() {

  const userStore = useUserStore()

  console.log(userStore.user)
  
  return (
    <NavigationContainer independent={true}>
      {userStore.user ? <TabRoutes /> : <AuthStack />}
    </NavigationContainer>
  )
  
}