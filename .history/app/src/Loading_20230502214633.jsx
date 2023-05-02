import "./Loading.css";
import { useState, useEffect } from "react";

function LoadingPage() {

  let gameDuration = 20000; // Durée du jeu en millisecondes
  // const [remainingTime, setRemainingTime] = useState(gameDuration / 1000); // Durée du jeu en millisecondes
  let [remainingTime, setRemainingTime] = useState(10); // Durée du jeu en millisecondes
  let [maxSquares, setMaxSquares] = useState(20); // Nombre maximum de carrés à faire disparaître
  let [score, setScore] = useState(0); // Score du joueur
  var [square, setSquare] = useState(null);
    var gm = document.getElementById("game")

  useEffect(() => {
    setSquare(document.getElementById("square"));
  }, []);

  useEffect(() => {
    if (square) {
      // Initialisation de la position du carré
      var xPos = Math.floor(Math.random() * (gm.clientWidth - 50));
      var yPos = Math.floor(Math.random() * (gm.clientHeight- 50));
      square.style.left = xPos + "px";
      square.style.top = yPos + "px";
      square.onclick = function () {
        square.style.display = "none";
        // setScore(score + 1);
        score++;
        // setMaxSquares(maxSquares - 1);
        // Déplacer le carré à un nouvel endroit aléatoire
        xPos = Math.floor(Math.random() * (gm.clientWidth - 50));
        yPos = Math.floor(Math.random() * (gm.clientHeight - 50));
        square.style.left = xPos + "px";
        square.style.top = yPos + "px";
        square.style.display = "block";
      };
    }
  }, [square]);
  useEffect(() => {
    // Compte à rebours
    const timer = document.createElement("div");
    timer.style.fontSize = "30px";
    timer.style.textAlign = "center";
    // document.body.insertBefore(timer, document.getElementById("game"));
    document
      .getElementById("gm")
      ?.insertBefore(timer, document.getElementById("square"));
    setRemainingTime(gameDuration / 1000);

    const countdownInterval = setInterval(() => {
      remainingTime--;
      timer.innerHTML = "Temps restant : " + remainingTime + " s";
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        // timer.style.display = "none";
        // alert("Votre score : " + score);
      }
      if (remainingTime === 0) {
        clearInterval(countdownInterval);
        if (score >= 8) {
          window.location.href = "./";
        } else {
          alert(
            "Désolé, veuillez posez votre main sur la souris pendant la phase de collecte de données: et essayer de jouez au mini-jeu pendant cette collecte."
          );
          // location.reload();
        }
      }
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [gameDuration, score]);

  return (
    // <>
    <div className="loading-page">
      <div id="title">
        <h1>Bienvenue dans mon mini-jeu !</h1>
        <p>
          Cliquez sur le carré pour le faire disparaître. Il réapparaîtra à un
          endroit aléatoire sur la page jusqu'à la fin des 20 secondes !
        </p>
      </div>
      <div id="game">
        <div id="gm">
          <div id="square"></div>
        </div>
      </div>
    </div>
    // </>
  );
}
export default LoadingPage;
