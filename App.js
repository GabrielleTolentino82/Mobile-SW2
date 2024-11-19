import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersScreen from './src/ProductsScreen'; 
import Adicionar from './src/scriptPOST';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="UsersScreen"
        screenOptions={{
          headerStyle: { backgroundColor: 'rgb(61, 106, 255)' }, 
          headerTintColor: '#fff', 
          headerTitleStyle: { fontWeight: 'bold' }, 
        }}
      >
        <Stack.Screen
          name="UsersScreen"
          component={UsersScreen}
          options={{ title: 'Produtos' }}
        />
        <Stack.Screen
          name="Adicionar"
          component={Adicionar}
          options={{ title: 'Adicionar Produto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
