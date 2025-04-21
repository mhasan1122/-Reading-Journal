import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../my-expo-app/screens/HomeScreen';
import { AddEditBookScreen } from '../my-expo-app/screens/AddEditBookScreen';
import { BookDetailScreen } from '../my-expo-app/screens/BookDetailScreen';
import { StatusBar } from 'expo-status-bar';
import { BooksProvider } from '../my-expo-app/hooks/useBooks';





export type RootStackParamList = {
  Home: undefined;
  AddEditBook: { bookId?: string };
  BookDetail: { bookId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <BooksProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3B82F6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Reading Journal' }}
          />
          <Stack.Screen
            name="AddEditBook"
            component={AddEditBookScreen}
            options={({ route }) => ({
              title: route.params?.bookId ? 'Edit Book' : 'Add Book',
            })}
          />
          <Stack.Screen
            name="BookDetail"
            component={BookDetailScreen}
            options={{ title: 'Book Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BooksProvider>
  );
}