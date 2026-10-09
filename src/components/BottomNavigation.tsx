import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getColors } from '../styles/colors';

export type BottomNavTab = 'today' | 'upcoming' | 'projects' | 'settings';

interface BottomNavigationProps {
  activeTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
  onCenterPress?: () => void;
  isDark: boolean;
}

const TABS: Array<{ id: BottomNavTab; icon: keyof typeof MaterialCommunityIcons.glyphMap; isCenter?: boolean }> = [
  { id: 'today', icon: 'home-outline' },
  { id: 'upcoming', icon: 'calendar-outline' },
  { id: 'today', icon: 'plus', isCenter: true },
  { id: 'projects', icon: 'folder-outline' },
  { id: 'settings', icon: 'cog-outline' },
] as const;

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  onCenterPress,
  isDark,
}) => {
  const colors = getColors(isDark);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View
        style={[
          styles.navBar,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        {TABS.map((tab, index) => {
          const isCenter = tab.isCenter;
          const isActive = activeTab === tab.id && !isCenter;

          return isCenter ? (
            <TouchableOpacity
              key={`center-${index}`}
              style={[styles.navItem, styles.centerButton]}
              onPress={onCenterPress}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={tab.icon}
                size={28}
                color={colors.primary}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={tab.id}
              style={styles.navItem}
              onPress={() => onTabChange(tab.id)}
              activeOpacity={0.6}
            >
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={24}
                  color={isActive ? colors.primary : colors.textSecondary}
                />
                {isActive && (
                  <View
                    style={[
                      styles.activeIndicator,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
    position: 'relative',
  },
  centerButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 28,
    height: 3,
    borderRadius: 1.5,
  },
});
