import { useState } from "react";
import { BaseNavigationContainer, NavigationContainer } from "@react-navigation/native";

import TabRoutes from "./routes/tab.routes";
import AuthStack from "./routes/authStack";


function App() {

  const [user, setUser] = useState(false)

  return (
    <>
      {user ? <TabRoutes /> : <AuthStack />}
    </>
  )
}

export default App;