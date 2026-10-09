import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { getColors } from '../styles/colors';
import { fontFamily, fontSize } from '../styles/fonts';

interface TodoActionsProps {
  completedCount: number;
  onClearCompleted: () => void;
  isDark: boolean;
}

export const TodoActions: React.FC<TodoActionsProps> = ({
  completedCount,
  onClearCompleted,
  isDark,
}) => {
  const colors = getColors(isDark);

  if (completedCount === 0) return null;

  const handleClearCompleted = () => {
    Alert.alert(
      'ล้างงานที่เสร็จแล้ว?',
      `จะลบ ${completedCount} งานที่เสร็จแล้วไหม?`,
      [
        { text: 'ยกเลิก', onPress: () => {} },
        {
          text: 'ลบ',
          onPress: onClearCompleted,
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.danger }]}
        onPress={handleClearCompleted}
      >
        <Text style={styles.buttonText}>
          🗑️ ลบงานที่เสร็จแล้ว ({completedCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: fontSize.base,
    fontFamily: fontFamily.semibold,
  },
});
