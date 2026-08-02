/**
 * @format
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import type { HomeTabParamList } from '../navigation/types';
import DashboardScreen from './DashboardScreen';
import SettingsScreen from './SettingsScreen';
import TransactionsScreen from './TransactionsScreen';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const TAB_ICONS: Record<keyof HomeTabParamList, string> = {
  Dashboard: '📊',
  Transactions: '💳',
  Settings: '⚙️',
};

function TabIcon({
  routeName,
  size,
}: {
  routeName: keyof HomeTabParamList;
  size: number;
}) {
  return <Text style={{ fontSize: size }}>{TAB_ICONS[routeName]}</Text>;
}

function getScreenOptions({ route }: { route: { name: string } }) {
  const routeName = route.name as keyof HomeTabParamList;
  return {
    tabBarIcon: ({ size }: { size: number }) => (
      <TabIcon routeName={routeName} size={size} />
    ),
  };
}

function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
