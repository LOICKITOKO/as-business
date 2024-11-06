from django.urls import path
from . import views

urlpatterns = [
    path('albums/', views.album_list, name='album_list'),  # Liste des albums
    path('albums/<int:album_id>/', views.album_detail, name='album_detail'),  # Détails d'un album
    path('comment/like/<int:comment_id>/', views.like_comment, name='like_comment'),  # Pour liker un commentaire
    
    # Routes pour ajouter, modifier, supprimer des albums
    path('add/', views.add_album, name='add_album'),  # Ajouter un album
    path('edit/<int:album_id>/', views.edit_album, name='edit_album'),  # Modifier un album
    path('delete/<int:album_id>/', views.delete_album, name='delete_album'),  # Supprimer un album
]
