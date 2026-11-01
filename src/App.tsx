import { useEffect, useState } from 'react'
import type { ITask } from './models/types'

import './App.css'
import ItemList from './components/ItemList/ItemList';
import ModalDelete from './components/ModalDelete/ModalDelete';

function App() {
  const [newTaskText, setNewTaskText] = useState('');
  const [filters, setFilters] = useState('all');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);
  const [filtredTasks, setFiltredTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const storageTasks = JSON.parse(storedTasks);
      setTasks([...storageTasks]);
      setFiltredTasks([...storageTasks]);
    }
    setIsLoaded(true);  
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newTaskText.trim()) return;
    const newTask: ITask = {
      id:crypto.randomUUID(),
      text: newTaskText.trim(),
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setFiltredTasks([newTask, ...tasks]);
    setFilters('all');
    setNewTaskText('');
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setFiltredTasks(updatedTasks);
    setFilters('all');
  };

  const confirmDeleteTask = (id: string) => {
    setTaskToDelete(tasks.find(task => task.id === id) || null);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    setFiltredTasks(updatedTasks);
  };

  const changeFilters = (filter: string) => {
    setFilters(filter);
    if (filter === 'all') {
      setFiltredTasks([...tasks]);
    } else if (filter === 'active') {
      setFiltredTasks([...tasks.filter(task => !task.completed)]);
    } else if (filter === 'completed') {
      setFiltredTasks([...tasks.filter(task => task.completed)]);
    }
  };

  return (
    <>
    <main className="tasks">
      <h1 className="tasks__title">Список задач</h1>

      <form className="tasks__form addform">
        <input
          className="addform__input"
          type="text"
          placeholder="Введите новую задачу..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />

        <button className={`addform__btn ${newTaskText.trim() ? '' : 'addform__btn-disabled'}`} type="submit" onClick={(e) => addTask(e)}>Добавить</button>
      </form>

      <div className="tasks__filters filters">
        <button className={`filters__item ${filters === 'all' ? 'filters__item-active' : ''}`} onClick={()=>changeFilters('all')}>Все</button>

        <button className={`filters__item ${filters === 'active' ? 'filters__item-active' : ''}`} onClick={()=>changeFilters('active')}>Активные</button>

        <button className={`filters__item ${filters === 'completed' ? 'filters__item-active' : ''}`} onClick={()=>changeFilters('completed')}>Выполненные</button>
      </div>

      <ul className="tasks__list list">
        {filtredTasks.map(task => (
          <ItemList key={task.id} task={task} onToggle={toggleTaskCompletion} onDelete={confirmDeleteTask} />
        ))}


      </ul>

      <div className="tasks__counter">Всего задач: {tasks.length} | Осталось выполнить: {tasks.filter(task => !task.completed).length}</div>
    </main>
    {taskToDelete && <ModalDelete onClose={() => { setTaskToDelete(null); }} onDelete={deleteTask} taskToDelete={taskToDelete} />}
    </>
  )
}

export default App
