import Game from "../components/game/Game.js";
import styles from "../styles/games.module.css";
import lol from "../assets/lol.jpg";
import valorant from "../assets/valorant.jpg";
import genshin from "../assets/genshin.jpg";
import osu from "../assets/OSU.jpg";





const Games = () => {
    
    return (  
        <div className={`${styles.container}`} >
            <Game imgBG={lol} game='C:\\Riot Games\\Riot Client\\RiotClientServices.exe'/>
            <Game imgBG={valorant} game='C:\\Riot Games\\Riot Client\\RiotClientServices.exe'/>
            <Game imgBG={genshin} game='C:\\Program Files\\Genshin Impact\\launcher.exe'/>
            <Game imgBG={osu} game='C:\\Users\\ehycl\\AppData\\Local\\osu!\\osu!.exe'/>  
        </div>
    );
}


 
export default Games;