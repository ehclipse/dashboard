import styles from '../../styles/componentStyles/gameitem.module.css'

const {execFile} = window.require('child_process');


const Game = ({imgBG, game}) => {
   
    return (  
        <div>
            <div className={styles.gameitem} style={{backgroundImage: `url(${imgBG})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className={styles.body} onClick={() => {openGame(game)}}>
                </div>
            </div>
        </div>
    );
}
const openGame = (filepath) => {
    execFile(filepath, (error, stdout, stderror) => {
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
}

export default Game;