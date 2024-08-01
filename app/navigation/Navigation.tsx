import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Todolistpage from "../screens/Todolistpage";
import { useAuth } from "../context/AuthContext";

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
         
          <Stack.Screen name="TodoList" component={Todolistpage} />
        ) : (
          
          <Stack.Screen name="Login"  component={Login} options={{headerShown:false}} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
