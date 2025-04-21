import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useBooks } from '../hooks/useBooks';
import { BookCard } from '../components/BookCard';
import { SearchBar } from '../components/SearchBar';
import { FilterModal } from '../components/FilterModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    books,
    loading,
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
  } = useBooks();
  const [showFilters, setShowFilters] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Reading Journal</Text>
        <TouchableOpacity onPress={() => setShowFilters(true)}>
          <MaterialIcons name="filter-list" size={28} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <MaterialIcons name="menu-book" size={60} color="#D1D5DB" />
            <Text style={styles.emptyText}>No books found</Text>
            <Text style={styles.emptySubtext}>Add your first book to get started</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddEditBook', { bookId: undefined })}
        style={styles.fab}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus as (status: string) => void}
        filterGenre={filterGenre}
        setFilterGenre={setFilterGenre}
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder as (order: string) => void}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#114B5F', 
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280', // text-gray-500
    marginTop: 16,
  },
  emptySubtext: {
    color: '#9CA3AF', // text-gray-400
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#3B82F6',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
