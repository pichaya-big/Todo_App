import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getColors } from '../styles/colors';
import { fontFamily, fontSize } from '../styles/fonts';

interface TodoStatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
    completionRate: number;
  };
  isDark: boolean;
}

export const TodoStats: React.FC<TodoStatsProps> = ({ stats, isDark }) => {
  const colors = getColors(isDark);

  const getProgressBarColor = (rate: number) => {
    if (rate === 100) return colors.success;
    if (rate >= 75) return '#00C7BE';
    if (rate >= 50) return colors.warning;
    return colors.danger;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.progressSection}>
        <Text style={[styles.label, { color: colors.text }]}>ความก้าวหน้า</Text>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${stats.completionRate}%`,
                backgroundColor: getProgressBarColor(stats.completionRate),
              },
            ]}
          />
        </View>
        <Text style={[styles.percentage, { color: getProgressBarColor(stats.completionRate) }]}>
          {stats.completionRate}%
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: colors.text }]}>{stats.active}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>ที่เหลือ</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: colors.success }]}>{stats.completed}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>เสร็จแล้ว</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: colors.danger }]}>{stats.overdue}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>เกินกำหนด</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: colors.text }]}>{stats.total}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>ทั้งหมด</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  progressSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
  },
});
