import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Switch,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { SimpleDatePicker } from './SimpleDatePicker';
import { getColors } from '../styles/colors';

interface TodoInputProps {
  onAdd: (
    title: string,
    category: string,
    priority: 'low' | 'medium' | 'high',
    description?: string,
    dueDate?: string
  ) => void;
  isDark: boolean;
}

interface TodoInputHandle {
  openModal: () => void;
  closeModal: () => void;
}

const CATEGORIES = ['work', 'personal', 'shopping', 'health'];
const PRIORITIES = ['low', 'medium', 'high'] as const;

const CATEGORY_ICONS: Record<string, string> = {
  work: '💼',
  personal: '🏠',
  shopping: '🛒',
  health: '🏥',
};

export const TodoInput = forwardRef<TodoInputHandle, TodoInputProps>(
  ({ onAdd, isDark }, ref) => {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow' | null>('today');
  const [customDate, setCustomDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const colors = getColors(isDark);

  useImperativeHandle(ref, () => ({
    openModal: () => setShowModal(true),
    closeModal: () => setShowModal(false),
  }));

  const getDateString = (dateType: 'today' | 'tomorrow' | null) => {
    if (customDate) {
      return customDate.toISOString();
    }
    if (!dateType) return undefined;
    const date = new Date();
    if (dateType === 'tomorrow') {
      date.setDate(date.getDate() + 1);
    }
    return date.toISOString();
  };

  const handleDatePicked = (date: Date) => {
    setCustomDate(date);
    setSelectedDate(null);
    setShowDatePicker(false);
  };

  const getDateDisplay = () => {
    if (customDate) {
      return customDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return t('pick_date');
  };

  const handleAdd = () => {
    if (title.trim()) {
      const dueDate = getDateString(selectedDate);
      onAdd(title.trim(), category, priority, description.trim(), dueDate);
      setTitle('');
      setDescription('');
      setCategory('work');
      setPriority('medium');
      setSelectedDate('today');
      setShowModal(false);
    }
  };

  return (
    <>
      {/* Modal for Full Add Task */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)' }]}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={[styles.modalHeaderText, { color: colors.text }]}>✕</Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {t('add_new_task') || 'New Task'}
              </Text>
              <TouchableOpacity onPress={handleAdd}>
                <Text style={[styles.modalHeaderAction, { color: colors.primary }]}>
                  {t('add_button') || 'Add'}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Title Input */}
              <TextInput
                style={[
                  styles.titleInput,
                  {
                    color: colors.text,
                    borderColor: colors.border,
                    backgroundColor: colors.surfaceContainer,
                  },
                ]}
                placeholder={t('task_title')}
                placeholderTextColor={colors.textTertiary}
                value={title}
                onChangeText={setTitle}
                multiline
              />

              {/* Description Input */}
              <TextInput
                style={[
                  styles.descriptionInput,
                  {
                    color: colors.text,
                    borderColor: colors.border,
                    backgroundColor: colors.surfaceContainer,
                  },
                ]}
                placeholder={t('task_details')}
                placeholderTextColor={colors.textTertiary}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />

              {/* Date Selection */}
              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>
                  {t('date_label')}
                </Text>
                <View style={styles.dateContainer}>
                  <TouchableOpacity
                    style={[
                      styles.datePill,
                      {
                        backgroundColor:
                          selectedDate === 'today' ? colors.primary : colors.surfaceContainer,
                      },
                    ]}
                    onPress={() => setSelectedDate('today')}
                  >
                    <Text
                      style={[
                        styles.datePillText,
                        {
                          color:
                            selectedDate === 'today'
                              ? '#ffffff'
                              : colors.text,
                        },
                      ]}
                    >
                      📅 Today
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.datePill,
                      {
                        backgroundColor:
                          selectedDate === 'tomorrow' ? colors.primary : colors.surfaceContainer,
                      },
                    ]}
                    onPress={() => setSelectedDate('tomorrow')}
                  >
                    <Text
                      style={[
                        styles.datePillText,
                        {
                          color:
                            selectedDate === 'tomorrow'
                              ? '#ffffff'
                              : colors.text,
                        },
                      ]}
                    >
                      📅 Tomorrow
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.datePill,
                      {
                        backgroundColor: customDate ? colors.primary : colors.surfaceContainer,
                      },
                    ]}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text
                      style={[
                        styles.datePillText,
                        {
                          color: customDate ? '#ffffff' : colors.text,
                        },
                      ]}
                    >
                      📅 {getDateDisplay()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Priority Selection */}
              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>
                  {t('priority_label')}
                </Text>
                <View style={styles.priorityGrid}>
                  {PRIORITIES.map(pri => {
                    const priorityConfig = {
                      high: { label: t('high_priority'), icon: '🔴' },
                      medium: { label: t('medium_priority'), icon: '🟡' },
                      low: { label: t('low_priority'), icon: '🟢' },
                    };
                    const config = priorityConfig[pri];
                    return (
                      <TouchableOpacity
                        key={pri}
                        style={[
                          styles.priorityPill,
                          {
                            backgroundColor:
                              priority === pri
                                ? colors.primary + '20'
                                : colors.surfaceContainer,
                            borderColor: priority === pri ? colors.primary : colors.border,
                          },
                        ]}
                        onPress={() => setPriority(pri)}
                      >
                        <Text style={styles.priorityPillIcon}>
                          {config.icon}
                        </Text>
                        <Text
                          style={[
                            styles.priorityPillText,
                            { color: colors.text },
                          ]}
                        >
                          {config.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Category Selection */}
              <View style={styles.section}>
                <View style={styles.categoryHeader}>
                  <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>
                    {t('category_section')}
                  </Text>
                  <Text style={[styles.categoryWorkspace, { color: colors.primary }]}>
                    {t('workspace_default') || 'Workspace Default'}
                  </Text>
                </View>
                <View style={styles.categoryGrid}>
                  {CATEGORIES.map(cat => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.categoryPill,
                        {
                          backgroundColor:
                            category === cat
                              ? colors.primary + '20'
                              : colors.surfaceContainer,
                          borderColor: category === cat ? colors.primary : colors.border,
                        },
                      ]}
                      onPress={() => setCategory(cat)}
                    >
                      <Text style={styles.categoryIcon}>
                        {CATEGORY_ICONS[cat]}
                      </Text>
                      <Text
                        style={[
                          styles.categoryPillText,
                          { color: colors.text },
                        ]}
                      >
                        {cat}
                      </Text>
                      {category === cat && (
                        <Text style={[styles.categoryCheck, { color: colors.primary }]}>
                          ✓
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Reminder */}
              <View
                style={[
                  styles.reminderSection,
                  { backgroundColor: colors.surfaceContainer },
                ]}
              >
                <View style={styles.reminderLeft}>
                  <Text style={styles.reminderIcon}>🔔</Text>
                  <View>
                    <Text style={[styles.reminderTitle, { color: colors.text }]}>
                      {t('reminder_enabled')}
                    </Text>
                    <Text style={[styles.reminderSubtitle, { color: colors.textTertiary }]}>
                      15 minutes before due time
                    </Text>
                  </View>
                </View>
                <Switch
                  value={reminderEnabled}
                  onValueChange={setReminderEnabled}
                  trackColor={{ false: colors.border, true: colors.primary + '50' }}
                  thumbColor={reminderEnabled ? colors.primary : colors.border}
                />
              </View>

              {/* Cloud Sync Info */}
              <View style={styles.syncInfo}>
                <Text style={[styles.syncIcon, { color: colors.textTertiary }]}>
                  🔒
                </Text>
                <Text style={[styles.syncText, { color: colors.textTertiary }]}>
                  {t('cloud_sync')}
                </Text>
                <Text style={[styles.cloudStatus, { color: colors.primary }]}>
                  {t('cloud_active')}
                </Text>
              </View>
            </ScrollView>
          </View>

          <SimpleDatePicker
            visible={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            onSelectDate={handleDatePicked}
            isDark={isDark}
          />
        </View>
      </Modal>
    </>
  );
  }
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalHeaderAction: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 12,
    minHeight: 48,
  },
  descriptionInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 24,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  datePill: {
    flex: 1,
    minWidth: 90,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
  },
  datePillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  priorityGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityPill: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  priorityPillIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  priorityPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryWorkspace: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {
    width: '30%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  categoryCheck: {
    fontSize: 14,
    fontWeight: '700',
  },
  reminderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  reminderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reminderIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  reminderTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  reminderSubtitle: {
    fontSize: 13,
  },
  syncInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  syncIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  syncText: {
    fontSize: 13,
    flex: 1,
  },
  cloudStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
});
