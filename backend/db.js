const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connexion à la base de données réussie'))
.catch((err) => console.log('Erreur de connexion à la base de données:', err));
