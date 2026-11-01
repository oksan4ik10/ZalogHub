import './ModalDelete.css';
import type { ITask } from '../../models/types';

interface IProps {
    onClose: () => void;
    onDelete: (id: string) => void;
    taskToDelete: ITask | null;
}

export default function ModalDelete(props: IProps) {
    return (
    <div className="modal">
      <div className="modal__overlay"></div>

      <div
        className="modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="modal__close" type="button" aria-label="Закрыть окно" onClick={props.onClose}>
          ×
        </button>

        <div className="modal__icon">!</div>

        <h2 className="modal__title" id="modal-title">Удалить задачу?</h2>

        <p className="modal__text">
          Вы уверены, что хотите удалить задачу "{props.taskToDelete?.text}"? Это действие нельзя
          отменить.
        </p>

        <div className="modal__actions">
          <button className="modal__button modal__btnCancel" type="button" onClick={props.onClose}>
            Отмена
          </button>

          <button className="modal__button modal__btnDelete" type="button" onClick={() => {
            if (props.taskToDelete) {
              props.onDelete(props.taskToDelete.id);
              props.onClose();
            }
          }}>
            Удалить
          </button>
        </div>
      </div>
    </div>
    );
}
