# IPSSI Blog API

Ce README fournit des instructions pour configurer et utiliser l'API du blog . L'API permet de créer, afficher, modifier et supprimer des articles, ainsi que de commenter les articles.

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/khartoumsylla/Blog-api.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd Blog-api
   ```

3. Installez les dépendances npm :

   ```bash
   npm install
   ```

4. Installez Nodemon en tant que package global :

   ```bash
   npm install --global nodemon
   ```

5. Créez la base de données en exécutant le script de migration :

   ```bash
   node databases/migrations.js
   ```

## Utilisation

1. Lancez le serveur de développement :

   ```bash
   npm start
   ```

   L'API sera accessible à l'adresse `http://localhost:3000`.

2. Vous pouvez utiliser mon liens [Postman] ([https://www.postman.com/downloads/](https://app.getpostman.com/join-team?invite_code=f81473028c1b55f469f3cddc1a5f2cb2&target_code=56fb766cceac89e8a4940a308902e74c) pour interagir avec l'API. Importez la collection Postman fournie dans le répertoire `Blog-Api` pour obtenir tous les endpoints et leurs détails.

## Endpoints

L'API du blog expose les endpoints suivants :

- `GET /article` : Récupère la liste des articles.
- `POST /article` : Ajoute un article.
- `GET /article/:id` : Récupère un article spécifique en fonction de son ID.
- `PUT /article/:id` : Modifie un article spécifique en fonction de son ID.
- `DELETE /article/:id` : Supprime un article spécifique en fonction de son ID.
- `GET /article/:id/commentaire` : Récupère les commentaires d'un article spécifique en fonction de son ID.
- `GET /author/:auteur/commentaire` : Récupère les commentaires d'un auteur spécifique.
- `POST /article/:id/commentaire` : Ajoute un commentaire à un article spécifique en fonction de son ID.
- `PUT /article/:id/commentaire` : Modifie un commentaire spécifique en fonction de son ID.
- `DELETE /article/:id/commentaire` : Supprime un commentaire spécifique en fonction de son ID.

## Modèles de données

### Article

Un objet d'article comprend les attributs suivants :

- `id` : ID unique de l'article.
- `title` : Titre de l'article.
- `author` : Auteur de l'article.
- `content` : Contenu de l'article.
- `createdAt` : Date de création de l'article.
- `updatedAt` : Date de dernière modification de l'article.
- `visible` : Visibilité de l'article (true pour afficher, false pour masquer).

### Commentaire

Un objet de commentaire comprend les attributs suivants :

- `id` : ID unique du commentaire.
- `articleId` : ID de l'article associé.
- `author` : Auteur du commentaire (nullable).
- `content` : Contenu du commentaire.
- `createdAt` : Date de création du commentaire.
- `updatedAt` : Date de dernière modification du commentaire.

### Tag

Un objet de tag comprend les attributs suivants :

- `id` : ID unique du commentaire.
- `articleId` : ID de l'article associé.
- `tag` : Contenu du tag.



