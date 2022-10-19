import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_SINGLE_REPO } from '../graphql/queries';
import { StyleSheet, Image, View, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';
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
    textAlign: 'center',
  },
  btnCtn: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  cta: {
    margin: 5,
  },
  btnCta: {
    backgroundColor: theme.backgroundColors.btn,
    color: theme.colors.btnItem,
    borderRadius: 5,
    fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center',
  },
  description: {
    color: '#505050',
    flex: 1,
    flexWrap: 'wrap',
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
    display: 'flex',
    flexDirection: 'row',
  },
});

const SingleView = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_REPO, {
    variables: { id },
  });
  if (loading || error) return null;

  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    url,
  } = data.repository;

  return (
    <View style={styles.flexContainer}>
      <View style={styles.topCtn}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.img} />
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
            {stargazersCount < 1000
              ? stargazersCount
              : `${(stargazersCount / 1000).toFixed(1)}k`}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">
            {forksCount < 1000
              ? forksCount
              : `${(forksCount / 1000).toFixed(1)}k`}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">{reviewCount} </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">{ratingAverage} </Text>
          <Text>Rating</Text>
        </View>
      </View>
      <View style={styles.cta}>
        <Pressable>
          <Text style={styles.btnCta}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SingleView;
