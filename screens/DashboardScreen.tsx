/**
 * @format
 */

import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import TransactionRow from '../components/TransactionRow';
import {
  formatCurrency,
  getBalance,
  getExpenseTotal,
  getIncomeTotal,
  getSortedByDateDesc,
} from '../data/transactions';
import type { HomeTabParamList } from '../navigation/types';

const RECENT_COUNT = 5;

function DashboardScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeTabParamList>>();

  const balance = getBalance();
  const income = getIncomeTotal();
  const expenses = getExpenseTotal();
  const recent = getSortedByDateDesc().slice(0, RECENT_COUNT);

  return (
    <ScrollView
      style={[styles.container, isDarkMode && styles.containerDark]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, isDarkMode && styles.textDark]}>
        Dashboard
      </Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceValue}>{formatCurrency(balance)}</Text>
      </View>

      <View style={styles.statRow}>
        <View style={[styles.statCard, isDarkMode && styles.statCardDark]}>
          <Text style={styles.statLabel}>Income</Text>
          <Text style={[styles.statValue, styles.incomeValue]}>
            {formatCurrency(income)}
          </Text>
        </View>
        <View style={[styles.statCard, isDarkMode && styles.statCardDark]}>
          <Text style={styles.statLabel}>Expenses</Text>
          <Text style={[styles.statValue, styles.expenseValue]}>
            {formatCurrency(expenses)}
          </Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>
          Recent Transactions
        </Text>
        <Pressable onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <View>
        {recent.map(transaction => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </View>
    </ScrollView>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000000',
  },
  textDark: {
    color: '#ffffff',
  },
  balanceCard: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  balanceLabel: {
    color: '#dbeafe',
    fontSize: 14,
    fontWeight: '600',
  },
  balanceValue: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 6,
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
  },
  statCardDark: {
    backgroundColor: '#1e1e1e',
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8a8a8a',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  incomeValue: {
    color: '#16a34a',
  },
  expenseValue: {
    color: '#dc2626',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
});

export default DashboardScreen;
