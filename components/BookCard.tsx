import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

const statusBackgroundColors: Record<string, string> = {
  'To Read': '#BFDBFE',    // bg-blue-200
  Reading: '#FDE68A',       // bg-yellow-200
  Finished: '#BBF7D0',      // bg-green-200
};

export const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  const statusColor = statusBackgroundColors[book.status] || '#E5E7EB';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: statusColor }]}
    >
      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <View style={styles.genreAndRating}>
            <Text style={styles.genre}>{book.genre}</Text>
            <View style={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <MaterialIcons
                  key={i}
                  name={i < book.rating ? 'star' : 'star-border'}
                  size={16}
                  color={i < book.rating ? '#FFD700' : '#A9A9A9'}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{book.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  flex1: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937', // text-gray-800
  },
  author: {
    color: '#4B5563', // text-gray-600
  },
  genreAndRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  genre: {
    fontSize: 12,
    color: '#6B7280', // text-gray-500
    marginRight: 8,
  },
  rating: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151', // text-gray-700
  },
});
