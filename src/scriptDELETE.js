import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const deletar = ({ route, navigation }) => {
  const { idInicial } = route.params || {}; 
  const [id, setId] = useState(idInicial || ''); 

  const handleDeleteProduct = async () => {

    if (!id) {
      Alert.alert('Erro', 'ID do produto não fornecido.');
      return;
    }

    try {
      console.log('ID do produto a ser excluído:', id);

    
      const response = await axios.delete('http://localhost/DESKTOP/Controller/produto.php', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: id, 
        },
      });

      console.log('Resposta da API:', response.data); 

      if (response.status === 200 || response.status === 204) {
        Alert.alert('Sucesso', 'Produto excluído com sucesso');
        navigation.navigate('ProductsScreen'); 
      } else {
        Alert.alert('Erro', response.data?.msg || 'Erro ao excluir produto.');
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error.response ? error.response.data : error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Excluir Produto</Text>
        <TextInput
          placeholder="ID do Produto"
          value={id}
          onChangeText={setId}
          style={styles.input}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleDeleteProduct}>
          <Text style={styles.buttonText}>Excluir Produto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#1b1a1a',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    width: '80%',
    shadowColor: 'rgba(151, 65, 252, 0.2)',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    padding: 10,
    marginTop: 5,
    borderRadius: 3,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 7,
    backgroundColor: 'rgb(61, 106, 255)', 
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 2,
    color: '#fff',
  },
});

export default deletar;
