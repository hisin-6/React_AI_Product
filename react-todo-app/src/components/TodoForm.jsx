import React, { useState } from 'react';
import axios from 'axios';
import { createTodo, getTodos } from '../api/todos';

const TodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('タイトルを入力してよ！');
            return;
        }
        setError('');
        await addTodo(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="新しいTodoを追加"
            />
            <button type="submit">追加</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default TodoForm;