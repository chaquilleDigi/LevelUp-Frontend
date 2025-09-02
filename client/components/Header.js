import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1E90FF',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Header;
