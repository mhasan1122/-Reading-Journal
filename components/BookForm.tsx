import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { RatingInput } from './RatingInput';
import { GENRES } from '../constants/genres';
import { Book, BookStatus } from '../types/book';

interface BookFormProps {
  initialData?: Partial<Book>;
  onSubmit: (book: Omit<Book, 'id' | 'createdAt'>) => void;
  onDelete?: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({
  initialData,
  onSubmit,
  onDelete,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [genre, setGenre] = useState(initialData?.genre || '');
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [status, setStatus] = useState<BookStatus>(
    initialData?.status || 'To Read'
  );
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !author.trim() || !genre) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    onSubmit({
      title,
      author,
      genre,
      rating,
      notes,
      status,
      coverImage,
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, padding: 8 }}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Title */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 8 }}>
          Title *
        </Text>
        <TextInput
          style={{
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            padding: 12,
            color: '#333',
          }}
          value={title}
          onChangeText={setTitle}
          placeholder="Book title"
        />
      </View>

      {/* Author */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 8 }}>
          Author *
        </Text>
        <TextInput
          style={{
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            padding: 12,
            color: '#333',
          }}
          value={author}
          onChangeText={setAuthor}
          placeholder="Author name"
        />
      </View>

      {/* Genre */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 8 }}>
          Genre *
        </Text>
        <TouchableOpacity
          onPress={() => setShowGenreDropdown(!showGenreDropdown)}
          style={{
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            padding: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#333' }}>{genre || 'Select genre'}</Text>
          <MaterialIcons
            name={showGenreDropdown ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#6B7280"
          />
        </TouchableOpacity>
        {showGenreDropdown && (
          <View
            style={{
              marginTop: 8,
              backgroundColor: '#fff',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <ScrollView>
              {GENRES.map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => {
                    setGenre(g);
                    setShowGenreDropdown(false);
                  }}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e5e7eb',
                  }}
                >
                  <Text style={{ color: '#333' }}>{g}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Status */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 8 }}>
          Status *
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {(['To Read', 'Reading', 'Finished'] as BookStatus[]).map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setStatus(s)}
              style={{
                flex: 1,
                marginHorizontal: 8,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: status === s ? '#3b82f6' : '#e5e7eb',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: status === s ? '#fff' : '#333',
                }}
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Rating */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 8 }}>
          Rating
        </Text>
        <RatingInput value={rating} onChange={setRating} size={28} />
      </View>

      {/* Notes */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 8 }}>
          Notes
        </Text>
        <TextInput
          style={{
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            padding: 12,
            color: '#333',
            height: 128,
          }}
          value={notes}
          onChangeText={setNotes}
          placeholder="Your thoughts about the book..."
          multiline
        />
      </View>

      {/* Cover Image */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 8 }}>
          Cover Image
        </Text>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
          }}
        >
          <MaterialIcons
            name={coverImage ? 'image' : 'add-photo-alternate'}
            size={40}
            color="#6B7280"
          />
          <Text style={{ color: '#4B5563', marginTop: 8 }}>
            {coverImage ? 'Change cover image' : 'Add cover image'}
          </Text>
        </TouchableOpacity>
        {coverImage && (
          <View style={{ marginTop: 8, alignItems: 'center' }}>
            <Image
              source={{ uri: coverImage }}
              style={{ width: 128, height: 192, borderRadius: 8 }}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => setCoverImage('')}
              style={{
                marginTop: 8,
                backgroundColor: '#ef4444',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#fff' }}>Remove Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: '#3b82f6',
            paddingVertical: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500',
            }}
          >
            {initialData ? 'Update Book' : 'Add Book'}
          </Text>
        </TouchableOpacity>

        {initialData && onDelete && (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Delete Book', 'Are you sure?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: onDelete },
              ]);
            }}
            style={{
              backgroundColor: '#ef4444',
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              Delete Book
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
