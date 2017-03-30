//const http = require('http');
//const fichierS = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const idObjet = require('mongodb').ObjectID
const cheminDacces = require('path');
const expressValidator = require('express-validator');
const app =express();




var db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  	console.log('connexion a la bd tentative')
  db = database
  app.listen(8081, function() {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})


var log = function(req, res, next){
	console.log('Log in');
	next();
}
app.use(log);


app.set('view engine', 'ejs');
app.set('views', cheminDacces.join(__dirname,'vues'));

//Middleware de bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Foutre chemin d acces pour fichier statique (css html)
app.use(express.static(cheminDacces.join(__dirname, 'public')))

//VARIABLES GLOBALES
app.use(function(req, res, next){
	res.locals.erreurs = null;
	next();
});
//EXPRESS VALIDATOR
app.use(expressValidator({
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
}));



app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('adresses').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {adresse: resultat})

    }) 
    

})

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

app.post('/modifier', function(req, res){
	//console.log('debut de la fonction ajouter');
	const obj = 
	{	
		nom: req.body.nom,
		prenom: req.body.prenom,
		telephone: req.body.telephone,
		ville: req.body.ville,
		groupeSanguin: req.body.groupeSanguin
	};

	console.log('Modif');
	db.collection('adresses').updateOne({"_id":idObjet(req.body.objetQuonMod)},{$set:obj});
	res.redirect('/');
});


	/*
	req.checkBody('prenom','prenom necessaire').notEmpty();
	req.checkBody('nom','nom necessaire').notEmpty();
	req.checkBody('email','email necessaire').notEmpty();
	
	const erreurs = req.validationErrors();
	if(erreurs){
		res.render('index', {
		title:'Clients',
		adresses:adresse,
		erreurs:erreurs
	});
		}else{
			const nouvelUtilisateur= {
			prenom:req.body.prenom,
			nom:req.body.nom,
			email:req.body.email
		}
		console.log('AJOUT AVEC SUCCES');
	}
	//console.log(req.body.prenom);
	//console.log(req.body.nom);
	//console.log(req.body.email);
	
	*/


//const nomHote = '127.0.0.1';
//const port = 8081;

/*fichierS.readFile('index.htm',(err, html)=>{
		if(err)
		{
			throw err;
		}
	const serveur = http.createServer((req, res)=>{
		res.statusCode = 200;
		res.setHeader('Content-type', 'text/html');
		res.write(html);
		res.end();
	});

	serveur.listen(port, nomHote, ()=>{
		console.log('Serveur lauche sur' + port);
	});
});*/

