import styles from '../../styles/componentStyles/task.module.css';
import {AiOutlineDelete} from 'react-icons/ai'

const Task = ({task, deleteTask}) => {
    return (
        <div className={styles.container}>
            <AiOutlineDelete className={styles.icon} onClick={() => {deleteTask(task)}}/>
            <h2>{task.taskName}</h2>
            <p>{task.taskDate}</p>
            <p>{task.taskDesc}</p>
        </div>
     );
}
 
export default Task;