import styles from "../../styles/componentStyles/navitem.module.css";

const NavItem = ({Icon, handleClick}) => {
    return (
        <div className={styles.container}>
            <Icon className={styles.icon} onClick={handleClick}/>
        </div>
    );
}
 
export default NavItem;