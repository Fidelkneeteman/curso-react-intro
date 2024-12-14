import React from 'react';
import { TodoCounter  } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';


const defaultTodos = [
  {text: 'Cortar cebolla', completed: true},
  {text: 'Terminar curso', completed: false},
  {text: 'Empezar otro curso', completed: true},
  {text: 'Terminar el año', completed: false},
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(
    todo => !!todo.completed
  ).length;
  const totalTodos = todos.length;
  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText= searchValue.toLowerCase();

      return todoText.toLowerCase().includes(searchText);
    });

  console.log(searchValue)
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
        {searchedTodos.map(todo => (
          <TodoItem
            key= {todo.text}
            text= {todo.text}
            completed= {todo.completed}
            />
        ))}
      </TodoList>

      <CreateTodoButton/>
    </>
  );
}


export default App;

