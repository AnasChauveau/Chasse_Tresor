<?php

// 1. Récupération/contrôle des données
if(!isset($_POST["pseudo"])) die ("Pseudo absent");
if(!isset($_POST["score"])) die ("Erreur de score");

$pseudo = $_POST["pseudo"];
$score = $_POST["score"];

echo "pseudo: $pseudo<br><br>";
echo "score: $score";

// 2. Se connecter à la base
// Je récupère la connexion de connexion.php (Mysqli):
try{
    include 'connexion.php';

    // 3. Bis Causer UTF8 avec MySQL
    $res = $connexion->query("SET NAMES UTF8");

    // 4. Création de la requête
    $req = $connexion->prepare("INSERT INTO classement (pseudo, score) VALUES (:pseudo, :score)");
    $req->bindParam(':pseudo',$pseudo);
    $req->bindParam(':score',$score);

    // 5. Exécution de la requête
    $req->execute(); // Exécute la requête
}catch (Exception $e){
    die ("Erreur grave : " . $e->getMessage());
}

// 6. Retour vers le classement
header ("location:score.php?");

?>