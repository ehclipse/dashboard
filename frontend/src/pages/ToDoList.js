import { useState } from 'react';
import styles from '../styles/todolist.module.css';
import {VscDiffAdded} from 'react-icons/vsc';
import {BiArrowBack} from 'react-icons/bi';
import Task from '../components/task/Task';
import {v4 as uuidv4} from 'uuid';


const ToDoList = () => {
    const [taskName, settaskName] = useState('');
    const [taskDesc, settaskDesc] = useState('');
    const [taskDate, settaskDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [toggleAdd, settoggleAdd] = useState(false);


    // useEffect() queries the data


    const taskFormHandler = (e) => {
        e.preventDefault();
        // Save to array
        setTasks([...tasks, {
            taskName,
            taskDesc,
            taskDate
        }]);

        // resets form
        settaskName('');
        settaskDesc('');
        settaskDate('');

        // Send to Database
    }
    

    const deleteTask = (deletedTask) =>{
        // Delete task from array
        setTasks(tasks.filter((task) => {return task.taskName !== deletedTask.taskName && task.taskDesc !== deletedTask.taskDesc && task.taskDate !==  deletedTask.taskDate}))
        
        // Delete task from database

    }

    return (
        <div className={styles.container}>
            <h1>To Do List</h1>

            { /* This section renders all the tasks from tasks list here that match this date */
                !toggleAdd && 
                <div className={styles.tasks}>
                    {
                        tasks.map((task) => {
                           return <Task task={task} key={uuidv4()} deleteTask={deleteTask}/>
                        })
                    }
                </div>
            }


            {
                !toggleAdd && <VscDiffAdded className={styles.icon} onClick={(e) => {settoggleAdd(true)}}/>
            }




            {
                toggleAdd && <form className={styles.form} onSubmit={taskFormHandler}>
                    <label htmlFor="taskName">Task Name</label>
                    <input id="taskName" type="text" placeholder='name' value={taskName} onChange={(e) => settaskName(e.target.value)}/>

                    <label htmlFor="taskDesc">Task Description</label>
                    <input id="taskDesc" type="text" placeholder='description' value={taskDesc} onChange={(e) => settaskDesc(e.target.value)}/>

                    <label htmlFor="taskDate">Task Date</label>
                    <input id="taskDate" type="date" value={taskDate} onChange={(e) => settaskDate(e.target.value)}/>
                    <input type="submit" value="Submit" disabled={!taskName || !taskDate || !taskDesc}/>
                </form>
            }
            {
                toggleAdd && <BiArrowBack className={styles.icon} onClick={() => {settoggleAdd(false); settaskName(''); settaskDate(''); settaskDesc('');}}/>
            }
        </div> 
    );
}
 
export default ToDoList;


// Automatically get a list of things to do today (mongoDB stuff)

// If next day and haven't finished task from previous day, add them to current day at the top
// -- Display today and previous days basically
// Button to preview list for next day (bonus)


// Make X on task