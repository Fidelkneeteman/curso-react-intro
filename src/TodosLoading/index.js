import React from 'react';
import { CompleteIcon } from '../TodoIcon/CompleteIcon'
import { DeleteIcon } from '../TodoIcon/DeleteIcon'
import "./TodosLoading.css";

function TodosLoading({

}) {

    return (
            <div className="LoadingTodo-container">
                <span className={`LoadingTodo-completeIcon`}></span>
                <p className='LoadingTodo-text'></p>
                <span className={`LoadingTodo-deleteIcon`}></span>
            </div>
    );
};
export { TodosLoading };