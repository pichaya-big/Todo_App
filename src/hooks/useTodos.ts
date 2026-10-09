import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFilter } from '../types/Todo';
import { storageService } from '../storage/asyncStorage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from storage on mount
  useEffect(() => {
    void loadTodos();
  }, []);

  // Save todos to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      void storageService.saveTodos(todos);
    }
  }, [todos, isLoading]);

  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    const savedTodos = await storageService.getTodos();
    const todosWithStatus = savedTodos.map(todo => ({
      ...todo,
      isOverdue: !!(todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date()),
    }));
    setTodos(todosWithStatus);
    setIsLoading(false);
  }, []);

  const addTodo = useCallback((
    title: string,
    category: string = 'personal',
    priority: 'low' | 'medium' | 'high' = 'medium',
    description?: string,
    dueDate?: string
  ) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      category,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          const dueDate = updates.dueDate ?? todo.dueDate;
          const completed = updates.completed ?? todo.completed;
          return {
            ...todo,
            ...updates,
            updatedAt: new Date().toISOString(),
            isOverdue: !!(dueDate && !completed && new Date(dueDate) < new Date()),
          };
        }
        return todo;
      })
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : undefined,
              updatedAt: new Date().toISOString(),
              isOverdue: false,
            }
          : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  // Search and filter todos
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         todo.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'overdue') return todo.isOverdue && !todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
    overdue: todos.filter(t => t.isOverdue && !t.completed).length,
    byPriority: {
      high: todos.filter(t => t.priority === 'high' && !t.completed).length,
      medium: todos.filter(t => t.priority === 'medium' && !t.completed).length,
      low: todos.filter(t => t.priority === 'low' && !t.completed).length,
    },
    completionRate: todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0,
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    isLoading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    stats,
  };
};
