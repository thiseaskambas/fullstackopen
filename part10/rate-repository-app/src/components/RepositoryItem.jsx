import { View } from 'react-native';
import Text from './Text';
import React from 'react';

import { StyleSheet, Image } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  flexContainer: {
    padding: 5,
    backgroundColor: 'white',
    // display: 'flex',
    //  alignItems: 'center',
  },
  statsCtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
  },
  btn: {
    backgroundColor: theme.backgroundColors.btn,
    color: theme.colors.btnItem,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  btnCtn: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },

  stats: {
    display: 'flex',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 5,
  },
  topCtn: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  descriptionCtn: {
    // display: 'flex',
    flexDirection: 'row',
  },
  description: {
    color: '#505050',
    flex: 1,
  },
});

const RepositoryItem = ({
  fullName,
  description,
  language,
  stars,
  forks,
  reviews,
  rating,
  img,
}) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.topCtn}>
        <Image source={{ uri: img }} style={styles.img} />
        <View
          style={{
            flexGrow: 1,
            marginLeft: 10,
          }}
        >
          <Text fontSize="subheading" fontWeight="bold">
            {fullName}
          </Text>
          <View style={styles.descriptionCtn}>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.btnCtn}>
            <Text style={styles.btn}>{language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsCtn}>
        <View style={styles.stats}>
          <Text fontWeight="bold">
            {stars < 1000 ? stars : `${(stars / 1000).toFixed(1)}k`}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">
            {forks < 1000 ? forks : `${(forks / 1000).toFixed(1)}k`}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">{reviews} </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">{rating} </Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
