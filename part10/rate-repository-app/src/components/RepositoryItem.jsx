import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RepositoryItem = ({
  fullName,
  description,
  language,
  stars,
  forks,
  reviews,
  rating,
}) => {
  return (
    <View>
      <Text>Full name: {fullName}</Text>
      <Text>Description: {description}</Text>
      <Text>Language: {language}</Text>
      <Text>Stars: {stars}</Text>
      <Text>Forks: {forks}</Text>
      <Text>Reviews: {reviews}</Text>
      <Text>Rating: {rating}</Text>
    </View>
  );
};

export default RepositoryItem;
