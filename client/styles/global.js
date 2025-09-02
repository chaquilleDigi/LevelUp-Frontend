import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: colors.text
  }
});
