import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAlbum, setNewAlbum] = useState({ title: '', description: '', price: '' });

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/albums');
        setAlbums(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des albums', error);
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const handleAddAlbum = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/albums', newAlbum);
      setAlbums([...albums, response.data]);
      setNewAlbum({ title: '', description: '', price: '' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'album', error);
    }
  };

  const handleDeleteAlbum = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/albums/${id}`);
      setAlbums(albums.filter(album => album._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'album', error);
    }
  };

  const handleEditAlbum = async (id) => {
    const title = prompt('Entrez le nouveau titre:');
    const description = prompt('Entrez la nouvelle description:');
    const price = prompt('Entrez le nouveau prix:');
    try {
      const updatedAlbum = { title, description, price };
      const response = await axios.put(`http://localhost:5000/api/albums/${id}`, updatedAlbum);
      setAlbums(albums.map(album => (album._id === id ? response.data : album)));
    } catch (error) {
      console.error('Erreur lors de la modification de l\'album', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Liste des Albums</h1>
      <form onSubmit={handleAddAlbum}>
        <input 
          type="text" 
          placeholder="Titre" 
          value={newAlbum.title} 
          onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={newAlbum.description} 
          onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })} 
        />
        <input 
          type="number" 
          placeholder="Prix" 
          value={newAlbum.price} 
          onChange={(e) => setNewAlbum({ ...newAlbum, price: e.target.value })} 
        />
        <button type="submit">Ajouter un Album</button>
      </form>
      <ul>
        {albums.map((album) => (
          <li key={album._id} className="album-card">
            <h2>{album.title}</h2>
            <p>{album.description}</p>
            <p className="price">{album.price} €</p>
            <button onClick={() => handleEditAlbum(album._id)}>Modifier</button>
            <button onClick={() => handleDeleteAlbum(album._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
