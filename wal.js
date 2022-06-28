const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);
let message = document.querySelector(".msg");
let contacts = document.querySelector("#contents");
const progressBar = document.getElementById("progress-bar");
let pseudo, email, password, confirmPass, res;
let activity = document.querySelector("#activity");
let messa = document.querySelector("#write_msg");
let mess = messa.value;
let plus = document.getElementById("plus");

function formu() {
  const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (!valid) {
      container.classList.add("error");
      span.textContent = message;
    } else {
      container.classList.remove("error");
      span.textContent = message;
    }
  };

  const pseudoChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
      errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
      pseudo = null;
    } else {
      errorDisplay("pseudo", "", true);
      pseudo = value;
    }
  };

  const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      errorDisplay("email", "Le mail n'est pas valide");
      email = null;
    } else {
      errorDisplay("email", "", true);
      email = value;
    }
  };

  const passwordChecker = (value) => {
    progressBar.classList = "";

    if (
      !value.match(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      )
    ) {
      errorDisplay(
        "password",
        "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial"
      );
      progressBar.classList.add("progressRed");
      password = null;
    } else if (value.length < 12) {
      progressBar.classList.add("progressBlue");
      errorDisplay("password", "", true);
      password = value;
    } else {
      progressBar.classList.add("progressGreen");
      errorDisplay("password", "", true);
      password = value;
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "pseudo":
          pseudoChecker(e.target.value);
          break;
        case "email":
          emailChecker(e.target.value);
          break;
        case "password":
          passwordChecker(e.target.value);
          break;

        default:
          null;
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (pseudo && email && password) {
      const data = {
        pseudo,
        email,
        password,
      };

      console.log(data);

      form.style.display = "none";
      activity.style.display = "block";
      inscription();
      activ();

      pseudo = null;
      email = null;
      password = null;
    } else {
      form.style.visibility = "visible";
      alert("Remplissez bien les champs");
    }
  });
}
formu();
let activation1 = document.getElementById("activation");

let classActivation = document.querySelector(".activation-container");
let button = document.querySelector("#button");
async function inscription() {
  let inscrip = `https://trankillprojets.fr/wal/wal.php?inscription&identite=${pseudo}&mail=${email}`;

  await fetch(inscrip)
    .then((res) => res.json())
    .then((res) => {
      if (res.etat.reponse == 1) {
        alert(res.etat.message);
      } else {
        alert("Vous etes déja inscrit sur WAL");
      }
    });
}
let identifiant;
function activ() {
  activation1.addEventListener("input", (e) => {
    identifiant = e.target.value;
  });
  activity.style.display = "none";
  classActivation.style.display = "grid";
  button.addEventListener("click", () => {
    console.log(identifiant);

    fetch(`https://trankillprojets.fr/wal/wal.php?activation=${identifiant}`)
      .then((rep) => rep.json())
      .then((rep) => {
        if (rep.etat.reponse == 1) {
          activity.style.display = "block";
          classActivation.style.display = "none";
          alert(rep.etat.message);
          para();
        } else {
          alert("code invalide");
          classActivation.style.display = "grid";
          activity.style.display = "none";
        }
      });
  });
}
function para() {
  let para = `https://trankillprojets.fr/wal/wal.php?information&identifiant=${identifiant}`;
  fetch(para)
    .then((repo) => repo.json())
    .then((repo) => {
      console.log(JSON.stringify(repo));
    });
}

function relation() {
  let rela = `https://trankillprojets.fr/wal/wal.php?lier&identifiant=${identifiant}&mail=${email}`;
  plus.addEventListener("click", () => {
    fetch(rela)
      .then((rep) => rep.json())
      .then((rep) => {
        if ((rep.etat.reponse = 1)) {
          activity.innerHTML = `
          <div class ='rel>
          <h3>pseudo:<input type='text' value=''></h3>
          </div>
          `;
          console.log(JSON.stringify(rep));
          const cell = document.querySelector("table").insertRow(0);

          cell.insertCell(0, 1, 2);
        } else {
          alert("L'utilisateur n'est pas inscrit");
        }
      });
  });
}
relation();
function ecrireMessage(identifiant, relation, message) {
  var service =
    "https://www.trankillprojets.fr/wal/wal.php?identifiant=" +
    identifiant +
    "&ecrire&relation=" +
    relation +
    "&message=" +
    message;

  // On contacte le service
  fetch(service)
    .then((reponse) => reponse.json())
    .then((json) => {
      if (json.etat.reponse == 1) {
      }
    })

    .catch((erreur) => console.log(erreur));
}
