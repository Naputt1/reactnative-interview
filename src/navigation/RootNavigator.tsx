import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from '@/navigation/TabNavigator';
import ProductDetailScreen from '@/screens/ProductDetailScreen';

export type RootStackParamList = {
  Tabs: undefined;
  ProductDetail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Product Detail' }}
      />
    </Stack.Navigator>
  );
}
