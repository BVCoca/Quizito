/* Création d'un tableau qui contient les questions, les choix de réponses et la réponse à la question */
let questionTab = [
  {
    question:
      "1. Un colibri d'Elena pèse aussi lourd qu'une pièce de 20 centimes d'euros. Vrai ou faux ?",
    reponse: {
      a: "Vrai",
      b: "Faux",
    },
    reponseCorrecte: "b",
    /* Explications
Cet oiseau pèse en réalité moins lourd qu’une pièce de 5 centimes d'euros, soit environ 2 g pour une taille de 5 cm. */
  },
  {
    question:
      "2. Au XVIIe siècle, les carottes n'étaient pas orange. Vrai ou faux ?",
    reponse: {
      a: "Vrai",
      b: "Faux",
    },
    reponseCorrecte: "a",
    /* À cette époque, les carottes en Europe étaient majoritairement violettes. Depuis, la variété orange s’est imposée comme la plus populaire. */
  },
  {
    question: `3. Brad Pitt a été interdit de territoire en Chine pendant 17 ans suite au film "Sept ans au Tibet". Vrai ou faux ?"`,
    reponse: {
      a: "Vrai",
      b: "Faux",
    },
    reponseCorrecte: "a",
    /* Brad Pitt n’est aujourd’hui plus interdit de visite en Chine, l’interdiction a été levée en 2014. Cependant, il a bien été interdit de séjour pendant 17 ans. */
  },
  {
    question: `4. Les huîtres peuvent changer de sexe au moment de l'accouplement. Vrai ou faux ?`,
    reponse: {
      a: "Vrai",
      b: "Faux",
    },
    reponseCorrecte: "a",
    /* Une huitre peut ainsi changer de sexe une fois par période de reproduction. Plus l’huitre est jeune, plus elle est susceptible de changer de sexe. */
  },
  {
    question: `5. Le corps humain d'un adulte possède 119 os. Vrai ou faux ?`,
    reponse: {
      a: "Vrai",
      b: "Faux",
    },
    reponseCorrecte: "b",
    /* Le corps humain d’un adulte possède 206 os. */
  },
  {
    question: `6. Il est impossible de rêver et ronfler en même temps. Vrai ou faux ?`,
    reponse: {
      a: "Vrai",
      b: "Faux",
    },
    reponseCorrecte: "a",
    /* Le ronflement empêche le dormeur d’atteindre les phases profondes et paradoxales du sommeil. Les cycles de sommeil étant perturbés, la capacité à rêver peut également l’être. */
  },
  {
    question: `7. e chocolat est toxique pour les chiens. Vrai ou faux ?`,
    reponse: {
      a: "Vrai",
      b: "Faux",
    },
    reponseCorrecte: "a",
    /* L'empoisonnement au chocolat provoque une hyperactivité et dérègle le rythme cardiaque. */
  },
  {
    question: `8. Un être humain marche en moyenne l'équivalent d'un tour de la Terre tout au long de sa vie. Vrai ou faux ?`,
    reponse: {
      a: "Vrai",
      b: "Faux",
    },
    reponseCorrecte: "b",
    /* En réalité, c'est environ 3 fois le tour de la terre soit 120 000 km, et donc environ 4 km par jour. */
  },
  {
    question: `9. Une mouche bat des ailes 12.000 fois par minute. Vrai ou faux ?`,
    reponse: {
      a: "Vrai",
      b: "Faux",
    },
    reponseCorrecte: "a",
    /*  */
  },
  {
    question: `10. A l'Euromillions, vous avez 1 chance sur 39 millions de remporter le gros lot. Vrai ou faux ?`,
    reponse: {
      a: "Vrai",
      b: "Faux",
    },
    reponseCorrecte: "b",
    /* C’est encore plus dur, car c’est 1 chance sur 139 millions... Bonne chance ! */
  },
];

/* On crée des variables pour sélectionner les éléments du DOM */
let quizContainer = document.getElementById("question");
let resultsContainer = document.getElementById("reponse");
let submitButton = document.getElementById("submit");

