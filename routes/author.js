const express = require('express')
const router = express.Router()
const Commentaire = require('../models/Commentaire')
const Tag = require('../models/Tag')

//requet accepte que des chiffre '/:id(\\d+)'

// Route /author/commentaire
router.route('/:author/commentaire')
     // Récupération des commentaires d'un auteur spécifique
     .get(async (req, res) => {
        const author = req.params.author;
        const result = await Commentaire.allAuteur(author);
        res.send(result);
    });

module.exports = router
