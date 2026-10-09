import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TodoFilter as TodoFilterType } from '../types/Todo';
import { getColors } from '../styles/colors';
import { fontFamily, fontSize } from '../styles/fonts';

interface TodoFilterProps {
  active: TodoFilterType;
  onFilterChange: (filter: TodoFilterType) => void;
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
  isDark: boolean;
}

const FILTERS: { label: string; value: TodoFilterType }[] = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'ที่เหลือ', value: 'active' },
  { label: 'เสร็จแล้ว', value: 'completed' },
  { label: 'เกินกำหนด', value: 'overdue' },
];

export const TodoFilter: React.FC<TodoFilterProps> = ({
  active,
  onFilterChange,
  stats,
  isDark,
}) => {
  const colors = getColors(isDark);

  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <View style={[styles.statsContainer]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>{stats.total}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>ทั้งหมด</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.success }]}>
            {stats.completed}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>เสร็จแล้ว</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.warning }]}>
            {stats.active}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>ที่เหลือ</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.danger }]}>
            {stats.overdue}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>เกินกำหนด</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        {FILTERS.map(filter => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterBtn,
              {
                borderColor: colors.border,
                backgroundColor: active === filter.value ? colors.primary : 'transparent',
              },
            ]}
            onPress={() => onFilterChange(filter.value)}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: active === filter.value ? '#FFFFFF' : colors.textSecondary,
                },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingVertical: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
  },
  statLabel: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
  },
  filterText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
  },
});
