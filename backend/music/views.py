from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Album, Comment
from .forms import AlbumForm

# Afficher la liste des albums
def album_list(request):
    albums = Album.objects.all()  # Récupère tous les albums de la base de données
    return render(request, 'music/album_list.html', {'albums': albums})

# Afficher les détails d'un album et ses commentaires
def album_detail(request, album_id):
    album = get_object_or_404(Album, id=album_id)  # Récupère l'album ou renvoie une 404
    comments = album.comments.all()  # Récupère tous les commentaires liés à cet album

    # Gérer l'ajout d'un nouveau commentaire
    if request.method == 'POST':
        user_name = request.POST.get('user_name')
        content = request.POST.get('content')
        if user_name and content:
            Comment.objects.create(album=album, user_name=user_name, content=content)
            return redirect('album_detail', album_id=album.id)  # Redirige pour rafraîchir la page

    return render(request, 'music/album_detail.html', {'album': album, 'comments': comments})

# Ajouter un nouvel album
@login_required
def add_album(request):
    if request.method == 'POST':
        form = AlbumForm(request.POST, request.FILES)
        if form.is_valid():
            album = form.save(commit=False)
            album.user = request.user  # Assigne l'utilisateur connecté comme l'artiste
            album.save()
            return redirect('album_list')  # Redirection vers la liste des albums
    else:
        form = AlbumForm()
    return render(request, 'music/add_album.html', {'form': form})

# Modifier un album
@login_required
def edit_album(request, album_id):
    album = get_object_or_404(Album, id=album_id)

    # Vérifie si l'utilisateur connecté est l'artiste de l'album
    if album.user != request.user:
        return redirect('album_list')

    if request.method == 'POST':
        form = AlbumForm(request.POST, request.FILES, instance=album)
        if form.is_valid():
            form.save()
            return redirect('album_detail', album_id=album.id)  # Redirige vers l'album modifié
    else:
        form = AlbumForm(instance=album)
    return render(request, 'music/edit_album.html', {'form': form, 'album': album})

# Supprimer un album
@login_required
def delete_album(request, album_id):
    album = get_object_or_404(Album, id=album_id)

    # Vérifie si l'utilisateur connecté est l'artiste de l'album
    if album.user != request.user:
        return redirect('album_list')

    # Si la méthode est POST, on supprime l'album
    if request.method == 'POST':
        album.delete()
        return redirect('album_list')  # Redirige vers la liste des albums après suppression

    # Si la méthode n'est pas POST, on affiche la page de confirmation
    return render(request, 'music/delete_album.html', {'album': album})
