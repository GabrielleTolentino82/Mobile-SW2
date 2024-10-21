import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from './src/ProductsScreen'; 
import atualizar from './src/scriptPUT'; 
import atualizar_parcialmente from './src/scriptPATCH'; 
import deletar from './src/scriptDELETE';
import adicionar from './src/scriptPOST';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="ProductsScreen"
        screenOptions={{
          headerStyle: { backgroundColor: 'rgb(61, 106, 255)' }, 
          headerTintColor: '#fff', 
          headerTitleStyle: { fontWeight: 'bold' }, 
        }}
      >
        <Stack.Screen
          name="ProductsScreen"
          component={ProductsScreen}
          options={{ title: 'Produtos' }}
        />
        <Stack.Screen
          name="adicionar"
          component={adicionar}
          options={{ title: 'Adicionar Produto' }}
        />
        <Stack.Screen
          name="atualizar"
          component={atualizar}
          options={{ title: 'Atualizar Produto' }}
        />
        <Stack.Screen
          name="atualizar_parcialmente"
          component={atualizar_parcialmente}
          options={{ title: 'Atualizar Produto Parcialmente' }}
        />
        <Stack.Screen
          name="deletar"
          component={deletar}
          options={{ title: 'Deletar Produto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
