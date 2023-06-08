const express = require('express')
const router = express.Router()
const checkUserExist = require('../middlewares/checkUserExist')
const Article = require('../models/Article')
const Commentaire = require('../models/Commentaire')
const Tag = require('../models/Tag')



// Route /article
router.route('/')

    // Récupération de la liste des utilisateurs
    .get(async (req, res) => {
        const result = await Article.all()
        res.send(result)
    })

    .post
    (async(req, res) => {
    // Création d'une instance de user
    const new_article = new Article(req.body)
    try {
        // Création en base de données via le model
        await new_article.create()

        // Réponse
        res.status(201).json(`L article  ${new_article.titre} à été ajouté`)
    }
    catch (err) {
        console.error('Erreur dans la route', err)

        res.status(500).json('Erreur serveur, Echec de l\'ajout')
    }
    })

// Route /article/[id]

    router.route('/:id(\\d+)')
        // Récupération d'un utilisateur par son ID
        .get(async (req, res) => {
                // Récupération du ID
                const id = req.params.id
                    const result = await Article.find(id)
                    res.send(result)
                })
            
        // Modifier un utilisateur
        .put
        (async(req, res) => {
            // Récupération du ID
            const id = req.params.id

            const new_article = new Article(req.body)
            try {
                // Création en base de données via le model
                await new_article.update(id)

                // Réponse
                res.status(201).json(`L'utilisateur ${new_article.titre} à été modifié`)
            }
            catch (err) {
                console.error('Erreur dans la route', err)

                res.status(500).json('Erreur serveur, Echec de l\'ajout')
            }
        })
    
        // Supprimer un utilisateur
        .delete(async (req, res) => {
            // Récupération du ID
            const id = req.params.id
            const result = await Article.delete(id)

            res.send(result)
        })


// Route /article/commentaire

    router.route('/commentaire')

        // Endpoint pour créer un utilisateur
        .post
            (async(req, res) => {

            // Création d'une instance de user
            const new_commentaire = new Commentaire(req.body)
            try {
                // Création en base de données via le model
                await new_commentaire.create()

                // Réponse
                res.status(201).json(`Le commentaire  #${new_commentaire.content} à été ajouté`)
            }
            catch (err) {
                console.error('Erreur dans la route', err)

                res.status(500).json('Erreur serveur, Echec de l\'ajout')
            }
            })

          
         // Récupération des commentaires d'un auteur spécifique
        .get(async (req, res) => {
            const author = req.query.auteur;
            const result = await Commentaire.allAuteur(author);
            res.send(result);
        });


// Route /article/commentaire/[id]

router.route('/:id(\\d+)/commentaire')

        // Récupération de la liste des utilisateurs
        .get(async (req, res) => {
            const id = req.params.id
            const result = await Commentaire.allArticle(id) 
             res.send(result)
         })

        // Modifier un commentaire
        .put
        (async(req, res) => {
            // Récupération du ID
            const id = req.params.id

            const new_commentaire = new Commentaire(req.body)
            try {
                // Création en base de données via le model
                await new_commentaire.update(id)

                // Réponse
                res.status(201).json(`L'utilisateur ${new_commentaire.auteur} à été modifié`)
            }
            catch (err) {
                console.error('Erreur dans la route', err)

                res.status(500).json('Erreur serveur, Echec de l\'ajout')
            }
        })
    
        // Supprimer un commentaire
        .delete(async (req, res) => {
            // Récupération du ID
            const id = req.params.id
            const result = await Commentaire.delete(id)

            res.send(result)
        })
    


module.exports = router
