import React, {useContext} from 'react';
import './TodoForm.css';
import { TodoContext } from '../TodoContext';


function TodoForm() {
    const [ newTodoText, setNewTodoText ] = React.useState('');
    const { addTodo, setOpenModal } = useContext(TodoContext);

    
    const createTodo = () => {
        if(!newTodoText) {
            window.alert('Escribe un TODO.');
            setOpenModal(true);
        } else {
            const newTodo = {text: newTodoText, completed: false}
            addTodo(newTodo);
            setOpenModal(false);
        };
    };

    const onSubmit = (event) => {
        event.preventDefault();
        createTodo();
    };
    const onCancel = () => {;
        setOpenModal(false);
    };
    const onChange = (event) => {
        setNewTodoText(event.target.value)
    }

    return (
        <form onSubmit={onSubmit} className='TodoForm-container'>
            <label for= 'writeTodo'>Escribe tu nuevo TODO!</label>

            <textarea
                placeholder='Pagar el TGI'
                value = {newTodoText}
                onChange={onChange}
            />
            <div className='TodoForm-buttonContainer'>
            <button
                type='button'
                className='TodoForm-button TodoForm-button--cancel'
                onClick= { onCancel }
            >Cancelar</button>
            <button
                className='TodoForm-button TodoForm-button--add'
                type='submit'
            >Añadir</button>
            </div>
        </form>
    )
};

export { TodoForm };
