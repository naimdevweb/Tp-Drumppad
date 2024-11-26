let sons = [];
let record = false;
let play = false;
let interval = [];

window.addEventListener("keydown", handleKeyDownAudio);
window.addEventListener("keyup", handleKeyUpAudio);
window.addEventListener("keydown", handleKeyDownRecord);
window.addEventListener("keydown", handleKeyDownPlay);

function handleKeyDownAudio(event) {
  let key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (event.repeat) {
    return;
  }
  if (!key) {
    return;
  }
  if (event.keyCode != 82 && event.keyCode != 80) {
    Handlekey(event.keyCode, key);
  }
}

function Handlekey(keycode, key) {
  let audio = document.querySelector(`audio[data-key="${keycode}"]`);
  audio.play();

  key.classList.add("playing");
}

function handleKeyUpAudio(event) {
  let key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (!key) {
    return;
  }
  if (event.keyCode != 82 && event.keyCode != 80) {
    key.classList.remove("playing");
  }
}

function handleKeyDownRecord(event) {
  if (event.keyCode === 82) {
    record = !record;
    let key = document.querySelector(`.key[data-key="82"]`);
    key.classList.toggle("playing");

    if (record) {
      // Réinitialiser les tableaux à chaque démarrage d'enregistrement
      sons = []; // Vider le tableau des sons enregistrés
      interval = []; // Vider le tableau des intervalles
    }
  }

  // Si l'enregistrement est activé, ajouter les touches appuyées et l'heure actuelle
  if (record && event.keyCode !== 82 && event.keyCode !== 80) {
    sons.push(event.keyCode); // Ajouter le code de la touche dans le tableau `sons`
    interval.push(Date.now()); // Ajouter l'heure actuelle dans le tableau `interval`
  }
}

function handleKeyDownPlay(event) {
  if (event.keyCode == 80) {
    play = !play;
    let key = document.querySelector(`.key[data-key="80"]`);
    key.classList.toggle("playing");

    let startTime = interval[0];

    sons.forEach((son, index) => {
      let delay = interval[index] - startTime;
      setTimeout(() => {
        let audio = document.querySelector(`audio[data-key="${son}"]`);
        if (audio) {
          audio.currentTime = 0;
          Handlekey(son, document.querySelector(`.key[data-key="${son}"]`));
          setTimeout(() => {
            let sonAEnlever = document.querySelector(`.key[data-key="${son}"]`);
            sonAEnlever.classList.remove("playing");
          }, 100);
        }
      }, delay);
    });
    let intervalFinal = interval[interval.length - 1] - interval[0];

    //   console.log(intervalFinal);

    setTimeout(() => {
      key.classList.remove("playing");
    }, intervalFinal);
  }
}

