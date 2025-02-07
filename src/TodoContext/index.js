import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider ({children}) {
    const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,} = useLocalStorage('TODOS_V1', []);
    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter( //es estado derivado del estado todos
    todo => !!todo.completed
    ).length;
  const totalTodos = todos.length; //es estado derivado del estado todos
  const searchedTodos = todos.filter( //searchedTodos = todos buscados
    (todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText= searchValue.toLowerCase(); // searchValue = valor del input TodoSearch.

        return todoText.toLowerCase().includes(searchText); // filtra los todos que incluyan las palabras que le dan valor al estado searchValue
    }); //searchedTodo = un array con los todos coincidentes con la búsqueda del input.

    const addTodo = (todo) => {
        const newTodos = [...todos];
        newTodos.push(todo);

        saveTodos(newTodos);
        setOpenModal(state => !state);
    };

    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        (todo) => todo.text === text
        );
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        todo => todo.text === text
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    return (
        <TodoContext.Provider value={{
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            loading,
            error,
            openModal,
            setOpenModal,
            addTodo,
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContext, TodoProvider }