import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTodos } from '../hooks/useTodos';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import { getColors } from '../styles/colors';

export const StatisticsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { allTodos, isLoading } = useTodos();
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

  // Calculate statistics
  const totalTasks = allTodos.length;
  const completedTasks = allTodos.filter(t => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const overdueTasks = allTodos.filter(t => t.isOverdue && !t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // By Category
  const tasksByCategory = {
    work: allTodos.filter(t => t.category === 'work').length,
    personal: allTodos.filter(t => t.category === 'personal').length,
    shopping: allTodos.filter(t => t.category === 'shopping').length,
    health: allTodos.filter(t => t.category === 'health').length,
  };

  // By Priority
  const tasksByPriority = {
    high: allTodos.filter(t => t.priority === 'high').length,
    medium: allTodos.filter(t => t.priority === 'medium').length,
    low: allTodos.filter(t => t.priority === 'low').length,
  };

  // By Priority (Completed)
  const completedByPriority = {
    high: allTodos.filter(t => t.priority === 'high' && t.completed).length,
    medium: allTodos.filter(t => t.priority === 'medium' && t.completed).length,
    low: allTodos.filter(t => t.priority === 'low' && t.completed).length,
  };

  const StatCard = ({
    title,
    value,
    subtitle,
    color,
    icon,
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    icon: string;
  }) => (
    <View style={[styles.statCard, { backgroundColor: colors.surfaceContainer }]}>
      <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.statContent}>
        <Text style={[styles.statTitle, { color: colors.textTertiary }]}>{title}</Text>
        <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
        {subtitle && (
          <Text style={[styles.statSubtitle, { color: colors.textTertiary }]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );

  const CategoryRow = ({
    name,
    count,
    icon,
  }: {
    name: string;
    count: number;
    icon: string;
  }) => {
    const percentage = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;
    return (
      <View style={[styles.categoryRow, { borderBottomColor: colors.border }]}>
        <View style={styles.categoryLeft}>
          <Text style={styles.categoryIcon}>{icon}</Text>
          <View>
            <Text style={[styles.categoryName, { color: colors.text }]}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Text>
            <Text style={[styles.categoryCount, { color: colors.textTertiary }]}>
              {count} tasks
            </Text>
          </View>
        </View>
        <View style={styles.categoryRight}>
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
                  width: `${percentage}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
          <Text style={[styles.percentage, { color: colors.textTertiary }]}>
            {percentage}%
          </Text>
        </View>
      </View>
    );
  };

  const PriorityBar = ({
    priority,
    total,
    completed,
    color,
    icon,
  }: {
    priority: string;
    total: number;
    completed: number;
    color: string;
    icon: string;
  }) => {
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return (
      <View style={styles.priorityItem}>
        <View style={styles.priorityHeader}>
          <Text style={styles.priorityIcon}>{icon}</Text>
          <Text style={[styles.priorityLabel, { color: colors.text }]}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Text>
          <Text style={[styles.priorityCount, { color: colors.textTertiary }]}>
            {completed}/{total}
          </Text>
        </View>
        <View
          style={[
            styles.priorityBar,
            { backgroundColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.priorityFill,
              {
                width: `${completionPercentage}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
        <Text style={[styles.priorityPercentage, { color: colors.textTertiary }]}>
          {completionPercentage}% completed
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>📊 {t('statistics_header')}</Text>
        <Text style={[styles.subtitle, { color: colors.textTertiary }]}>
          {t('productivity_overview')}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Overall Stats */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('overall')}</Text>
          <View style={styles.statsGrid}>
            <StatCard
              icon="📝"
              title={t('total_tasks')}
              value={totalTasks}
              color={colors.primary}
            />
            <StatCard
              icon="✅"
              title={t('completed')}
              value={completedTasks}
              subtitle={`${completionRate}%`}
              color={colors.success}
            />
            <StatCard
              icon="⏳"
              title={t('active')}
              value={activeTasks}
              color={colors.warning}
            />
            <StatCard
              icon="⚠️"
              title={t('overdue')}
              value={overdueTasks}
              color={colors.error}
            />
          </View>
        </View>

        {/* Completion Rate */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('completion_rate')}</Text>
          <View
            style={[
              styles.completionCard,
              { backgroundColor: colors.surfaceContainer },
            ]}
          >
            <View style={styles.completionCircle}>
              <Text style={styles.completionPercent}>{completionRate}%</Text>
            </View>
            <View style={styles.completionStats}>
              <View style={styles.completionRow}>
                <Text style={[styles.completionLabel, { color: colors.text }]}>
                  {t('completed')}
                </Text>
                <Text style={[styles.completionValue, { color: colors.success }]}>
                  {completedTasks}
                </Text>
              </View>
              <View style={styles.completionRow}>
                <Text style={[styles.completionLabel, { color: colors.text }]}>
                  {t('active')}
                </Text>
                <Text style={[styles.completionValue, { color: colors.warning }]}>
                  {activeTasks}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* By Category */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('by_category')}</Text>
          <View style={[styles.card, { backgroundColor: colors.surfaceContainer }]}>
            <CategoryRow name="work" count={tasksByCategory.work} icon="💼" />
            <CategoryRow name="personal" count={tasksByCategory.personal} icon="🏠" />
            <CategoryRow name="shopping" count={tasksByCategory.shopping} icon="🛒" />
            <CategoryRow name="health" count={tasksByCategory.health} icon="🏥" />
          </View>
        </View>

        {/* By Priority */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('by_priority')}</Text>
          <View style={[styles.card, { backgroundColor: colors.surfaceContainer, padding: 16 }]}>
            <PriorityBar
              priority="High"
              total={tasksByPriority.high}
              completed={completedByPriority.high}
              color={colors.error}
              icon="🔴"
            />
            <View style={styles.prioritySpacer} />
            <PriorityBar
              priority="Medium"
              total={tasksByPriority.medium}
              completed={completedByPriority.medium}
              color={colors.warning}
              icon="🟡"
            />
            <View style={styles.prioritySpacer} />
            <PriorityBar
              priority="Low"
              total={tasksByPriority.low}
              completed={completedByPriority.low}
              color={colors.success}
              icon="🟢"
            />
          </View>
        </View>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 11,
    fontWeight: '500',
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  categoryRight: {
    width: 100,
    alignItems: 'flex-end',
    gap: 4,
  },
  progressBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  completionCard: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  completionCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionPercent: {
    fontSize: 40,
    fontWeight: '700',
  },
  completionStats: {
    flex: 1,
  },
  completionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  completionLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  completionValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  priorityItem: {
    marginBottom: 12,
  },
  priorityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  priorityIcon: {
    fontSize: 16,
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  priorityCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  priorityBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  priorityFill: {
    height: '100%',
    borderRadius: 4,
  },
  priorityPercentage: {
    fontSize: 11,
    fontWeight: '500',
  },
  prioritySpacer: {
    height: 12,
  },
});
