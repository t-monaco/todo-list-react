import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? { title, id, completed } : todo
        );
        setTodos(newTodo);
        setEditTodo(null);
    };

    useEffect(() => {
        if(editTodo) {
            setInput(editTodo.title)
        }else {
            setInput('')
        }
    }, [setInput, editTodo])

    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!editTodo) {
            setTodos([
                ...todos,
                { id: uuidv4(), title: input, completed: false },
            ]);
            setInput('');
        } else {
            updateTodo(input, editTodo.id, editTodo.completed);
        }
    };

    return (
        <form action="" onSubmit={onFormSubmit} className='task-form'>
            <input
                className="task-input"
                type="text"
                placeholder="Enter a Todo..."
                value={input}
                required
                onChange={onInputChange}
            />
            <div className="round-shape"></div>
            <button className="button button-add" type="submit">
                {editTodo ? 'OK' : <i className="lni lni-plus"></i>}
            </button>
        </form>
    );
};

export default Form;
