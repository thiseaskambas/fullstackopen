import * as yup from 'yup';
import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';

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

const initialValues = {
  email: '',
  passWord: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required('please enter your email'),
  password: yup
    .string()
    .required('Please enter yout password')
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => <SingInForm onSubmit={props.handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
