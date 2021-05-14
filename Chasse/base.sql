/* Voici la création complète de ma base de donnée */

/* Supression de la base */
/* Cette ligne est à prendre si l'on veux réinitialiser la base */
DROP DATABASE tresor;

/* Création de la base */
CREATE DATABASE tresor;

/* Entrer dans la base */
USE tresor;

/* Création des tables */
CREATE TABLE classement(
	Id integer AUTO_INCREMENT not null,
	Pseudo varchar(20) not null,
    score integer not null,
	primary key (Id)) engine=innodb;