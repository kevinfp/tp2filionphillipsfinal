"use strict";
(()=>{
//LES DIFFERENTES VARIABLES QUI ME PERMETTE DALLLER CHERCHER LES DIFFERENTS ELEMENTS DU FORM
var modifBtn = document.getElementsByClassName("modifier");
var suppBtn = document.getElementsByClassName("supprimer");	
var nomModif = document.getElementsByClassName("nomMod")[0];
var prenomModif = document.getElementsByClassName("prenomMod")[0];
var telephoneModif = document.getElementsByClassName("telephoneMod")[0];
var villeModif = document.getElementsByClassName("villeMod")[0];
var groupeSanguinModif = document.getElementsByClassName("groupeSanguinMod")[0];
var idDeModif = document.getElementsByClassName("idMod")[0];

var idDeSupp = document.getElementsByClassName("idSupp")[0];

var formulaireModif = document.getElementById('formMod');
var formulaireSupp = document.getElementById('formSupp');


//console.log(modifBtn.length);


//BOUCLES QUI ME PERMET DAPPLIQUER LEVENEMENT CLIQUE SUR CHACUN DES BOUTONS MODIFIER OU SUPPRIMER DANS MON TABLEAU
for(var i=0; i<modifBtn.length; i++)
{
	modifBtn[i].addEventListener("click", modifierFonction);
}

for(var i=0; i<suppBtn.length; i++)
{
	suppBtn[i].addEventListener("click", supprimerFonction);
}

//FONCTION MODIFIER, QUI PERMETTERA DE MODIFIER LE LES VALEUR DU TABLEAU
function modifierFonction() 
{
  nomModif.value = this.parentElement.parentElement.getElementsByTagName('p')[0].innerHTML;
  prenomModif.value = this.parentElement.parentElement.getElementsByTagName('p')[1].innerHTML;
  telephoneModif.value = this.parentElement.parentElement.getElementsByTagName('p')[2].innerHTML;
  villeModif.value = this.parentElement.parentElement.getElementsByTagName('p')[3].innerHTML;
  groupeSanguinModif.value = this.parentElement.parentElement.getElementsByTagName('p')[4].innerHTML;
  idDeModif.value = this.parentElement.parentElement.getElementsByTagName('p')[5].innerHTML;
  formulaireModif.submit();
  //console.log(nomModif);
}

//FONCTION SUPPRIMER, QUI PERMETTERA DE SUPPRIMER LE LES VALEUR DU TABLEAU
function supprimerFonction() 
{
	idDeSupp.value = this.parentElement.parentElement.getElementsByTagName('p')[5].innerHTML;
	//console.log(this + 'SUPPRIMER');  
	formulaireSupp.submit();
}




})()