// Version 1.0 05/05/2021
// Création de la fonction Table qui crée l'aspect graphique du tableau
// Création de la fonction Tableau2D qui crée l'aspect logique du tableau
// Création de la fonction Aléatoire qui prend un chiffre au hasard par rapport à un paramaitre max

// Version 1.1 06/05/2021
// Créations des tableaux :
// listeEvent : contient tous les événements
// pointEvent : contient les variations de points de chaque élément
// Créations des fonctions :
// affectationEvent : affectant les événements et leurs points aux tableaux logiques (table_logique et table_point)
// choix :  qui fait le lien entre les tableaux logiques et le tableau graphique, il gère tout le processus du jeu

// Version 1.2 07/05/2021
// Création de la fonction :
// DejaVue : qui empêche l'utilisateur de cliquer 2 fois sur la même case
// Améliorations des fonctions (Ajout) :
// affectationEvent et choix
// Travaille sur PHP (Mysqli)

// Version 1.3 08/05/2021
// Travaille sur PHP (Mysqli)
// Vérifications et corrections des différentes fonctions
// Ajouts de commentaires

// Version 1.4 12/05/2021 (Version Finale)
// Suppressions de Mysqli et reformulation en PDO
// Suppressions des phrases d'event brut dans la listEvent
// Création de la class Event
// Créations des events en tant qu'objet
// recréation de la listEvent avec les variables contenants les objets
// Adaptation à l'objet de la fonction affectationEvent
// Ajout dans les fonctions:
// affectationEvent et choix,
// pour rentre automatique l'entré des jours dans la chaine d'event (tu gagneras '5' jours)
// Liste d'affichage des scores rendu responsive.


// Tableau2D logique //
function Tableau2D(x, y){
    let table = new Array(x);
    for (let i = 0; i < x; i++){
        table[i] = new Array(y);
    }
    return table
}

// Tableau Graphique //
function Table(ligne, colonne, emplacement){
    let id = "";
    texte += "<table id='tableau'>";
    // construction du tableau par ligne puis par colonne
    for (let i = 0; i < ligne; i++){
        texte += "<tr>";
        for (let y = 0; y < colonne; y++){
            id = i+"-"+y;       // création d'un id par case
            texte += "<td class='CaseJ' onclick='choix(this.id);' id="+id+"></td>";
        }
        texte += "</tr>";
    }
    texte += "</table>";
    document.getElementById(emplacement).innerHTML = texte; // afficher le tableau
}

function Aleatoire(max) { // Chiffre aléatoire par raport au parametre max
    return Math.floor(Math.random() * max + 1);
}

class Event{ // classe permetant de crée des événements
    phrase = "";
    point = 0;
    // Construction de la classe
    constructor(phrase, point){
        this.phrase = phrase;
        this.point = point;
    }
    // méthode sur l'event
    get Phrase() {
        return this.phrase;
    }
    set Phrase(nouvellePhrase) {
        this.phrase = nouvellePhrase;
    }
    // méthode sur le point
    get Point() {
        return this.point;
    }
    set Point(nouveauPoint) {
        this.point = nouveauPoint;
    }
}

function affectationEvent(listeEvent, table_logique, ligne, colonne){
    let nb_event = listeEvent.length; // nombre d'evenement
    let event = "";
    for (let y = 0; y < nb_event; y++){
        num = Aleatoire(ligne -1); // position aléatoire de la ligne
        num2 = Aleatoire(colonne -1); // position aléatoire de la colonne

        while (table_logique[num][num2] != null){ // si la case du tableau logique est déjà remplis, chercher une autre
            num = Aleatoire(ligne -1);
            num2 = Aleatoire(colonne -1);
        }
        event = listeEvent[y];
        if (event.Point < 0 || event.Point > 0){ // si il y a un chiffre à metre dans la chaine de l'event
            let change1 = event.Phrase.split("@");
            let change2 = change1[1];
            change2 = String(event.Point+change2);
            change1 = change1[0]+change2;
            event.Phrase = change1; // je remplace le @ par le chiffre correspondant
        }

        table_logique[num][num2] = event.Phrase; // affecter l'évenement à une case
        table_point[num][num2] = event.Point; // affecter les points d'évenement à une case
        if (y == nb_event-2){
            console.log("Defaite =",num,num2); // position Victoire
        }
    }
    console.log("Victoire =",num,num2); // position Victoire
}

function dejaVue(tableId, id){
    let compteur = 0;
    for(let i = 0; i < tableId.length; i++){
        if(id == tableId[i]){ // si l'id est déjà présente alors compteur += 1
            compteur += 1;
        }
    }
    return compteur
}

