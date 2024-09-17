import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = JSON.parse(localStorage.getItem('todos') || []);

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducereducer, initialState);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos]);


    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        };

        dispatch(action);
    };

    const handleDeleteTodo = (todo) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: todo.id
        };

        dispatch(action);
    }

    const handleToggleTodo = (todo) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: todo.id
        };

        dispatch(action);
    }

    const todosCounter = todos.length;
    const todosPendCounter = todos.filter(todo => !todo.done).length;


    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCounter,
        todosPendCounter
    }
};
