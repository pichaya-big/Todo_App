import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DatePicker } from '../components/DatePicker';
import { TodoItem } from '../components/TodoItem';
import { useTodos } from '../hooks/useTodos';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import { getColors } from '../styles/colors';

export const UpcomingScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { allTodos, isLoading, toggleTodo, deleteTodo } = useTodos();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const colors = getColors(isDark);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Filter todos for selected date
  const isSelectedDate = (dueDate?: string) => {
    if (!dueDate) return false;
    const date = new Date(dueDate);
    return date.toDateString() === selectedDate.toDateString();
  };

  const selectedDateTodos = allTodos
    .filter(todo => isSelectedDate(todo.dueDate) && !todo.completed)
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const markedDates = Array.from(
    new Set(
      allTodos
        .filter(todo => todo.dueDate && !todo.completed)
        .map(todo => new Date(todo.dueDate as string).toDateString())
    )
  );

  const selectedDateFormatted = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>📅 {t('upcoming_header')}</Text>
        <Text style={[styles.subtitle, { color: colors.textTertiary }]}>
          {t('click_date')}
        </Text>
      </View>

      {/* Date Picker Calendar */}
      <DatePicker
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        markedDates={markedDates}
        isDark={isDark}
      />

      {/* Selected Date Header */}
      <View style={[styles.selectedDateHeader, { backgroundColor: colors.surfaceContainer }]}>
        <Text style={[styles.selectedDateText, { color: colors.text }]}>
          {selectedDateFormatted}
        </Text>
        <Text style={[styles.taskCountText, { color: colors.textTertiary }]}>
          {selectedDateTodos.length} {selectedDateTodos.length === 1 ? 'task' : 'tasks'}
        </Text>
      </View>

      {/* Task List */}
      <ScrollView
        style={[styles.listContainer, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.listContent}
      >
        {selectedDateTodos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No Tasks
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>
              No tasks scheduled for this date
            </Text>
          </View>
        ) : (
          selectedDateTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              isDark={isDark}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedDateHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  taskCountText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
});
