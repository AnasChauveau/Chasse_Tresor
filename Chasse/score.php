<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="img/bateau.ico">
    <title>Score</title>
</head>
<body id="scores">
    <header>

        <a href="index.html">
            <img class="bord" src="img/accueil.png">
        </a>

        <a class="menu" href="jeu.html">
            <img class="bord" src="img/jouer2.png">
        </a>

        <a href="spoils.html">
            <img class="bord" src="img/spoils2.png">
        </a>

        <a href="regles.html">
            <img class="bord" src="img/regles2.png">
        </a>

    </header>
    <?php
    // connexion à la base de données //
    include 'connexion.php';
    // requête //
    $afficher = "SELECT pseudo, score FROM classement Order BY score DESC;"; 
    // exécution de la requête //
    $result = $connexion->query($afficher);
    
    ?>
    <div id="positionTable">
    <div id="derouleScore">
        <!-- Création du tableau contenant les pseudos et scores (affichage de la requête) -->
        <table id="tableScore" border=1 cellspacing=0 border=1 cellspacing=0 cellpadding=8>
            
                <tr>
                    <td class="infoT">Pseudonyme</td>
                    <td class="infoT">Score</td>
                </tr>
            
            <?php 
                while ($row = $result->fetch()) {
                echo ("<tr> <td class='info'>" . $row['pseudo'] ."</td>"); // Afficher les pseudos //
                echo ("<td class='info'>" . $row['score'] ."</td> </tr>"); // Afficher les scores //
                }    
            ?>
            
        </table>
    </div>
    </div>
</body>
</html>