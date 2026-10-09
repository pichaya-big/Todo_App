import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getColors } from '../styles/colors';
import { fontFamily, fontSize } from '../styles/fonts';

interface TodoSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDark: boolean;
}

export const TodoSearch: React.FC<TodoSearchProps> = ({
  searchQuery,
  onSearchChange,
  isDark,
}) => {
  const colors = getColors(isDark);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.searchBox, { borderColor: colors.border }]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="🔍 ค้นหา todo..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <Text style={[styles.clearBtn, { color: colors.textSecondary }]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
  },
  clearBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 8,
  },
});
