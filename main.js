// récupération des secondes depuis la page principale

var secondes =  document.getElementById('chrono').textContent;
secondes = parseInt(secondes,10);
var stock = secondes;

var prix = 0;
var prixMax = document.getElementsByClassName('PrxMax')[0].textContent;
prixMax = parseInt(prixMax,10);

var saisie = null;

var isplaying = true;

// Traitement du jeu
$('document').ready(function(){
    $('#commencer').click(function() {

        // pour vérifier qu'il n'y ait pas de résidu si on recommence la partie
        secondes = stock;
        $('#chrono').html(secondes);
        $('#nombre').val('');
        isplaying = true;
        $('.reponse').html('');

        // génération du prix
        prix = Math.floor(Math.random() * prixMax);

        // on affiche la zone de saisie pour le paris
        $('#paris').css({ 'visibility' :'visible', 'opacity' : '1'});

        // gestion du chrono
        var chrono = setInterval(function(){


           if(secondes == 0){
               // si le temps est égal à 0 on affiche perdu
               clearInterval(chrono);
               isplaying = false;
               $('#paris').css({ 'visibility' :'hidden', 'opacity' : '0'});
               $('.reponse').css({ 'visibility' :'visible', 'opacity' : '1'});
               $('#commencer').html('recommencer');
               document.getElementsByClassName('reponse')[0].classList.add('text-danger');
               document.getElementsByClassName('reponse')[0].classList.add('font-weight-bold');
               $('.reponse').html('Tu as perdu !');
           }

           else if(isplaying){
               // sinon on continue le décompte
               secondes--;
               $('#chrono').html(secondes);
           }
           else{
               clearInterval(chrono);
               $('#paris').css({ 'visibility' :'hidden', 'opacity' : '0'});
           }
           // et faire ce traitement toutes les 1000 milisecondes (1 secondes)
       }, 1000);
    });



        $('#paris').submit(function(e){
            if(isplaying) {
                saisie = $('#nombre').val();

                if (saisie == prix) {
                    $('.reponse').html("C'est gagné !!");
                    document.getElementsByClassName('reponse')[0].classList.add('text-success');
                    document.getElementsByClassName('reponse')[0].classList.add('font-weight-bold');
                    isplaying = false;
                }
                else if (saisie < prix) {
                    $('.reponse').html("C'est plus !");
                } else {
                    $('.reponse').html("C'est moins !");
                }
                $('#nombre').val("");
                }
                e.preventDefault();
        });
});