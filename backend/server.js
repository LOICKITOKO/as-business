const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/albumsDB')
.then(() => console.log('Connexion à MongoDB réussie'))
.catch((err) => console.log('Erreur de connexion à MongoDB:', err));

// Middleware pour pouvoir lire les requêtes JSON
app.use(express.json());
app.use(cors()); // Active CORS pour permettre à ton frontend d'interagir avec l'API

// Schéma de l'album (assurez-vous que ce schéma est bien défini)
const albumSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number
});

const Album = mongoose.model('Album', albumSchema);

// Route pour récupérer tous les albums (GET)
app.get('/api/albums', async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des albums' });
  }
});

// Route pour ajouter un album (POST)
app.post('/api/albums', async (req, res) => {
  const { title, description, price } = req.body;
  const newAlbum = new Album({ title, description, price });
  try {
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'album' });
  }
});

// Route pour mettre à jour un album (PUT)
app.put('/api/albums/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  try {
    const album = await Album.findByIdAndUpdate(id, { title, description, price }, { new: true });
    if (!album) {
      return res.status(404).json({ message: 'Album non trouvé' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'album' });
  }
});

// Route pour supprimer un album (DELETE)
app.delete('/api/albums/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return res.status(404).json({ message: 'Album non trouvé' });
    }
    res.json({ message: 'Album supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'album' });
  }
});

// Démarrer le serveur sur le port 5000
app.listen(5000, () => {
  console.log('Serveur démarré sur http://localhost:5000');
});
