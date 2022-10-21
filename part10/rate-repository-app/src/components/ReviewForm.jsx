import * as yup from 'yup';
import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { useNavigate } from 'react-router-native';
import { useApolloClient, useMutation } from '@apollo/client';

import theme from '../theme';
import Text from './Text';
import { REVIEW } from '../graphql/mutations';

const initialValues = {
  repoowner: '',
  reponame: '',
  rating: '',
  review: '',
};

//zeit/next.js

const validationSchema = yup.object().shape({
  repoowner: yup.string().required(),
  reponame: yup.string().required(),
  rating: yup
    .number()
    .positive()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be a number between 0 and 100')
    .max(100, 'Rating must be a number between 0 and 100')
    .required('Rating value is required'),
  review: yup.string(),
});

const Form = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        name="repoowner"
        placeholder="Repository owner's username"
      />
      <FormikTextInput name="reponame" placeholder="Repository's name " />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" />

      <Pressable style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [mutate, result] = useMutation(REVIEW);
  const onSubmit = async (values) => {
    const { repoowner, reponame, rating, review } = values;
    try {
      const { data } = await mutate({
        variables: {
          review: {
            repositoryName: reponame,
            ownerName: repoowner,
            text: review,
            rating: +rating,
          },
        },
      });

      navigate(`/repo/${data.createReview.repositoryId}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => <Form onSubmit={props.handleSubmit} />}
    </Formik>
  );
};

export default ReviewForm;

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
