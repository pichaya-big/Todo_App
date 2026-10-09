import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { getColors } from '../styles/colors';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
  isDark: boolean;
  selectedDate?: Date;
  markedDates?: string[];
}

type ViewMode = 'month' | 'week';

export const DatePicker: React.FC<DatePickerProps> = ({
  onDateSelect,
  isDark,
  selectedDate = new Date(),
  markedDates = [],
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate));
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const colors = getColors(isDark);

  useEffect(() => {
    // Trigger smooth transition animation
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        400,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );

    // Fade out and in effect
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [viewMode, fadeAnim]);

  const viewModeRef = React.useRef<ViewMode>(viewMode);
  viewModeRef.current = viewMode;
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const shiftPeriod = (direction: 1 | -1) => {
    setCurrentDate(prev =>
      viewModeRef.current === 'week'
        ? new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + direction * 7)
        : new Date(prev.getFullYear(), prev.getMonth() + direction, 1)
    );
    slideAnim.setValue(direction * 60);
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 8,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_evt, g) =>
        Math.abs(g.dx) > 10 || Math.abs(g.dy) > 10,
      onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const { dx, dy } = gestureState;
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx < -50) {
            // Swiped left -> next
            shiftPeriod(1);
          } else if (dx > 50) {
            // Swiped right -> previous
            shiftPeriod(-1);
          }
        } else if (dy < -50) {
          setViewMode('week');
        } else if (dy > 50) {
          setViewMode('month');
        }
      },
    })
  ).current;

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days: { key: string; day: number | null }[] = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push({ key: `blank-${i}`, day: null });
  }

  // Add days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ key: `day-${i}`, day: i });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayPress = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateSelect(newDate);
  };

  const hasTasks = (date: Date) => markedDates.includes(date.toDateString());

  const getCellBackground = (selected: boolean, today: boolean) => {
    if (selected) return colors.primary;
    if (today) return colors.surfaceContainer;
    return 'transparent';
  };

  const getWeekDotColor = (marked: boolean, selected: boolean) => {
    if (!marked) return 'transparent';
    return selected ? '#ffffff' : colors.primary;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get week days for week view
  const getWeekDays = (date: Date) => {
    const curr = new Date(date);
    const first = curr.getDate() - curr.getDay();
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(curr.setDate(first + i));
      days.push(new Date(day));
    }
    return days;
  };

  const weekDaysList = getWeekDays(new Date(currentDate));

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      {/* Header with Navigation - Hide in week view */}
      {viewMode === 'month' && (
        <Animated.View style={[styles.header, { backgroundColor: colors.surface }]}>
          <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
            <Text style={[styles.navButtonText, { color: colors.primary }]}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.monthText, { color: colors.text }]}>{monthName}</Text>
            <Text style={[styles.viewModeText, { color: colors.textTertiary }]}>
              Slide up ↑
            </Text>
          </View>
          <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
            <Text style={[styles.navButtonText, { color: colors.primary }]}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Weekday Headers - Show only in month view */}
      {viewMode === 'month' && (
        <Animated.View style={styles.weekdayRow}>
          {weekDays.map(day => (
            <Text
              key={day}
              style={[styles.weekdayText, { color: colors.textTertiary }]}
            >
              {day}
            </Text>
          ))}
        </Animated.View>
      )}

      {/* Month View */}
      {viewMode === 'month' && (
        <Animated.View style={styles.calendarGrid}>
          {days.map(({ key, day }) => (
            <View key={key} style={styles.dayCell}>
              {day ? (
                <TouchableOpacity
                  onPress={() => handleDayPress(day)}
                  style={[
                    styles.dayButton,
                    {
                      backgroundColor: getCellBackground(isSelected(day), isToday(day)),
                      borderColor: isToday(day) ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      {
                        color: isSelected(day) ? '#ffffff' : colors.text,
                        fontWeight: isToday(day) ? '600' : '400',
                      },
                    ]}
                  >
                    {day}
                  </Text>
                  {hasTasks(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) && (
                    <View
                      style={[
                        styles.taskDot,
                        { backgroundColor: isSelected(day) ? '#ffffff' : colors.primary },
                      ]}
                    />
                  )}
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </Animated.View>
      )}

      {/* Week View */}
      {viewMode === 'week' && (
        <Text style={[styles.weekRangeText, { color: colors.textTertiary }]}>
          {weekDaysList[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          {' - '}
          {weekDaysList[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Text>
      )}
      {viewMode === 'week' && (
        <Animated.View style={styles.weekGrid}>
          {weekDaysList.map((date, index) => {
            const day = date.getDate();
            const isSelectedDate = date.toDateString() === selectedDate.toDateString();
            const isTodayDate = date.toDateString() === new Date().toDateString();

            return (
              <TouchableOpacity
                key={date.toDateString()}
                onPress={() => onDateSelect(date)}
                style={[
                  styles.weekDayButton,
                  {
                    backgroundColor: getCellBackground(isSelectedDate, isTodayDate),
                    borderColor: isTodayDate ? colors.primary : 'transparent',
                  },
                ]}
              >
                <Text style={[styles.weekDayName, { color: colors.textTertiary }]}>
                  {weekDays[index]}
                </Text>
                <Text
                  style={[
                    styles.weekDay,
                    {
                      color: isSelectedDate ? '#ffffff' : colors.text,
                      fontWeight: isSelectedDate ? '700' : '500',
                    },
                  ]}
                >
                  {day}
                </Text>
                <View
                  style={[
                    styles.taskDot,
                    styles.weekTaskDot,
                    {
                      backgroundColor: getWeekDotColor(hasTasks(date), isSelectedDate),
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  headerCenter: {
    alignItems: 'center',
  },
  navButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewModeText: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  dayCell: {
    width: '14.285%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  dayButton: {
    width: '90%',
    height: '90%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  taskDot: {
    position: 'absolute',
    bottom: 4,
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  weekTaskDot: {
    position: 'relative',
    bottom: 0,
    marginTop: 4,
  },
  weekRangeText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weekDayButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1.5,
  },
  weekDayName: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  weekDay: {
    fontSize: 16,
    fontWeight: '600',
  },
});
