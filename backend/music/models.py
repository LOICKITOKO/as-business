from django.db import models
from django.contrib.auth.models import User  # Import pour utiliser le modèle User

class Album(models.Model):
    title = models.CharField(max_length=200)  # Titre de l'album
    artist = models.CharField(max_length=200)  # Nom de l'artiste
    description = models.TextField()  # Description de l'album
    release_date = models.DateField()  # Date de sortie
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Prix de l'album
    cover_image = models.ImageField(upload_to='albums/')  # Image de couverture de l'album
    sales = models.PositiveIntegerField(default=0)  # Nombre de ventes (initialisé à 0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # L'artiste (utilisateur) qui a créé l'album

    def __str__(self):
        return self.title

class Comment(models.Model):
    album = models.ForeignKey(Album, related_name='comments', on_delete=models.CASCADE)
    user_name = models.CharField(max_length=100)  # Nom de l'utilisateur
    content = models.TextField()  # Contenu du commentaire
    created_at = models.DateTimeField(auto_now_add=True)  # Date de création du commentaire
    likes = models.PositiveIntegerField(default=0)  # Nombre de likes sur le commentaire

    def __str__(self):
        return f"Commentaire de {self.user_name} sur {self.album.title}"
