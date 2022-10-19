import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_LOGGED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: theme.backgroundColors.appBar,
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
  },
  link: {
    fontSize: theme.fontSizes.barItem,
    color: theme.colors.barItem,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ children }) => {
  return (
    <View style={{ paddingHorizontal: 5, borderColor: 'blue', borderWidth: 1 }}>
      {children}
    </View>
  );
};

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authContext = useAuthStorage();
  const { loading, data } = useQuery(GET_LOGGED_USER);

  const logOutHandler = (e) => {
    e.preventDefault();
    authContext.removeAccessToken();
    console.log('logging out');
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab>
          <Link to="/repositories">
            <Text style={styles.link}>Repositories</Text>
          </Link>
        </AppBarTab>
        {!loading && data?.me === null && (
          <AppBarTab>
            <Link to="/sign-in">
              <Text style={styles.link}>Sign-in</Text>
            </Link>
          </AppBarTab>
        )}
        {!loading && data?.me !== null && (
          <AppBarTab>
            <Pressable onPress={logOutHandler}>
              <Text style={styles.link}>Sign-out</Text>
            </Pressable>
          </AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
