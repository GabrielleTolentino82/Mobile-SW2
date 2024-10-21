import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker } from 'react-native';
import axios from 'axios';

const atualizar_parcialmente = ({ route, navigation }) => {
  const { idInicial, nomeInicial, descricaoInicial } = route.params || {};

  const [id, setId] = useState(idInicial || '');
  const [campo, setCampo] = useState('nome'); 
  const [novoValor, setNovoValor] = useState(''); 

  const handleUpdateProduct = async () => {

    if (!id || !campo || !novoValor) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      const productData = {
        id,
        campo, 
        novoValor, 
      };

      console.log('Dados a serem enviados:', productData);

    
      const response = await axios.patch(`http://localhost/DESKTOP/Controller/produto.php`, productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Resposta da API:', response.data); 

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Produto atualizado parcialmente com sucesso');
        navigation.navigate('ProductsScreen');
      } else {
        Alert.alert('Erro', response.data?.msg || 'Erro ao atualizar produto.');
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error.response ? error.response.data : error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar atualizar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Atualizar Produto Parcialmente</Text>
        <TextInput
          placeholder="ID do Produto"
          value={id}
          onChangeText={setId}
          style={styles.input}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Campo a ser atualizado:</Text>
        <Picker
          selectedValue={campo}
          style={styles.input}
          onValueChange={(itemValue) => setCampo(itemValue)}
        >
          <Picker.Item label="Nome" value="nome" />
          <Picker.Item label="Descrição" value="descricao" />
          <Picker.Item label="Preço" value="preco" />
          <Picker.Item label="Categoria" value="categoria" />
          <Picker.Item label="Quantidade" value="quantidade" />
         
        </Picker>
        <TextInput
          placeholder="Novo Valor"
          value={novoValor}
          onChangeText={setNovoValor}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
          <Text style={styles.buttonText}>Atualizar</Text>
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
  label: {
    marginVertical: 10,
    fontWeight: 'bold',
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

export default atualizar_parcialmente;
