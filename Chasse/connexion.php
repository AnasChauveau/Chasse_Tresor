<?php
// Je crée une variable pour chaque info de connexion pour un changement rapide et intuitif //
$serveur = "127.0.0.1";
$id = "root";
$mdp = "root";
$base = "tresor";

// Voici la connexion mysqli à la base de données //
// (Nous avons fait très peu de PDO)
// $connexion = new mysqli ($serveur, $id, $mdp, $base); //
try{
    $connexion = new PDO("mysql:host=$serveur;dbname=$base;", $id, $mdp);
} catch (Exception $e) {
    echo 'Échec lors de la connexion : ' . $e->getMessage();
}

?>