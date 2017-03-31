"use strict";
(()=>{

var modifBtn = document.getElementsByClassName("modifier");
var suppBtn = document.getElementsByClassName("supprimer");	
var nomModif = document.getElementsByClassName("nomMod")[0];
var prenomModif = document.getElementsByClassName("prenomMod")[0];
var telephoneModif = document.getElementsByClassName("telephoneMod")[0];
var villeModif = document.getElementsByClassName("villeMod")[0];
var groupeSanguinModif = document.getElementsByClassName("groupeSanguinMod")[0];
var idDeModif = document.getElementsByClassName("idMod")[0];

var formulaireModif = document.getElementById('formMod');


//console.log(modifBtn.length);

for(var i=0; i<modifBtn.length; i++)
{
	modifBtn[i].addEventListener("click", modifierFonction);
}

for(var i=0; i<suppBtn.length; i++)
{
	suppBtn[i].addEventListener("click", supprimerFonction);
}


function modifierFonction() 
{
  nomModif.value = this.parentElement.parentElement.getElementsByTagName('td')[0].innerHTML;
  prenomModif.value = this.parentElement.parentElement.getElementsByTagName('td')[1].innerHTML;
  telephoneModif.value = this.parentElement.parentElement.getElementsByTagName('td')[2].innerHTML;
  villeModif.value = this.parentElement.parentElement.getElementsByTagName('td')[3].innerHTML;
  groupeSanguinModif.value = this.parentElement.parentElement.getElementsByTagName('td')[4].innerHTML;
  idDeModif.value = this.parentElement.parentElement.getElementsByTagName('td')[5].innerHTML;

  formulaireModif.submit();
  //console.log(nomModif);
}

function supprimerFonction() 
{
  console.log(this + 'SUPPRIMER');  
}




})()