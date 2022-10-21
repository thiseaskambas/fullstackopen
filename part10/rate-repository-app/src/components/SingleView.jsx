import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_SINGLE_REPO } from '../graphql/queries';
import { StyleSheet, View, FlatList } from 'react-native';
import Text from './Text';

import RepositoryInfo from './RepositoryInfo';
import theme from '../theme';

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewCtn: {
    display: 'flex',
    flexDirection: 'row',
    // borderColor: 'green',
    // borderWidth: 2,
    backgroundColor: 'white',
    padding: 10,
  },
  rating: {
    borderColor: theme.backgroundColors.btn,
    borderWidth: 2,
    height: 45,
    width: 45,
    borderRadius: 50,
    textAlign: 'center',
    lineHeight: 45,
    color: theme.backgroundColors.btn,
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingCtn: {
    // borderColor: 'orange',
    // borderWidth: 2,
    marginRight: 10,
  },
  ctnChild: {
    // borderColor: 'red',
    // borderWidth: 2,
    flexGrow: 1,
  },
  textCtn: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    // borderColor: 'blue',
    // borderWidth: 1,
  },
});

const renderItem = ({ item }) => {
  const date = new Date(item.createdAt);
  const newDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  return (
    <View style={styles.reviewCtn}>
      <View style={styles.ratingCtn}>
        <Text style={styles.rating}>{item.rating}</Text>
      </View>
      <View style={styles.ctnChild}>
        <View>
          <Text fontWeight="bold">{item.user.username}</Text>
        </View>
        <View>
          <Text>{newDate}</Text>
        </View>
        <View style={styles.textCtn}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

const ReviewListContainer = ({ repository }) => {
  console.log(repository);
  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
    />
  );
};

const SingleView = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_REPO, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });
  if (loading || error) return null;

  const { repository } = data;

  return <ReviewListContainer repository={repository} />;
};

export default SingleView;
