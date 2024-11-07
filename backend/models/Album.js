// backend/models/Album.js
const mongoose = require('mongoose');

// Création du schéma pour les albums
const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

// Création du modèle Album basé sur le schéma
const Album = mongoose.model('Album', albumSchema);

module.exports = Album; // Exportation du modèle pour pouvoir l'utiliser ailleurs
