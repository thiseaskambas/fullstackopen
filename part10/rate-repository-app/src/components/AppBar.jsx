import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: theme.backgroundColors.appBar,
    display: 'flex',
    flexDirection: 'row',
  },
  // ...
});

const AppBarTab = ({ children }) => (
  <Pressable style={{ paddingLeft: 10 }}>
    <Text fontSize="barItem" color="barItem" fontWeight="bold">
      {children}
    </Text>
  </Pressable>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab>Repositories</AppBarTab>
      <AppBarTab>Info</AppBarTab>
    </View>
  );
};

export default AppBar;
