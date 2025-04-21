import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book, BookStatus, SortOption, SortOrder } from '../types/book';
import { GENRES } from '../constants/genres';

const BOOKS_KEY = 'reading_journal_books';

interface BooksContextType {
  books: Book[];
  allBooks: Book[];
  loading: boolean;
  addBook: (book: Omit<Book, 'id' | 'createdAt'>) => Promise<Book>;
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  filterStatus: BookStatus | 'All';
  setFilterStatus: (status: BookStatus | 'All') => void;
  filterGenre: string;
  setFilterGenre: (genre: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

interface BooksProviderProps {
  children: ReactNode;
}

export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<BookStatus | 'All'>('All');
  const [filterGenre, setFilterGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Load books from storage
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem(BOOKS_KEY);
        if (storedBooks) {
          setBooks(JSON.parse(storedBooks));
        }
      } catch (error) {
        console.error('Failed to load books', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  // Save to storage helper
  const saveBooksToStorage = async (updatedBooks: Book[]) => {
    try {
      await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(updatedBooks));
    } catch (error) {
      console.error('Failed to save books', error);
    }
  };

  const addBook = async (
    book: Omit<Book, 'id' | 'createdAt'>
  ): Promise<Book> => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...(book.status === 'Finished' && { finishedAt: new Date().toISOString() }),
    };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    await saveBooksToStorage(updatedBooks);
    return newBook;
  };

  const updateBook = async (
    id: string,
    updates: Partial<Book>
  ): Promise<void> => {
    const updatedBooks = books.map((book) =>
      book.id === id
        ? {
            ...book,
            ...updates,
            ...(updates.status === 'Finished' && !book.finishedAt
              ? { finishedAt: new Date().toISOString() }
              : {}),
          }
        : book
    );
    setBooks(updatedBooks);
    await saveBooksToStorage(updatedBooks);
  };

  const deleteBook = async (id: string): Promise<void> => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    await saveBooksToStorage(updatedBooks);
  };

  const filteredBooks = useCallback(() => {
    let result = [...books];

    if (filterStatus !== 'All') {
      result = result.filter((book) => book.status === filterStatus);
    }

    if (filterGenre !== 'All') {
      result = result.filter((book) => book.genre === filterGenre);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortOption === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortOption === 'rating') {
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      } else {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
    });

    return result;
  }, [books, filterStatus, filterGenre, searchQuery, sortOption, sortOrder]);

  const value: BooksContextType = {
    books: filteredBooks(),
    allBooks: books,
    loading,
    addBook,
    updateBook,
    deleteBook,
    filterStatus,
    setFilterStatus,
    filterGenre,
    setFilterGenre,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    sortOrder,
    setSortOrder,
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = (): BooksContextType => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};
