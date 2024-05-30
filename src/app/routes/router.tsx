import { NavigationContainer } from "@react-navigation/native";

import { useUserStore } from "@/store/user-store";

import TabRoutes from "./tab.routes";
import AuthStack from "./authStack.routes";

export default function Router() {

  const { user } = useUserStore()

  // console.log(user)
  
  return (
    <NavigationContainer independent={true}>
      {user ? <TabRoutes /> : <AuthStack />}
    </NavigationContainer>
  )
  
}