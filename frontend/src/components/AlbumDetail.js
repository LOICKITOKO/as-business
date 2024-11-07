import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AlbumDetail = () => {
  const { albumId } = useParams(); // Récupérer l'ID de l'album depuis l'URL
  const [album, setAlbum] = useState(null);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    // Récupérer les détails de l'album et ses commentaires
    axios.get(`http://localhost:8000/api/albums/${albumId}/`)
      .then(response => {
        setAlbum(response.data);
        setComments(response.data.comments);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails de l\'album', error);
      });
  }, [albumId]);

  return (
    <div>
      {album ? (
        <div>
          <h1>{album.title}</h1>
          <p>{album.description}</p>
          <h2>Commentaires</h2>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <strong>{comment.user_name} :</strong> {comment.content}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default AlbumDetail;
