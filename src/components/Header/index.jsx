import styles from './header.module.css';
import { AiOutlinePlusCircle  } from 'react-icons/ai'

import Logo from '../../assets/step.png'
import { useState } from 'react';




export function Header( { onAddTask }) {
    const [title, setTitle] = useState('')


    function handleSubmit(event) {
    event.preventDefault();

        if (title === '') {
            return
        } else {

            onAddTask(title);
            setTitle("");
        }
    }

    function onChangeTitle(event) {
        setTitle(event.target.value)
    }


    return(
        <header className={styles.header}>
            <img src={Logo} alt="logo" className={styles.logo} />

            <form className={styles.newTaskForm} onSubmit={handleSubmit}>
                <input 
                    placeholder='Adicione um step' 
                    onChange={onChangeTitle} 
                    value={title} />

                <button >
                    Criar 
                    <AiOutlinePlusCircle size={20} />
                </button>
            </form>
        </header>
    )
}