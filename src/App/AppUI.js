import React from 'react';
import { TodoCounter  } from '../TodoCounter/index';
import { TodoSearch } from '../TodoSearch/index';
import { TodoList } from '../TodoList/index';
import { TodoItem } from '../TodoItem/index';
import { TodosLoading } from '../TodosLoading/index';
import { TodosError } from '../TodosError/index';
import { EmptyTodos } from '../EmptyTodos/index';
import { CreateTodoButton } from '../CreateTodoButton/index';
import { TodoForm } from '../TodoForm/index'
import { Modal } from '../Modal/index'
import { TodoContext } from '../TodoContext';


function AppUI() {
    const {
        searchedTodos,
        completeTodo,
        deleteTodo,
        loading,
        error,
        openModal,
        setOpenModal,
    } = React.useContext(TodoContext);

        return(
            <>
            <TodoCounter  />
            <TodoSearch />
                    <TodoList>
                    {/* Todas estas son validaciones previas a mostrar la lista de todos */}
                    { loading && (
                        <>
                        <TodosLoading />
                        <TodosLoading />
                        <TodosLoading />
                        </>
                    ) /*cuando loading es true*/}
                    { error && <TodosError /> }
                    { (!loading && searchedTodos.length === 0) && <EmptyTodos /> /*Cuando no está cargando pero el array está vacío */}

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
            
            {openModal && (
                <Modal>
                  <TodoForm />
                </Modal>
            )}
            
            </>
        );
};

export {AppUI}
