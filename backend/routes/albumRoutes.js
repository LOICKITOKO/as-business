// backend/routes/albumRoutes.js
const express = require('express');
const router = express.Router();
const Album = require('../models/Album'); // Importation du modèle Album

// Route pour obtenir tous les albums
router.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find(); // Récupérer tous les albums de la base de données
    res.json(albums); // Retourner les albums en format JSON
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des albums' });
  }
});

module.exports = router;
