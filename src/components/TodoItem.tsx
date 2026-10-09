import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Todo } from '../types/Todo';
import { getColors } from '../styles/colors';
import { borderRadius, spacing } from '../styles/fonts';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDark: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  isDark,
}) => {
  const colors = getColors(isDark);

  const priorityConfig = {
    high: { bg: colors.priorityHigh.background, text: colors.priorityHigh.text, label: 'High' },
    medium: { bg: colors.priorityMedium.background, text: colors.priorityMedium.text, label: 'Med' },
    low: { bg: colors.priorityLow.background, text: colors.priorityLow.text, label: 'Low' },
  };

  const getPriority = priorityConfig[todo.priority];

  const formatTime = (dateString?: string) => {
    if (!dateString) return '📅 No time';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: todo.completed ? colors.border : colors.border,
          opacity: todo.completed ? 0.6 : 1,
        },
      ]}
      activeOpacity={0.7}
    >
      {/* Checkbox */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onToggle(todo.id)}
      >
        <View
          style={[
            styles.checkbox,
            todo.completed && { backgroundColor: colors.primary, borderColor: colors.primary },
            !todo.completed && { borderColor: colors.border },
          ]}
        >
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: colors.text },
            todo.completed && styles.titleCompleted,
          ]}
          numberOfLines={1}
        >
          {todo.title}
        </Text>
        {todo.description && (
          <Text
            style={[
              styles.description,
              { color: colors.textTertiary },
              todo.completed && styles.descriptionCompleted,
            ]}
            numberOfLines={2}
          >
            {todo.description}
          </Text>
        )}
        <View style={styles.metadata}>
          <Text style={[styles.time, { color: colors.textTertiary }]}>
            ⏰ {formatTime(todo.dueDate)}
          </Text>
          <View
            style={[
              styles.categoryBadge,
              {
                backgroundColor: colors.category[todo.category as keyof typeof colors.category]
                  ? `${colors.category[todo.category as keyof typeof colors.category]}20`
                  : colors.surfaceContainer,
              },
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color: colors.category[todo.category as keyof typeof colors.category]
                    ? colors.category[todo.category as keyof typeof colors.category]
                    : colors.text,
                },
              ]}
            >
              {todo.category}
            </Text>
          </View>
        </View>
      </View>

      {/* Priority Badge */}
      <View
        style={[
          styles.priorityBadge,
          { backgroundColor: getPriority.bg },
        ]}
      >
        <Text style={[styles.priorityText, { color: getPriority.text }]}>
          {getPriority.label}
        </Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 16,
  },
  checkboxContainer: {
    padding: 4,
    marginRight: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 6,
    lineHeight: 18,
  },
  descriptionCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  time: {
    fontSize: 12,
    fontWeight: '500',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  deleteBtn: {
    padding: 4,
  },
  deleteText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e11d48',
  },
});
