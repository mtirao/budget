/**
 * @format
 */

import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { formatCurrency, formatDate, type Transaction } from '../data/transactions';

type Props = {
  transaction: Transaction;
};

function TransactionRow({ transaction }: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const isIncome = transaction.amount > 0;

  return (
    <View style={[styles.row, isDarkMode && styles.rowDark]}>
      <View style={[styles.badge, isIncome && styles.badgeIncome]}>
        <Text style={styles.badgeText}>
          {transaction.category.charAt(0)}
        </Text>
      </View>

      <View style={styles.details}>
        <Text
          style={[styles.merchant, isDarkMode && styles.textDark]}
          numberOfLines={1}
        >
          {transaction.merchant}
        </Text>
        <Text style={styles.subtext}>
          {transaction.category} · {formatDate(transaction.date)}
        </Text>
      </View>

      <Text style={[styles.amount, isIncome && styles.amountIncome]}>
        {formatCurrency(transaction.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  rowDark: {
    borderBottomColor: '#2a2a2a',
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  badgeIncome: {
    backgroundColor: '#dcfce7',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#404040',
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  merchant: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  textDark: {
    color: '#ffffff',
  },
  subtext: {
    fontSize: 13,
    color: '#8a8a8a',
    marginTop: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#dc2626',
  },
  amountIncome: {
    color: '#16a34a',
  },
});

export default TransactionRow;
