
 
let sons = [];
let record = false;
let play = false;
let interval = []

window.addEventListener("keydown", handleKeyDownAudio);
window.addEventListener("keyup", handleKeyUpAudio);
window.addEventListener("keydown", handleKeyDownRecord);
window.addEventListener("keydown", handleKeyDownPlay);

function handleKeyDownAudio(event){
    let key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
    if(event.repeat){return}
    if(!key){
        return;
    }
    // console.log(event.keyCode);
    if(event.keyCode != 82 && event.keyCode!= 80 ){
        let audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
        audio.play();
       
        key.classList.add('playing')
      
    }
    };
    function handleKeyUpAudio(event){
        let key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
        if(event.keyCode != 82 && event.keyCode!= 80 ){
           
            key.classList.remove('playing')
          
        }
    }

// function handleKeyDownRecord(event){
    
//     if(event.keyCode == "82" && play == false){
//         record = !record;
//         let key = document.querySelector(`.key[data-key="82"]`);
//         key.classList.toggle('playing');
//     } 
//     if (event.keyCode != "82" && event.keyCode != "80" && record == true){
//         sons.push(event.keyCode)
//         Interval.push(Date.now())
//         // console.log(sons)
//         console.log(Interval)
//     }
    
// }

// function handleKeyDownPlay(event){
//     if(event.keyCode == "80" ){
//         play = !play
//         let key = document.querySelector(`.key[data-key="80"]`);
//         key.classList.toggle('playing');
//         sons.forEach(son => {
//             let audio = document.querySelector(`audio[data-key="${son}"]`); 
          
//             setTimeout(() => {audio.play()}, 1000);
//         });
//     } 
//     }


function handleKeyDownRecord(event){
    // Enregistrer ou arrêter l'enregistrement avec la touche "R"
    if(event.keyCode == 82){ // R
        record = !record;
        let key = document.querySelector(`.key[data-key="82"]`);
        key.classList.toggle("playing");
    } 

    // Enregistrer les keyCodes et les timestamps si l'enregistrement est activé
    if(event.keyCode != 82 && event.keyCode != 80 && record == true){
        sons.push(event.keyCode);
        interval.push(Date.now());
    }
    console.log(interval);
}

function handleKeyDownPlay(event){
    // Jouer ou arrêter la lecture avec la touche "P"
    if(event.keyCode == 80){ // P
        play = !play;
        let key = document.querySelector(`.key[data-key="80"]`);
        key.classList.toggle("playing");

        if(play) {
            // Si "P" est pressé, commencer la lecture
            let startTime = interval[0]; // Le premier enregistrement donne le temps de départ

            // Parcours de chaque son pour jouer avec le bon timing
            sons.forEach((son, index) => {
                let delay = interval[index] - startTime; // Calcul du délai en ms
                setTimeout(() => {
                    let audio = document.querySelector(`audio[data-key="${son}"]`);
                    if (audio) {
                        audio.currentTime = 0; 
                        audio.play(); // Jouer le son
                    }
                }, delay);
            });
        }
    }
}