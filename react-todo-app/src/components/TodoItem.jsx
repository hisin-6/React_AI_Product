import React, { useState } from 'react';

const TodoItem = ({ todo, onEdit, onDelete, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(todo.id, { ...todo, title: editTitle });
        setIsEditing(false);
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                    />
                    <button onClick={handleSave}>保存</button>
                </>
            ) : (
                <>
                    <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
                    <button onClick={handleEdit}>Edit</button>
                </>
            )}
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;