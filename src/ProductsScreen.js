import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost/DESKTOP/Controller/produto.php');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#488aec" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  const handleNextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrevProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const currentProduct = products[currentIndex];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        <Pressable style={styles.btn} onPress={() => navigation.navigate('adicionar')}>
          <Text style={styles.btnText}>Adicionar Produto</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('deletar')}>
          <Text style={styles.btnText}>Deletar um Produto</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('atualizar')}>
          <Text style={styles.btnText}>Atualizar um Produto</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('atualizar_parcialmente')}>
          <Text style={styles.btnText}>Atualizar um Produto parcialmente</Text>
        </Pressable>

        <View style={styles.produtoContainer}>
          <View style={styles.card}>
            <View style={styles.card__content}>
              <Text style={styles.cardTitle}>{currentProduct.nome}</Text>
              <Text style={styles.cardText}>
                <Text style={styles.label}>Descrição:</Text> {currentProduct.descricao}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.label}>Quantidade:</Text> {currentProduct.qtd}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.label}>Marca:</Text> {currentProduct.marca}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.label}>Preço:</Text> R${currentProduct.preco}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.label}>Validade:</Text> {currentProduct.validade}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.navigationContainer}>
          <Pressable style={styles.navButton} onPress={handlePrevProduct}>
            <Text style={styles.navButtonText}>Anterior</Text>
          </Pressable>
          <Pressable style={styles.navButton} onPress={handleNextProduct}>
            <Text style={styles.navButtonText}>Próximo</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#231f1f',
    paddingHorizontal: width * 0.04,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
  btn: {
    marginTop: 15,
    padding: 10,
    borderRadius: 7,
    borderColor: 'rgb(61, 106, 255)',
    borderWidth: 1,
    backgroundColor: 'transparent',
    color: '#fff',
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: width < 400 ? 16 : 18, 
  },
  produtoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: 'rgb(5, 6, 45)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  card__content: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: width < 400 ? 22 : 26, 
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardText: {
    fontSize: width < 400 ? 16 : 18, 
    color: '#ffffff',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  navButton: {
    flex: 1,
    padding: 10,
    borderRadius: 7,
    marginHorizontal: 5,
    borderColor: 'rgb(61, 106, 255)',
    borderWidth: 1,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: width < 400 ? 18 : 20, 
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
  },
});

export default ProductsScreen;
