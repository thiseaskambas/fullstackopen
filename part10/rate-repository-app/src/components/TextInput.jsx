import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderRadius: 3,
    borderColor: '#767676',
    borderWidth: 1,
  },
  error: {
    borderColor: 'red',
    borderRadius: 3,
    borderWidth: 1,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error ? styles.error : styles.input];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
