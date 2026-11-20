# Carnet d'histoire

Quiz d'histoire des pays traversés pendant mon voyage d'un an, à ouvrir sur iPhone et à ajouter à l'écran d'accueil.

- `index.html` : l'appli (quiz, révision espacée, statistiques, cartes).
- `pays.json` : les pays, leurs périodes et les questions (une ligne par pays).
- `sw.js` : permet d'utiliser l'appli sans connexion.

La progression est enregistrée sur le téléphone, pas dans ce dépôt. Menu ☰ → Sauvegarde pour l'exporter.

## Carte de mes pays (`carte/`)

Petit site à part, à l'adresse `…/carnet-histoire/carte/`, pour colorier sur une carte du monde les pays visités et prévus.

- `carte/index.html` : la carte (zoom, liste, bilan par continent, sauvegarde par code CARTE1).
- `carte/mes-pays.json` : la liste de départ des pays visités et prévus (codes à 3 lettres). Ce qui est coché dans l'appli passe avant.
- `carte/monde.json` : le fond de carte (Natural Earth, domaine public), déjà projeté.
