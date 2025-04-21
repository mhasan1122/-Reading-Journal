// RatingInput.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface RatingInputProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  editable?: boolean;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  value,
  onChange,
  size = 24,
  editable = true,
}) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity 
          key={star} 
          onPress={() => editable && onChange?.(star)}
          disabled={!editable}
        >
          <MaterialIcons
            name={value >= star ? 'star' : 'star-border'}
            size={size}
            color={value >= star ? '#FFD700' : '#A9A9A9'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};