import { Text as NativeText, StyleSheet, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  barItemColor: {
    color: theme.colors.barItem,
  },
  barItemFontSize: {
    fontSize: theme.fontSizes.barItem,
  },
  backgroundColorBtn: {
    backgroundColor: theme.backgroundColors.btn,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  backgroundColor,
  ...props
}) => {
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/ARIAL.ttf'),
    Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  const font = Platform.OS === 'android' ? 'Roboto' : 'Arial';
  console.log({ font });
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'barItem' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    backgroundColor === 'btn' && styles.backgroundColorBtn,
    color === 'barItem' && styles.barItemColor,
    { fontFamily: font },
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
