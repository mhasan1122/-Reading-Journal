import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BookForm } from '../components/BookForm';
import { useBooks } from '../hooks/useBooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type AddEditBookScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddEditBook'
>;

interface AddEditBookScreenProps {
  navigation: AddEditBookScreenNavigationProp;
  route: any;
}

export const AddEditBookScreen: React.FC<AddEditBookScreenProps> = ({
  navigation,
  route,
}) => {
  const { addBook, updateBook, deleteBook, allBooks } = useBooks();
  const bookId = route.params?.bookId;
  const bookToEdit = bookId ? allBooks.find((b) => b.id === bookId) : undefined;

  const handleSubmit = async (bookData: any) => {
    if (bookToEdit) {
      await updateBook(bookId, bookData);
    } else {
      await addBook(bookData);
    }
    navigation.goBack();
  };

  const handleDelete = async () => {
    if (bookId) {
      await deleteBook(bookId);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <BookForm
        initialData={bookToEdit}
        onSubmit={handleSubmit}
        onDelete={bookToEdit ? handleDelete : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
  },
});
