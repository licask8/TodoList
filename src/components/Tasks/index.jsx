import { Task } from '../Task'
import styles from './tasks.module.css'
import {TbClipboardText} from 'react-icons/tb'

export function Tasks({ tasks, onDelete, onCompleted }) {
    const tasksQuantity = tasks.length
    const completedTasks = tasks.filter(task => task.isCompleted).length;


    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>Tarefas criadas</p>
                    <span>{tasksQuantity}</span>
                </div>

                <div>
                    <p className={styles.textPurple}>Concluídas</p>
                    <span>{completedTasks} de {tasksQuantity}</span>
                </div>
            </header>

            <div className={styles.list}>
                {tasks.map(task => (
                    <Task 
                        key={task.id} 
                        task={task} 
                        onDelete={onDelete} 
                        onCompleted={onCompleted}
                    />
                ))}

                {tasks.length <= 0 && (
                    <section className={styles.empty}>
                        <TbClipboardText size={50} />
                        <div>
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <span>Crie tarefas e organize seus items a fazer</span>
                        </div>
                    </section>
                )}
            </div>

        </section>
    )
}