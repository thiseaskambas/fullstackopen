import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE, {
    onError: (error) => {
      console.log(error);
    },
  });

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });

      authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();

      return { data: data.authenticate.accessToken };
    } catch (err) {
      console.log(err);
    }
  };

  return [signIn, result];
};

export default useSignIn;
