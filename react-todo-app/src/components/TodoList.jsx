import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onEdit, onDelete, onToggle }) => {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    onEdit={onEdit} 
                    onDelete={onDelete}
                    onToggle={onToggle} // ←これ絶対必要！
                />
            ))}
        </ul>
    );
};

export default TodoList;