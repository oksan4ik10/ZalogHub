import './ItemList.css';
import type { ITask } from '../../models/types';

interface IProps {
    task: ITask;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function ItemList(props: IProps) {
    return (
        <li className={`task ${props.task.completed ? 'task-completed' : ''}`}>
          <input className="task__checkbox" type="checkbox" checked={props.task.completed} onChange={() => props.onToggle(props.task.id)} />

          <span className="task__text"> {props.task.text} </span>

          <button
            className="task__deleteBtn"
            type="button"
            aria-label="Удалить задачу"
            onClick={() => props.onDelete(props.task.id)}
          >
            ×
          </button>
        </li>
    );
}
