from django.contrib import admin
from .models import Album, Comment

class AlbumAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'release_date', 'price', 'sales')  # Colonnes à afficher dans la liste des albums

class CommentAdmin(admin.ModelAdmin):
    list_display = ('album', 'user_name', 'created_at', 'likes')  # Colonnes à afficher dans la liste des commentaires

# Enregistrer les modèles dans l'admin
admin.site.register(Album, AlbumAdmin)
admin.site.register(Comment, CommentAdmin)
