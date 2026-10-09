type Language = 'en' | 'th';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    // Common
    app_name: 'TaskFlow',
    today: 'Today',
    upcoming: 'Upcoming',
    statistics: 'Statistics',
    settings: 'Settings',

    // Home Screen
    good_morning: 'Good morning!',
    daily_focus: 'DAILY FOCUS',
    tasks_completed: 'tasks completed',
    keep_going: 'Keep going, almost there!',
    no_tasks_today: 'No tasks today',
    add_task_hint: 'Add new task to get started',

    // Categories
    all: 'All',
    work: 'Work',
    personal: 'Personal',
    shopping: 'Shopping',
    health: 'Health',

    // Priority
    high_priority: 'High Priority',
    medium_priority: 'Medium Priority',
    low_priority: 'Low Priority',

    // Upcoming Screen
    upcoming_header: 'Upcoming',
    click_date: 'Click a date to view tasks',
    no_upcoming_tasks: 'No Upcoming Tasks',
    all_done: 'All done! Enjoy your free time',
    slide_up: 'Slide up ↑',
    slide_down: 'Slide down ↓',

    // Statistics Screen
    statistics_header: 'Statistics',
    productivity_overview: 'Your productivity overview',
    overall: 'Overall',
    total_tasks: 'Total Tasks',
    completed: 'Completed',
    active: 'Active',
    overdue: 'Overdue',
    completion_rate: 'Completion Rate',
    by_category: 'By Category',
    by_priority: 'By Priority',

    // Settings Screen
    settings_header: 'Settings',
    customize_experience: 'Customize your experience',
    display: 'DISPLAY',
    dark_mode: 'Dark Mode',
    on: 'On',
    off: 'Off',
    notifications: 'NOTIFICATIONS',
    task_reminders: 'Task Reminders',
    upcoming_tasks_notification: 'Get notified about upcoming tasks',
    daily_summary: 'Daily Summary',
    daily_summary_hint: 'Receive daily task summary',
    data: 'DATA',
    storage_info: 'Storage Information',
    tasks_stored: 'tasks stored locally',
    clear_all_data: 'Clear All Data',
    delete_tasks_permanently: 'Delete all tasks permanently',
    about: 'ABOUT',
    app_version: 'App Version',
    help_support: 'Help & Support',
    help_using_taskflow: 'Get help with using TaskFlow',
    terms_privacy: 'Terms & Privacy',
    review_policies: 'Review our policies',
    language: 'Language',
    select_language: 'Choose your preferred language',
    quick_stats: 'QUICK STATS',

    // Dialogs
    clear_all_data_title: 'Clear All Data',
    clear_all_data_message: 'Are you sure? This will delete all tasks permanently.',
    cancel: 'Cancel',
    delete: 'Delete',
    success: 'Success',
    data_cleared: 'All data has been cleared',
    help_title: 'Help & Support',
    help_message: 'For help and support, please contact support@taskflow.app',
    terms_title: 'Terms & Privacy',
    terms_message: 'Privacy Policy and Terms of Service coming soon.',

    // Bottom Navigation
    slide: 'Slide',

    // TodoInput Modal
    add_new_task: 'New Task',
    add_button: 'Add',
    task_title: 'Task title...',
    task_details: 'Add details or notes...',
    date_label: 'DATE',
    tomorrow_label: 'Tomorrow',
    pick_date: 'Pick Date',
    priority_label: 'PRIORITY',
    category_section: 'CATEGORY',
    reminders: 'REMINDERS',
    reminder_enabled: 'Enable reminder',
    cloud_sync: 'Saved locally & synced securely',
    cloud_active: '• Cloud Active',
    workspace_default: 'Workspace Default',
  },

  th: {
    // Common
    app_name: 'TaskFlow',
    today: 'วันนี้',
    upcoming: 'วันหน้า',
    statistics: 'สถิติ',
    settings: 'ตั้งค่า',

    // Home Screen
    good_morning: 'สวัสดีตอนเช้า! 👋',
    daily_focus: 'เป้าหมายวันนี้',
    tasks_completed: 'งานเสร็จแล้ว',
    keep_going: 'เก่งไปเลย, เหลือเพียบเดียว!',
    no_tasks_today: 'ยังไม่มี Task วันนี้',
    add_task_hint: 'เพิ่ม Task ใหม่เพื่อเริ่มต้น',

    // Categories
    all: 'ทั้งหมด',
    work: 'งาน',
    personal: 'ส่วนตัว',
    shopping: 'ช้อปปิ้ง',
    health: 'สุขภาพ',

    // Priority
    high_priority: 'ความสำคัญสูง',
    medium_priority: 'ความสำคัญปานกลาง',
    low_priority: 'ความสำคัญต่ำ',

    // Upcoming Screen
    upcoming_header: 'วันหน้า',
    click_date: 'คลิกวันที่เพื่อดู Task',
    no_upcoming_tasks: 'ไม่มี Task',
    all_done: 'เสร็จแล้ว! สนุกกับเวลาว่าง',
    slide_up: 'เลื่อนขึ้น ↑',
    slide_down: 'เลื่อนลง ↓',

    // Statistics Screen
    statistics_header: 'สถิติ',
    productivity_overview: 'ภาพรวมผลงาน',
    overall: 'ทั้งหมด',
    total_tasks: 'งานทั้งหมด',
    completed: 'เสร็จแล้ว',
    active: 'ยังทำไม่เสร็จ',
    overdue: 'เกินกำหนด',
    completion_rate: 'อัตราการเสร็จ',
    by_category: 'ตามหมวดหมู่',
    by_priority: 'ตามความสำคัญ',

    // Settings Screen
    settings_header: 'ตั้งค่า',
    customize_experience: 'ปรับแต่งประสบการณ์',
    display: 'การแสดงผล',
    dark_mode: 'โหมดมืด',
    on: 'เปิด',
    off: 'ปิด',
    notifications: 'การแจ้งเตือน',
    task_reminders: 'เตือนงาน',
    upcoming_tasks_notification: 'รับการแจ้งเตือนเกี่ยวกับงานที่จะมา',
    daily_summary: 'สรุปรายวัน',
    daily_summary_hint: 'รับสรุปงานรายวัน',
    data: 'ข้อมูล',
    storage_info: 'ข้อมูลพื้นที่จัดเก็บ',
    tasks_stored: 'งานที่จัดเก็บไว้ในเครื่อง',
    clear_all_data: 'ลบข้อมูลทั้งหมด',
    delete_tasks_permanently: 'ลบงานทั้งหมดถาวร',
    about: 'เกี่ยวกับ',
    app_version: 'เวอร์ชันแอป',
    help_support: 'วิธีใช้และสนับสนุน',
    help_using_taskflow: 'ได้ความช่วยเหลือเกี่ยวกับการใช้ TaskFlow',
    terms_privacy: 'เงื่อนไขและความเป็นส่วนตัว',
    review_policies: 'ตรวจสอบนโยบายของเรา',
    language: 'ภาษา',
    select_language: 'เลือกภาษาที่คุณต้องการ',
    quick_stats: 'สถิติด่วน',

    // Dialogs
    clear_all_data_title: 'ลบข้อมูลทั้งหมด',
    clear_all_data_message: 'คุณแน่ใจไหม? สิ่งนี้จะลบงานทั้งหมดอย่างถาวร',
    cancel: 'ยกเลิก',
    delete: 'ลบ',
    success: 'สำเร็จ',
    data_cleared: 'ข้อมูลทั้งหมดถูกลบแล้ว',
    help_title: 'วิธีใช้และสนับสนุน',
    help_message: 'เพื่อขอความช่วยเหลือโปรดติดต่อ support@taskflow.app',
    terms_title: 'เงื่อนไขและความเป็นส่วนตัว',
    terms_message: 'นโยบายความเป็นส่วนตัวและเงื่อนไขการให้บริการจะมาเร็ว ๆ นี้',

    // Bottom Navigation
    slide: 'เลื่อน',

    // TodoInput Modal
    add_new_task: 'งานใหม่',
    add_button: 'เพิ่ม',
    task_title: 'ชื่องาน...',
    task_details: 'เพิ่มรายละเอียดหรือหมายเหตุ...',
    date_label: 'วันที่',
    tomorrow_label: 'วันพรุ่งนี้',
    pick_date: 'เลือกวันที่',
    priority_label: 'ความสำคัญ',
    category_section: 'หมวดหมู่',
    reminders: 'การเตือน',
    reminder_enabled: 'เปิดการเตือน',
    cloud_sync: 'บันทึกไว้ในเครื่องและซิงค์อย่างปลอดภัย',
    cloud_active: '• ระบบคลาวด์ทำงาน',
    workspace_default: 'ค่าเริ่มต้นพื้นที่ทำงาน',
  },
};
