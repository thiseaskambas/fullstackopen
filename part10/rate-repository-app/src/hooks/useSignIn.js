import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
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

      return { data: data.authenticate.accessToken };
    } catch (err) {
      console.log(err);
    }
  };

  return [signIn, result];
};

export default useSignIn;
