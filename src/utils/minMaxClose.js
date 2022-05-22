const { ipcRenderer } = window.require('electron');


const closeWin = () => {
    ipcRenderer.send('closeApp');
}

const maxWin = (max) => {
   if(max)
   {
    ipcRenderer.send('maxApp');
    return;
   }

    ipcRenderer.send('restore');

}

const minWin = () => {  
    ipcRenderer.send('minApp');
}


export {closeWin, maxWin, minWin};
