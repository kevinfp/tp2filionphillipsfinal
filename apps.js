//const http = require('http');
//const fichierS = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const cheminDacces = require('path');
const expressValidator = require('express-validator');
const app =express();


var db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
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

const utilisateurs = [
	{
		id:1,
		prenom:'Kevin',
		nom:'Filio-Phillips',
		email:'1234@gmail.com',
	},
	{
		id:2,
		prenom:'billy',
		nom:'Fbbbips',
		email:'12dfsdfdsds34@gmail.com',
	},
	{
		id:3,
		prenom:'kavis',
		nom:'reed',
		email:'dsfs4@gmail.com',
	}
]

app.get('/',function(req, res){
	res.render('index', {
		title:'Clients',
		utilisateurs:utilisateurs
	});
});

app.post('/utilisateurs/ajouter', function(req, res){
	
	req.checkBody('prenom','prenom necessaire').notEmpty();
	req.checkBody('nom','nom necessaire').notEmpty();
	req.checkBody('email','email necessaire').notEmpty();

	const erreurs = req.validationErrors();
	if(erreurs){
		res.render('index', {
		title:'Clients',
		utilisateurs:utilisateurs,
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
	
	
})

app.listen(3000, function(){
	console.log('serveur enclencher sur 3000');
})
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

