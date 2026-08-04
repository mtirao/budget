/**
 * @format
 */

import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native';
import TransactionRow from '../../components/TransactionRow';
import { getSortedByDateDesc, type Transaction } from '../../data/transactions';

const sortedTransactions = getSortedByDateDesc();

function TransactionsScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const renderItem = ({ item }: { item: Transaction }) => (
    <TransactionRow transaction={item} />
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>
        Transactions
      </Text>
      <FlatList
        data={sortedTransactions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    color: '#000000',
  },
  textDark: {
    color: '#ffffff',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default TransactionsScreen;
