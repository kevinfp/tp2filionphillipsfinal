//const http = require('http');
//const fichierS = require('fs');

//Modules installer
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const idObjet = require('mongodb').ObjectID
const cheminDacces = require('path');
const expressValidator = require('express-validator');
const app =express();

var db // variable qui contiendra le lien sur la BD


//Connexion a la BDD
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  	//console.log('connexion a la bd')
  db = database
  app.listen(8081, function() {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})

//Nous dit quand on refresh
var log = function(req, res, next){
	console.log('Log in');
	next();
}
app.use(log);

//Avoir le template EJS
app.set('view engine', 'ejs');
app.set('views', cheminDacces.join(__dirname,'vues'));


//Middleware de bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Foutre chemin d acces pour fichier statique (css html et cie)
app.use(express.static(cheminDacces.join(__dirname, 'public')))

//VARIABLES GLOBALES
app.use(function(req, res, next){
	res.locals.erreurs = null;
	next();
});


//EXPRESS VALIDATOR
/*app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));*/


//AFFICHAGE DES DIFFERENTS ROUTES
app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('adresses').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {adresse: resultat})

    }) 
    

})

//ROUTE AJOUTER
app.post('/ajouter', function(req, res){
	//console.log('debut de la fonction ajouter');
	const obj = 
	{	
		nom: req.body.nom,
		prenom: req.body.prenom,
		telephone: req.body.telephone,
		ville: req.body.ville,
		groupeSanguin: req.body.groupeSanguin
		
	};
	//console.log('AJOUTTTT');
	db.collection('adresses').insertOne(obj);
	res.redirect('/');
});


//ROUTE MODIFIER
app.post('/modifier', function(req, res){
	//console.log('debut de la fonction modif');
	const obj = 
	{	
		nom: req.body.nom,
		prenom: req.body.prenom,
		telephone: req.body.telephone,
		ville: req.body.ville,
		groupeSanguin: req.body.groupeSanguin
	};

	//console.log('Modif');
	db.collection('adresses').updateOne({"_id":idObjet(req.body.objetQuonMod)},{$set:obj});
	res.redirect('/');
});


//ROUTE DETRUIRE
app.post('/detruire', function(req, res){
	//console.log('debut de la fonction detruire');
	//console.log('detruire');
	db.collection('adresses').remove({"_id":idObjet(req.body.objetQuonDetruit)});
	res.redirect('/');
});

//ROUTE TRIER (ICI PAR VILLE)
app.get('/trier', function(req, res){
	const triage = db.collection('adresses').find().sort({ville:1}).toArray(function(err, resultat){
	res.render('index.ejs', {adresse: resultat})
	//console.log('AT LEAST Y SE REND ICI');	
	})
});



