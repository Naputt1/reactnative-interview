import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import ProductsScreen from '@/screens/ProductsScreen';
import GlobalFavoritesScreen from '@/screens/GlobalFavoritesScreen';
import UserFavoritesScreen from '@/screens/UserFavoritesScreen';
import { useTheme } from '@/hooks/use-theme';

export type TabParamList = {
  Products: undefined;
  GlobalFavorites: undefined;
  UserFavorites: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: { backgroundColor: theme.background },
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
      }}>
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/images/tabIcons/home.png')}
              style={{ width: 24, height: 24 }}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GlobalFavorites"
        component={GlobalFavoritesScreen}
        options={{
          title: 'Global Favorites',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/images/tabIcons/explore.png')}
              style={{ width: 24, height: 24 }}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserFavorites"
        component={UserFavoritesScreen}
        options={{
          title: 'My Favorites',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/images/tabIcons/explore.png')}
              style={{ width: 24, height: 24 }}
              tintColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
