const express = require('express')
const router = express.Router()
const Commentaire = require('../models/Commentaire')




// Route /author/commentaire
router.route('/commentaire')
     // Récupération des commentaires d'un auteur spécifique
     .get(async (req, res) => {
        const author = req.query.auteur;
        const result = await Commentaire.allAuteur(author);
        res.send(result);
    });

module.exports = router