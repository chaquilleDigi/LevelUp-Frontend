import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <Text style={styles.welcome}>Welcome, {user?.name || 'User'}!</Text>
      <View style={styles.buttons}>
        <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
        <Button title="Logout" onPress={logout} color="#FF4500" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  welcome: {
    fontSize: 22,
    marginVertical: 20,
    textAlign: 'center'
  },
  buttons: {
    marginTop: 20
  }
});

export default HomeScreen;
