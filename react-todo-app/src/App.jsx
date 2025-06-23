import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import LoadingSpinner from './components/LoadingSpinner';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todos';
import './styles/App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
        setError('Error fetching todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = useCallback(async (todoTitle) => {
    try {
      await createTodo({ title: todoTitle, completed: false });
      const todos = await getTodos();
      setTodos(todos);
    } catch (error) {
      setError('Error adding todo');
    }
  }, []);

  const updateTodoHandler = useCallback(async (id, updatedFields) => {
    try {
      const updatedTodo = await updateTodo(id, { ...updatedFields, id });
      setTodos(todos => todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      setError('Error updating todo');
    }
  }, []);

  const deleteTodoHandler = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      setError('Error deleting todo');
    }
  };

  const toggleTodoHandler = async (id) => {
    try {
      const target = todos.find(todo => todo.id === id);
      const updated = await updateTodo(id, { ...target, completed: !target.completed });
      setTodos(todos.map(todo => (todo.id === id ? updated : todo)));
    } catch (error) {
      setError('Error toggling todo');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        onEdit={updateTodoHandler}
        onDelete={deleteTodoHandler}
        onToggle={toggleTodoHandler}
      />
    </div>
  );
};

export default App;