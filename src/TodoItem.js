import { CompleteIcon } from './CompleteIcon'
import { DeleteIcon } from './DeleteIcon'
import './TodoItem.css'

function TodoItem({completed, onComplete, onDelete, text}) {
    return (
      <li className="TodoItem">
       <CompleteIcon
          completed= {completed}
          onComplete= {onComplete}/>
        {/* <span
        className={`Icon Icon-check ${props.completed &&'Icon-check--active'}`}
        onClick={props.onComplete}
        >V</span> */}
        <p className={`TodoItem-p ${completed &&'TodoItem-p--complete'}`} >{text}</p>
        <DeleteIcon
          onDelete= {onDelete}/>
        {/* <span
        className="Icon Icon-delete"
        onClick={props.onDelete}
        >X</span> */}
      </li>
    );
  }

  export { TodoItem };