function choix(id) { // il prend l'id de la case sélectionné
    if(partie != true){ // si il a victoire partie = true, et donc elle est fini
        document.getElementById(id).style.opacity="80%";
        let score = "";
        let leScore = "";
        let splitId = id.split("-") // retire le - séparant le chiffre ligne et colonne
        let table_log = table_logique[splitId[0]][splitId[1]]; // utilise le premier et dernier caractère sois le num de la ligne et de la colonne
        let table_poi = table_point[splitId[0]][splitId[1]];

        if(dejaVue(tableId, id) == 0){
            tableId.push(id);
            if(table_log != null){ // si la case contient un evenement
                score = document.getElementById('affScore').innerHTML.split(':'); // on transforme la chaine de caractère en tableau
                leScore = Number(score[1]); // on prend le score en chiffre pour le changer

                if(table_poi == "Victoire"){  // si c'est la case victoire
                    document.getElementById(id).style.background = "yellow";
                    document.getElementById("score").value = leScore;
                    document.getElementById("pseudo").style.display = "inline"; // page Victoire apparait (formulaire)
                    document.getElementById("score").style.display = "inline"; // page Victoire apparait (formulaire)
                    document.getElementById("valider").style.display = "inline"; // page Victoire apparait (formulaire)
                    partie = true; // partie terminé

                }else if(table_poi < 0){  // si la case est négative (malus)
                    document.getElementById(id).style.background = "red";
                    leScore += table_poi; // affectation des points au score


                }else{  // si la case est positive (bonus)
                    document.getElementById(id).style.background = "green";
                    leScore += table_poi; // affectation des points au score
                }

                if(table_poi == "Defaite" || leScore <= 0){  // si c'est la case défaite ou si le temps est écoulé
                    document.getElementById(id).style.background = "black";
                    document.getElementById(id).style.opacity="100%";
                    leScore = 0;
                    document.getElementById("defaite").style.display = "inline"; // page défaite apparait 
                    partie = true; // partie terminé
                }

                score[score.length-1] = String(" "+leScore); // on concatène le nouveau score à la chaine de caractère
                document.getElementById('affScore').innerHTML = score.join(':'); // on retransforme le tableau en chaine de caractère
                table_log = table_log.replace(/-/g, ""); // retire le '-' de la chaine de caractère pour évité sa (tu as perdu -5 jours)
                document.getElementById("txtEvent").innerHTML = table_log; // on affiche l'évenement qui correspond

            }else{
                document.getElementById(id).style.background = "#414141";
                document.getElementById("txtEvent").innerHTML = "Rien par ici, c'est vraiment dommage ...";
                
            }
        }
    }   
}

    // Malus //
    let E0 = new Event("Tu as cassé ton compas (boussole) sous le coup de la colère, tu as perdu @ jours !", -2);
    let E1 = new Event("Tu t'es assis sur une vipère et elle t'a mordu, tu metras @ jours à te remaitre de son poison !", -5);
    let E2 = new Event("Un orage surgit et cause des dommages à ton navire, tu metras @ jours à le réparer !", -7);
    let E3 = new Event("Tu as crus voir la 'MORT' dans la forêt et tu as les chocottes, tu te cacheras durant @ jours en priant !", -8);
    let E4 = new Event("La nuit est tomber plus vite que prévu, tu t'enfonces dans la forêt et te perds, tu perdras @ jours à en sortir !", -4);
    let E5 = new Event("Tu viens de renverser ta dernière gourde d'eau, tu perdras @ jour à retourner au bateau chercher de l'eau !", -1);
    let E6 = new Event("Tu t'es fait traquer par un homme qui penser que tu étais un sanglier, tu perdras @ jours à cause de ton traumatisme !", -5);
    let E7 = new Event("Le pire est arrivé, tu viens de casser ta pelle, il te faudra @ jours de plus pour creuser !", -6);
    let E8 = new Event("Tu t'es dit que courir t'aiderait à trouver le trésor dans les temps, une entorse, @ jours sans marcher ...", -10);

    // Bonus //
    let E9 = new Event("Tu viens de trouver un indice sérieux, il te fera gagner @ jours !", 3);
    let E10 = new Event("Tu as trouvé une arme, un avantage en cas d'obstacle qui te fera gagner @ jours !", 2);
    let E11 = new Event("Tu es tombé sur des plantes médicinales, très utile en cas de blessure, tu gagnes @ jour !", 1);
    let E12 = new Event("Quelle chance tu as trouvé une longue vue, dommage qu'elle n'a pas de vert ! (elle ne sert à rien)", 0);
    let E13 = new Event("Pas, mal tu viens de trouver une pelle de qualité, elle te fera gagner @ jours !", 2);
    let E14 = new Event("Tu viens de croiser un cheval et tu as décidé que ce serait le tien, 'MUSTANG' a du mal à obéir, mais il te fera gagner @ jours !", 2);
    let E15 = new Event("Tu croises des voyageurs et tu te dis que leurs matériels te seraient utiles, tu gagnes @ jour en les dépouillant (honte à toi !)", 1);
    let E16 = new Event("Tu dois être sacrément chanceux pour trouver une carte possédant des indices sur le trésor que tu cherches, elle te fera gagner @ jours !", 3);
    let E17 = new Event("Tu trouves une grotte, tu vas pouvoir te reposer et gagner @ jour !", 1);

    // Défaite //
    let E18 = new Event("La 'MORT' est venue te chercher, ne pose pas de question, c'est la vie ...", "Defaite");

    // Victoire //
    let E19 = new Event("PAS CROYABLE !!! Tu viens de trouver le légendaire trésor, te voilà vivant et riche !!!,", "Victoire");

// liste des Evenements possible //
// Malus: 0-8  Bonus: 9-17  Mort: 18  Victoire: 19 //
let listeEvent = [
    // Malus //
    E0,E1,E2,E3,E4,E5,E6,E7,E8,
    // Bonus //
    E9,E10,E11,E12,E13,E14,E15,E16,E17,
    // Mort //
    E18,
    // Victoire //
    E19
];

// Nombre de ligne et de colonne du tableau //
let L = 10;
let C = 10;

// Lancement du programme //
let texte = "";
let table_logique = Tableau2D(L,C);        // Tableau logique des Evenements
let table_point = Tableau2D(L, C);         // Tableau logique des Points
let table_physique = Table(L, C, "carte"); // Tableau Graphique
let affectation = affectationEvent(listeEvent, table_logique, L, C); // lien entre table logique et grafique, affectation des events
let tableId = [];
let partie = false;