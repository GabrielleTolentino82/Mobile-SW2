import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';

const atualizar = ({ route, navigation }) => {
  const { nomeInicial, descricaoInicial, qtdInicial, marcaInicial, precoInicial, validadeInicial } = route.params || {};

  const [id, setId] = useState(''); 
  const [nome, setNome] = useState(nomeInicial || '');
  const [descricao, setDescricao] = useState(descricaoInicial || '');
  const [qtd, setQtd] = useState(qtdInicial ? qtdInicial.toString() : '');
  const [marca, setMarca] = useState(marcaInicial || '');
  const [preco, setPreco] = useState(precoInicial ? precoInicial.toString() : '');
  const [validade, setValidade] = useState(validadeInicial || '');

  const handleUpdateProduct = async () => {
    // Validações
    if (!id || !nome || !descricao || !qtd || !marca || !preco || !validade) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const quantidade = parseInt(qtd, 10);
    const precoValue = parseFloat(preco);
    if (isNaN(quantidade) || quantidade <= 0 || isNaN(precoValue) || precoValue <= 0) {
      Alert.alert('Erro', 'Quantidade e Preço devem ser números válidos e positivos.');
      return;
    }

    const validadeRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!validade.match(validadeRegex)) {
      Alert.alert('Erro', 'Formato de validade inválido. Use YYYY-MM-DD.');
      return;
    }

    try {
      const productData = {
        id,
        nome,
        descricao,
        qtd: quantidade,
        marca,
        preco: precoValue,
        validade,
      };

      console.log('Dados a serem enviados:', productData);

      // Requisição PUT para atualizar o produto
      const response = await axios.put(`http://localhost/DESKTOP/Controller/produto.php`, productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Resposta da API:', response.data); 
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Produto atualizado com sucesso');
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
        <Text style={styles.title}>Atualizar Produto</Text>
        <TextInput
          placeholder="ID do Produto"
          value={id}
          onChangeText={setId}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        <TextInput
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          style={styles.input}
        />
        <TextInput
          placeholder="Quantidade"
          value={qtd}
          onChangeText={setQtd}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Marca"
          value={marca}
          onChangeText={setMarca}
          style={styles.input}
        />
        <TextInput
          placeholder="Preço"
          value={preco}
          onChangeText={setPreco}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Validade (YYYY-MM-DD)"
          value={validade}
          onChangeText={setValidade}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
          <Text style={styles.buttonText}>Atualizar Produto</Text>
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
    marginTop: '5%',
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

export default atualizar;
