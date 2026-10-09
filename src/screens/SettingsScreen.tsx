import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import { useTodos } from '../hooks/useTodos';
import { getColors } from '../styles/colors';
import { storageService } from '../storage/asyncStorage';

export const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { isDark, toggleTheme: originalToggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { allTodos } = useTodos();
  const colors = getColors(isDark);

  const handleThemeToggle = async () => {
    await originalToggleTheme();
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure? This will delete all tasks permanently.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: async () => {
            await storageService.clearTodos();
            Alert.alert('Success', 'All data has been cleared');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightContent,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightContent?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress && !rightContent}
      activeOpacity={onPress ? 0.6 : 1}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: colors.textTertiary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightContent && <View style={styles.settingRight}>{rightContent}</View>}
      {onPress && !rightContent && (
        <Text style={[styles.settingArrow, { color: colors.textTertiary }]}>
          →
        </Text>
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
        {title}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>⚙️ {t('settings_header')}</Text>
        <Text style={[styles.subtitle, { color: colors.textTertiary }]}>
          {t('customize_experience')}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Display Section */}
        <SectionHeader title={t('display')} />
        <View style={[styles.settingsCard, { backgroundColor: colors.surfaceContainer }]}>
          <SettingItem
            icon="🌙"
            title={t('dark_mode')}
            subtitle={isDark ? t('on') : t('off')}
            rightContent={
              <Switch
                value={isDark}
                onValueChange={handleThemeToggle}
                trackColor={{ false: colors.border, true: colors.primary + '50' }}
                thumbColor={isDark ? colors.primary : colors.border}
              />
            }
          />
        </View>

        {/* Language Section */}
        <SectionHeader title="LANGUAGE" />
        <View style={[styles.settingsCard, { backgroundColor: colors.surfaceContainer }]}>
          <TouchableOpacity
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => setLanguage(language === 'en' ? 'th' : 'en')}
            activeOpacity={0.6}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🌐</Text>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  {t('language')}
                </Text>
                <Text style={[styles.settingSubtitle, { color: colors.textTertiary }]}>
                  {language === 'en' ? 'English' : 'ไทย'}
                </Text>
              </View>
            </View>
            <Text style={[styles.settingArrow, { color: colors.textTertiary }]}>
              →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <SectionHeader title={t('notifications')} />
        <View style={[styles.settingsCard, { backgroundColor: colors.surfaceContainer }]}>
          <SettingItem
            icon="🔔"
            title="Task Reminders"
            subtitle="Get notified about upcoming tasks"
            rightContent={
              <Switch
                value={false}
                onValueChange={() => {}}
                trackColor={{ false: colors.border, true: colors.primary + '50' }}
                thumbColor={colors.border}
                disabled
              />
            }
          />
          <SettingItem
            icon="⏰"
            title="Daily Summary"
            subtitle="Receive daily task summary"
            rightContent={
              <Switch
                value={false}
                onValueChange={() => {}}
                trackColor={{ false: colors.border, true: colors.primary + '50' }}
                thumbColor={colors.border}
                disabled
              />
            }
          />
        </View>

        {/* Data Section */}
        <SectionHeader title={t('data')} />
        <View style={[styles.settingsCard, { backgroundColor: colors.surfaceContainer }]}>
          <SettingItem
            icon="📊"
            title={t('storage_info')}
            subtitle={`${allTodos.length} ${t('tasks_stored')}`}
          />
          <SettingItem
            icon="🗑️"
            title={t('clear_all_data')}
            subtitle={t('delete_tasks_permanently')}
            onPress={handleClearData}
          />
        </View>

        {/* About Section */}
        <SectionHeader title={t('about')} />
        <View style={[styles.settingsCard, { backgroundColor: colors.surfaceContainer }]}>
          <SettingItem
            icon="📱"
            title="App Version"
            subtitle="1.0.0"
          />
          <SettingItem
            icon="❓"
            title="Help & Support"
            subtitle="Get help with using TaskFlow"
            onPress={() => {
              Alert.alert(
                'Help & Support',
                'For help and support, please contact support@taskflow.app'
              );
            }}
          />
          <SettingItem
            icon="📄"
            title="Terms & Privacy"
            subtitle="Review our policies"
            onPress={() => {
              Alert.alert(
                'Terms & Privacy',
                'Privacy Policy and Terms of Service coming soon.'
              );
            }}
          />
        </View>

        {/* Quick Stats */}
        <SectionHeader title={t('quick_stats')} />
        <View style={[styles.statsContainer, { backgroundColor: colors.surfaceContainer }]}>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
              Total Tasks
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {allTodos.length}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
              Completed
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {allTodos.filter(t => t.completed).length}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>⏳</Text>
            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
              Active
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {allTodos.filter(t => !t.completed).length}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textTertiary }]}>
            TaskFlow v1.0.0
          </Text>
          <Text style={[styles.footerText, { color: colors.textTertiary }]}>
            Built with ❤️
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingBottom: 32,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  settingsCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    fontWeight: '400',
  },
  settingRight: {
    marginLeft: 12,
  },
  settingArrow: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    fontSize: 28,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
