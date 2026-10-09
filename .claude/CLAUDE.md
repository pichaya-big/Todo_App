# TodoApp - ข้อมูลโปรเจกต์

## 📋 ภาพรวม

TodoApp คือ React Native mobile application สำหรับจัดการรายการงาน (Todo) ด้วยฟีเจอร์ที่ครบครัน

**Tech Stack:**
- React Native 19.2.3
- Expo 57.0.27
- TypeScript 6.0.3
- AsyncStorage 1.23.1

---

## ✨ ฟีเจอร์หลัก

### 1. Todo Management
- ✅ เพิ่ม/แก้ไข/ลบ todo
- ✅ เครื่องหมายว่าเสร็จ
- ✅ จัดกลุ่มตามหมวดหมู่ (Work, Personal, Shopping, Health)
- ✅ ตั้งความสำคัญ (High, Medium, Low)

### 2. Search & Filter
- 🔍 ค้นหา todo real-time
- 🏷️ ตัวกรองตามสถานะ (All, Active, Completed, Overdue)
- 📊 สถิติและความก้าวหน้า

### 3. Theme Support
- ☀️ Light Mode / 🌙 Dark Mode
- 🎨 โทนสีสวยงามทั้งสองโหมด
- 💾 บันทึก theme preference

### 4. Data Persistence
- 📲 Local Storage (AsyncStorage)
- 🔐 ข้อมูลในเครื่องเท่านั้น
- 🚀 ไม่ต้องการ internet

---

## 📁 โครงสร้างโค้ด

```
src/
├── types/
│   └── Todo.ts                 # Interface สำหรับ Todo
├── styles/
│   └── colors.ts               # Light/Dark color themes
├── storage/
│   └── asyncStorage.ts         # LocalStorage service
├── hooks/
│   ├── useTodos.ts             # Todo state management
│   └── useTheme.ts             # Theme management
├── components/
│   ├── TodoItem.tsx            # Individual todo display
│   ├── TodoInput.tsx           # Add todo form
│   ├── TodoFilter.tsx          # Filter & stats display
│   ├── TodoSearch.tsx          # Search functionality
│   ├── TodoStats.tsx           # Progress visualization
│   └── TodoActions.tsx         # Clear completed action
└── screens/
    └── TodoListScreen.tsx      # Main screen
```

---

## 🔄 State Management

### useTodos Hook
- State: `todos[]`, `filter`, `searchQuery`
- Actions: `addTodo`, `updateTodo`, `deleteTodo`, `toggleTodo`, `clearCompleted`
- Stats: `total`, `completed`, `active`, `overdue`, `completionRate`
- Auto-save to AsyncStorage

### useTheme Hook
- State: `isDark`, `themeMode`
- Actions: `toggleTheme`, `setThemeMode`
- Persists theme preference

---

## 🎨 สีและ Theme

### Light Mode Colors
- Primary: `#007AFF` (Blue)
- Background: `#FFFFFF`
- Surface: `#F5F5F5`
- Text: `#000000`

### Dark Mode Colors
- Primary: `#0A84FF` (Bright Blue)
- Background: `#1C1C1E`
- Surface: `#2C2C2E`
- Text: `#FFFFFF`

---

## 📱 วิธีรัน

### Web (for testing)
```bash
npm start
# Then press 'w' or visit http://localhost:19006
```

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

---

## 🔧 Configuration Files

- `package.json` - Dependencies + scripts
- `tsconfig.json` - TypeScript configuration
- `app.json` - Expo configuration
- `index.ts` - Entry point

---

## 💡 Architecture Notes

### Data Flow
1. User interaction → Component
2. Component calls hook function
3. useTodos updates state
4. AsyncStorage auto-saves
5. Component re-renders

### Dark Mode Implementation
- `getColors(isDark)` returns color object
- Theme preference saved in AsyncStorage
- System theme as fallback

### Search & Filter Logic
- Search filters by title + description
- Filter status applied separately
- Combined in `filteredTodos`

---

## 🚀 Performance Considerations

- FlatList for efficient todo rendering
- useCallback for memoized functions
- AsyncStorage async operations don't block UI
- No unnecessary re-renders

---

## 📋 To Do (Future Features)

- [ ] Due date picker
- [ ] Notification/Reminder
- [ ] Multi-select & bulk actions
- [ ] Todo details modal
- [ ] Export todos (CSV/JSON)
- [ ] Cloud sync (Firebase)
- [ ] Recurring todos
- [ ] Todo templates

---

## 🐛 Known Issues

- None at the moment

---

## 📝 Development Guidelines

### Code Style
- TypeScript strict mode
- React functional components
- Custom hooks for state
- Inline styles with StyleSheet.create()

### Testing
- Manual testing on mobile device
- Web preview for quick iteration
- Test light/dark mode switching
- Test search and filter functionality

---

**Last Updated:** 2026-10-09
**Author:** Pichaya Santhuenkaew
