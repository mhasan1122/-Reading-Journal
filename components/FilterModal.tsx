import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SortOption } from '../types/book';
import { BookStatus } from 'types/book';
import { MaterialIcons } from '@expo/vector-icons';
import { GENRES } from 'constants/genres';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterGenre: string;
  setFilterGenre: (genre: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  filterStatus,
  setFilterStatus,
  filterGenre,
  setFilterGenre,
  sortOption,
  setSortOption,
  sortOrder,
  setSortOrder,
}) => {
  const statusOptions: (BookStatus | 'All')[] = [
    'All',
    'To Read',
    'Reading',
    'Finished',
  ];
  const sortOptions = ['title', 'rating', 'createdAt'];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters & Sort</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {/* Status */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              <View style={styles.optionWrap}>
                {statusOptions.map(status => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => setFilterStatus(status)}
                    style={[
                      styles.option,
                      filterStatus === status && styles.optionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        filterStatus === status && styles.optionTextSelected,
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Genre */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Genre</Text>
              <View style={styles.optionWrap}>
                <TouchableOpacity
                  onPress={() => setFilterGenre('All')}
                  style={[
                    styles.option,
                    filterGenre === 'All' && styles.optionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      filterGenre === 'All' && styles.optionTextSelected,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {GENRES.map(genre => (
                  <TouchableOpacity
                    key={genre}
                    onPress={() => setFilterGenre(genre)}
                    style={[
                      styles.option,
                      filterGenre === genre && styles.optionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        filterGenre === genre && styles.optionTextSelected,
                      ]}
                    >
                      {genre}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sort Options */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.optionWrap}>
                {sortOptions.map(option => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setSortOption(option as SortOption)}
                    style={[
                      styles.option,
                      sortOption === option && styles.optionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        sortOption === option && styles.optionTextSelected,
                      ]}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Sort Order */}
              <View style={styles.sortOrderContainer}>
                <TouchableOpacity
                  onPress={() => setSortOrder('asc')}
                  style={[
                    styles.sortOrderButton,
                    styles.sortOrderLeft,
                    sortOrder === 'asc' && styles.optionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      styles.textCenter,
                      sortOrder === 'asc' && styles.optionTextSelected,
                    ]}
                  >
                    Ascending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSortOrder('desc')}
                  style={[
                    styles.sortOrderButton,
                    styles.sortOrderRight,
                    sortOrder === 'desc' && styles.optionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      styles.textCenter,
                      sortOrder === 'desc' && styles.optionTextSelected,
                    ]}
                  >
                    Descending
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937', // text-gray-800
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151', // text-gray-700
    marginBottom: 8,
  },
  optionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#E5E7EB', // gray-200
    marginRight: 8,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: '#3B82F6', // blue-500
  },
  optionText: {
    color: '#374151', // text-gray-700
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  sortOrderContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  sortOrderButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#E5E7EB',
  },
  sortOrderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 2,
  },
  sortOrderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 2,
  },
  textCenter: {
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
