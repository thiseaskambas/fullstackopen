import { View, Pressable, StyleSheet } from 'react-native';

import Text from './Text';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const initialValues = {
  email: '',
  passWord: '',
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    display: 'flex',
  },
  btn: {
    backgroundColor: '#014598',
    display: 'flex',
    alignItems: 'center',
  },
  btnText: {
    color: theme.colors.btnItem,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.barItem,
  },
});

const SingInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput name="email" placeholder="email" />
      <FormikTextInput name="password" placeholder="password" />
      <Pressable onPress={onSubmit} style={styles.btn}>
        <Text style={styles.btnText}>Log-in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => <SingInForm onSubmit={props.handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
