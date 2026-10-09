import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TodoItem } from '../components/TodoItem';
import { TodoInput } from '../components/TodoInput';
import { BottomNavigation, type BottomNavTab } from '../components/BottomNavigation';
import { UpcomingScreen } from './UpcomingScreen';
import { StatisticsScreen } from './StatisticsScreen';
import { SettingsScreen } from './SettingsScreen';
import { useTodos } from '../hooks/useTodos';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import { getColors } from '../styles/colors';

const CATEGORIES = ['All', 'Work', 'Personal', 'Shopping', 'Health'];

type CategoryFilter = 'all' | 'work' | 'personal' | 'shopping' | 'health';

export const TodoListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const todoInputRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<BottomNavTab>('today');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const {
    todos,
    allTodos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const colors = getColors(isDark);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Check if a date is today
  const isToday = (dateString?: string) => {
    if (!dateString) return true; // No date = today
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Filter todos to show only today's tasks
  const todayTodos = todos.filter(t => isToday(t.dueDate));

  // Apply category filter
  const categoryFilteredTodos = todayTodos.filter(t => {
    if (categoryFilter === 'all') return true;
    return t.category === categoryFilter;
  });

  const completedCount = allTodos.filter(t => t.completed).length;
  const completionPercentage = Math.round((completedCount / Math.max(allTodos.length, 1)) * 100);

  // Group todos by priority
  const todosByPriority = {
    high: categoryFilteredTodos.filter(t => t.priority === 'high'),
    medium: categoryFilteredTodos.filter(t => t.priority === 'medium'),
    low: categoryFilteredTodos.filter(t => t.priority === 'low'),
  };

  const renderPrioritySection = (priority: 'high' | 'medium' | 'low', tasks: any[]) => {
    if (tasks.length === 0) return null;

    const priorityConfig = {
      high: { icon: '🔴', label: 'High Priority', color: colors.error },
      medium: { icon: '🟡', label: 'Medium Priority', color: colors.warning },
      low: { icon: '🟢', label: 'Low Priority', color: colors.success },
    };

    const config = priorityConfig[priority];

    return (
      <View key={priority} style={styles.prioritySection}>
        <View style={styles.priorityHeader}>
          <Text style={[styles.priorityTitle, { color: config.color }]}>
            {config.icon} {config.label}
          </Text>
          <Text style={[styles.priorityCount, { color: colors.textTertiary }]}>
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </Text>
        </View>
        {tasks.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            isDark={isDark}
          />
        ))}
      </View>
    );
  };

  // Render appropriate screen
  const renderScreen = () => {
    if (activeTab === 'upcoming') {
      return <UpcomingScreen />;
    }

    if (activeTab === 'projects') {
      return <StatisticsScreen />;
    }

    if (activeTab === 'settings') {
      return <SettingsScreen />;
    }

    return (
      <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <View style={styles.headerTop}>
          <View style={[styles.logo, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoText}>✓</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>TaskFlow</Text>
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.themeBtn, { backgroundColor: colors.surfaceContainer }]}
          >
            <Text style={styles.themeBtnText}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>

        {/* Date */}
        <Text style={[styles.dateText, { color: colors.textTertiary }]}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          }).toUpperCase()}
        </Text>

        {/* Greeting */}
        <Text style={[styles.greeting, { color: colors.text }]}>
          {t('good_morning')}
        </Text>

        {/* Daily Focus Section */}
        <View style={[styles.focusCard, { backgroundColor: colors.surfaceContainer }]}>
          <View>
            <Text style={[styles.focusLabel, { color: colors.textTertiary }]}>
              {t('daily_focus')}
            </Text>
            <Text style={[styles.focusCount, { color: colors.text }]}>
              {completedCount} of {allTodos.length}
              <Text style={[styles.focusCountLabel, { color: colors.textTertiary }]}>
                {' '}{t('tasks_completed')}
              </Text>
            </Text>
          </View>
          <View style={styles.focusIcon}>
            <Text style={styles.focusIconText}>📈</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { backgroundColor: colors.border },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${completionPercentage}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.textTertiary }]}>
            {t('keep_going')} <Text style={[styles.progressPercentage, { color: colors.primary }]}>
              {completionPercentage}%
            </Text>
          </Text>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {CATEGORIES.map(category => {
            const categoryKey = category.toLowerCase() as CategoryFilter;
            const isActive = categoryFilter === categoryKey;

            return (
              <TouchableOpacity
                key={category}
                onPress={() => setCategoryFilter(categoryKey)}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isActive ? colors.primary : colors.surfaceContainer,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    {
                      color: isActive ? '#ffffff' : colors.text,
                    },
                  ]}
                >
                  {t(category.toLowerCase())} {category === 'All' && categoryFilteredTodos.length > 0 ? categoryFilteredTodos.length : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Task List */}
      <ScrollView
        style={[styles.listContainer, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.listContent}
      >
        {todayTodos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={[styles.emptyText, { color: colors.text }]}>ยังไม่มี Task วันนี้</Text>
            <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>
              เพิ่ม Task ใหม่เพื่อเริ่มต้น
            </Text>
          </View>
        ) : (
          <>
            {renderPrioritySection('high', todosByPriority.high)}
            {renderPrioritySection('medium', todosByPriority.medium)}
            {renderPrioritySection('low', todosByPriority.low)}
          </>
        )}
      </ScrollView>
    </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderScreen()}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCenterPress={() => todoInputRef.current?.openModal()}
        isDark={isDark}
      />
      <TodoInput ref={todoInputRef} onAdd={addTodo} isDark={isDark} />
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  themeBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeBtnText: {
    fontSize: 20,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  focusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  focusLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  focusCount: {
    fontSize: 16,
    fontWeight: '600',
  },
  focusCountLabel: {
    fontSize: 14,
    fontWeight: '400',
  },
  focusIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusIconText: {
    fontSize: 28,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 13,
    fontWeight: '700',
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  prioritySection: {
    marginBottom: 24,
  },
  priorityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  priorityCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '300',
  },
});
