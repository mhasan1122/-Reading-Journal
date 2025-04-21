import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../types/book';

const BOOKS_KEY = 'reading_journal_books';

export const saveBooks = async (books: Book[]) => {
  try {
    await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Failed to save books', error);
  }
};

export const loadBooks = async (): Promise<Book[]> => {
  try {
    const booksJson = await AsyncStorage.getItem(BOOKS_KEY);
    return booksJson ? JSON.parse(booksJson) : [];
  } catch (error) {
    console.error('Failed to load books', error);
    return [];
  }
};