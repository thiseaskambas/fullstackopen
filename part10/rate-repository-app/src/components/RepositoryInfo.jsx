import {
  StyleSheet,
  Image,
  View,
  Pressable,
  ListHeaderComponent,
} from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  flexContainer: {
    padding: 5,
    backgroundColor: 'white',
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
  },
  descriptionCtn: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.topCtn}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.img} />
        <View
          style={{
            flexGrow: 1,
            marginLeft: 10,
          }}
        >
          <Text fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <View style={styles.descriptionCtn}>
            <Text style={styles.description}>{repository.description}</Text>
          </View>
          <View style={styles.btnCtn}>
            <Text style={styles.btn}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsCtn}>
        <View style={styles.stats}>
          <Text fontWeight="bold">
            {repository.stargazersCount < 1000
              ? repository.stargazersCount
              : `${(repository.stargazersCount / 1000).toFixed(1)}k`}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">
            {repository.forksCount < 1000
              ? repository.forksCount
              : `${(repository.forksCount / 1000).toFixed(1)}k`}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">{repository.reviewCount} </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">{repository.ratingAverage} </Text>
          <Text>Rating</Text>
        </View>
      </View>
      <View style={styles.cta}>
        <Pressable onPress={() => Linking.openURL(repository.url)}>
          <Text style={styles.btnCta}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RepositoryInfo;
