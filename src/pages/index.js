import {React, useState} from 'react';
import NavItem from '../components/navbar/NavItem';
import styles from "../styles/home.module.css";
import {FaSpotify, FaDiscord, FaRegListAlt, FaGraduationCap, FaHome} from 'react-icons/fa';
import {GiConsoleController} from 'react-icons/gi';
import {VscChromeMaximize, VscClose, VscChromeMinimize} from 'react-icons/vsc'
import Games from './Games';
import ToDoList from './ToDoList';
import {closeWin, maxWin, minWin} from '../utils/minMaxClose';

const { execFile } = window.require('child_process');



const Home = () => {
    const [currPage, setcurrPage] = useState('home');
    const [max, setMax] = useState(true);
    return ( 
        <div className={styles.container}>
            <div className={styles.minMaxClose}>
                <VscClose className={styles.minMaxCloseIcons} onClick={()=>{ closeWin(); }}/>
                <VscChromeMaximize className={styles.minMaxCloseIcons} onClick={()=>{ maxWin(max); setMax(!max);  }}/>
                <VscChromeMinimize className={styles.minMaxCloseIcons} onClick={()=>{ minWin(); }}/>
            </div>
            <div className={styles.navBar}>
                <NavItem Icon={FaHome}  handleClick={() => {setcurrPage('home');}}/>
                <NavItem Icon={FaDiscord} handleClick={() => {
                    execFile('C:\\Users\\ehycl\\AppData\\Local\\Discord\\app-1.0.9004\\Discord.exe')
                }}/>
                <NavItem Icon={FaRegListAlt} handleClick={() => {setcurrPage('todolist')}}/>
                <NavItem Icon={GiConsoleController} handleClick={() => {setcurrPage('games');}}/>
                <NavItem Icon={FaSpotify} handleClick={() => {
                    execFile('C:\\Users\\ehycl\\AppData\\Local\\Microsoft\\WindowsApps\\Spotify.exe', (error, stdout, stderror) => {
                        if(error){
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if(stderror){
                            console.log(`stderr: ${stderror}`);
                            return;
                        }
                        console.log(`stdout: ${stdout}`);
                    });
                }}/>
                <NavItem Icon={FaGraduationCap}/>
            </div>
            <div className={styles.line}></div>
            
            <div className={`${styles.scroll} ${styles.scroller}`}>
                {
                    (currPage === 'home') && <div className={styles.homeBG}> 

                    </div>
                }
                {
                (currPage === 'games') && <Games/> 
                }
                {
                    (currPage === 'todolist') && <ToDoList/>
                }
            </div>
        </div> 
    );
}
 
export default Home;