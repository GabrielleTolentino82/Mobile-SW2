import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const UsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/back/Controller/usuario.php');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar os usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#488aec" />
        <Text style={styles.loadingText}>Carregando usuários...</Text>
      </View>
    );
  }

  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handlePrevUser = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? users.length - 1 : prevIndex - 1
    );
  };

  const currentUser = users[currentIndex];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Adicionar')}>
          <Text style={styles.btnText}>Adicionar Usuário</Text>
        </Pressable>

        <View style={styles.userContainer}>
          {currentUser && (
            <View style={styles.card}>
              <View style={styles.card__content}>
                <Text style={styles.cardTitle}>{currentUser.nome}</Text>
                <Text style={styles.cardText}>
                  <Text style={styles.label}>Email:</Text> {currentUser.email}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={styles.label}>Senha:</Text> {currentUser.senha}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.navigationContainer}>
          <Pressable style={styles.navButton} onPress={handlePrevUser}>
            <Text style={styles.navButtonText}>Anterior</Text>
          </Pressable>
          <Pressable style={styles.navButton} onPress={handleNextUser}>
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
  userContainer: {
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

export default UsersScreen;
