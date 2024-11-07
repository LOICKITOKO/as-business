import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Faire une requête GET pour récupérer tous les albums
    axios.get('http://localhost:8000/api/albums/')
      .then(response => {
        setAlbums(response.data);  // Assigner la réponse dans l'état
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la récupération des albums', error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des Albums</h1>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <a href={`/albums/${album.id}`}>{album.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
