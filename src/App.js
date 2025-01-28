import React from 'react';
import { TodoCounter  } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';

// const defaultTodos = [
//   {text: 'Cortar cebolla', completed: true},
//   {text: 'Terminar curso', completed: false},
//   {text: 'Empezar otro curso', completed: true},
//   {text: 'Terminar el año', completed: false},
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
// localStorage.removeItem('TODOS_V1')

function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName); //me trae el default todos stringifiado

  let parsedTodos; 
  let parsedItem;

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue)); //si no existe nada, crea una versión en local storage
    parsedItem = initialValue; //le asigno valor para que no me arroje error
  } else {
    parsedItem = JSON.parse(localStorageItem) //si existe, lo parsea y lo define como parsed Item
  }

  const [item, setItem] = React.useState(parsedItem); //crea un estado de item (lo que antes era todos y setTodos) y le da el valor que tiene el todo en el localStorage, por lo tanto, item va a tener el valor que antes tenía defaulTodos

 
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));

    setItem(newItem);
  } //esta función actualiza el estado y el LS

    return [item, saveItem]
}

function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(
    todo => !!todo.completed
  ).length;
  const totalTodos = todos.length;
  const searchedTodos = todos.filter( //searchedTodos = todos buscados
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText= searchValue.toLowerCase(); // searchValue = valor del input TodoSearch.

      return todoText.toLowerCase().includes(searchText); // filtra los todos que incluyan las palabras que le dan valor al estado searchValue 
    }); //searchedTodo = un array con los todos coincidentes con la búsqueda del input.


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
    <>

      <TodoCounter
      completed= {completedTodos}
      total={totalTodos}
      />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {/* al array de los todos que coincidan con la búsqueda del TodoSearch les aplica un map para mostrarlos */}
        {searchedTodos.map (todo => (
          <TodoItem
            key= {todo.text}
            text= {todo.text}
            completed= {todo.completed}
            onComplete= {() => completeTodo(todo.text)} //simula q es un evento
            onDelete= {()=> {deleteTodo(todo.text)}}
            />
        ))}
      </TodoList>

      <CreateTodoButton/>
    </>
  );
}


export default App;

