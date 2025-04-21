import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useBooks } from '../hooks/useBooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { RatingInput } from '../components/RatingInput';

type BookDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BookDetail'
>;

interface BookDetailScreenProps {
  navigation: BookDetailScreenNavigationProp;
  route: any;
}

export const BookDetailScreen: React.FC<BookDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { bookId } = route.params;
  const { allBooks, updateBook } = useBooks();
  const book = allBooks.find(b => b.id === bookId);

  if (!book) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.notFoundText}>Book not found</Text>
      </View>
    );
  }

  const handleRatingChange = async (newRating: number) => {
    await updateBook(bookId, { rating: newRating });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bookInfoRow}>
        {book.coverImage ? (
          <Image
            source={{ uri: book.coverImage }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialIcons name="book" size={60} color="#9CA3AF" />
          </View>
        )}

        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>
          <View style={styles.genreTag}>
            <Text style={styles.genreText}>{book.genre}</Text>
          </View>
          <View style={styles.statusTag}>
            <Text style={styles.statusText}>{book.status}</Text>
          </View>
          <RatingInput value={book.rating} onChange={handleRatingChange} size={28} />
        </View>
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.sectionTitle}>My Notes</Text>
        <Text style={styles.notesText}>
          {book.notes || 'No notes added yet'}
        </Text>
      </View>

      <View style={styles.dateRow}>
        <Text style={styles.dateText}>
          Added: {new Date(book.createdAt).toLocaleDateString()}
        </Text>
        {book.status === 'Finished' && book.finishedAt && (
          <Text style={styles.dateText}>
            Finished: {new Date(book.finishedAt).toLocaleDateString()}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddEditBook', { bookId: book.id })}
        style={styles.editButton}
      >
        <Text style={styles.editButtonText}>Edit Book</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: '#6B7280', // text-gray-500
  },
  bookInfoRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  coverImage: {
    width: 128,
    height: 192,
    borderRadius: 8,
    marginRight: 16,
  },
  placeholderImage: {
    width: 128,
    height: 192,
    backgroundColor: '#E5E7EB', // gray-200
    borderRadius: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937', // text-gray-800
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#4B5563', // text-gray-600
    marginBottom: 8,
  },
  genreTag: {
    backgroundColor: '#DBEAFE', // blue-100
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  genreText: {
    color: '#1E40AF', // blue-800
    fontSize: 12,
  },
  statusTag: {
    backgroundColor: '#D1FAE5', // green-100
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  statusText: {
    color: '#065F46', // green-800
    fontSize: 12,
  },
  notesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151', // text-gray-700
    marginBottom: 8,
  },
  notesText: {
    backgroundColor: '#F3F4F6', // bg-gray-100
    color: '#1F2937', // text-gray-800
    padding: 16,
    borderRadius: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    color: '#6B7280', // text-gray-500
  },
  editButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  editButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});