/* Fonction principale (celle qui génére la quiz) */

function generateQuiz(
  questions,
  quizContainer,
  resultsContainer,
  submitButton
) {
  /* Fonction pour afficher les questions */
  function showQuestions(questions, quizContainer) {
    /* On crée des variables, un tableau pour afficher toutes les questions et leurs réponses du tableau principal */
    let sortie = [];
    let reponse = null;

    /* Pour chaque questions */
    for (let index = 0; index < questions.length; index++) {
      /* On remet le tableau à zéro */
      reponse = [];

      /* Pour chaque réponses */
      for (letter in questions[index].reponse) {
        /*  On rajoute un input de type radio */
        reponse.push(
          `
            <label>
                <input type="radio" name="question${index}" value="${letter}">
                ${letter} : ${questions[index].reponse[letter]}
            </label>
            `
        );
      }

      /*   Puis on rajoute la question et la réponse dans le tableau de sortie */
      sortie.push(
        `
        <div id="bodyQuestion">
          <div class="question">
              ${questions[index].question}
          </div>
          <div class="reponse">
          ${reponse.join("")}
          </div>
        </div>  
          `
      );
    }

    /*  On convertit le tableau de sortie en chaine de caractère */
    quizContainer.innerHTML = sortie.join("");
  }

  function showResults(questions, quizContainer, resultsContainer) {
    /* On ajoute les réponses dans le quiz */
    let answerContainers = quizContainer.querySelectorAll(".reponse");

    /* On crée des variables une pour récupérer la réponse de l'utilisateur et l'autre pour compter le nombre de bonnes réponses */
    let reponseUtilisateur = "";
    let numCorrect = 0;

    /* Pour chaque questions */
    for (let index = 0; index < questions.length; index++) {
      /* On cherche la réponse sélectionnée par l'utilisateur */
      reponseUtilisateur = (
        answerContainers[index].querySelector(
          "input[name=question" + index + "]:checked"
        ) || {}
      ).value;

      /* Si elle est correcte donc par rapport au tableau principal */
      if (reponseUtilisateur === questions[index].reponseCorrecte) {
        /* On ajoute 1 au compteur de bonne réponse */
        numCorrect++;

        /* On ajoute un indicateur vrai pour l'utilisateur */
        answerContainers[index].style.color = "lightgreen";
      } else {
        /* Si la réponse est fausse */
        /* On ajoute un indicateur faux pour l'utilisateur */
        answerContainers[index].style.color = "red";
      }
    }

    /* On affiche le total de bonnes réponses */
    resultsContainer.innerHTML = `<div id="total">${numCorrect} sur ${questions.length}</div>`;

    if (numCorrect >= 7) {
      resultsContainer.innerHTML = `<div id="total">Plus de la moyenne ! ${numCorrect} sur ${questions.length}</div>`;
      resultsContainer.style.backgroundColor = "lightgreen";
    } else {
      if (numCorrect >= 5 && numCorrect <= 6) {
        resultsContainer.innerHTML = `<div id="total">Dans la moyenne. ${numCorrect} sur ${questions.length}</div>`;
        resultsContainer.style.backgroundColor = "orange";
      } else {
        if (numCorrect <= 4) {
          resultsContainer.innerHTML = `<div id="total">Pas suffisant. ${numCorrect} sur ${questions.length}</div>`;
          resultsContainer.style.backgroundColor = "red";
        }
      }
    }
  }

  /* Affichage des questions */
  showQuestions(questions, quizContainer);

  /* On envoie le résultat */
  submitButton.onclick = function () {
    showResults(questions, quizContainer, resultsContainer);
  };
}

/* On appelle la fonction pour générer le quiz */
generateQuiz(questionTab, quizContainer, resultsContainer, submitButton);

/* Création du bouton pour reset le quiz */

let divReset = document.querySelector("#divReset");

divReset.innerHTML = `<button id="reset">
Reset le quiz
</button>`;

let reset = document.querySelector("#reset");
reset.onclick = function () {
  window.location.reload();
};
