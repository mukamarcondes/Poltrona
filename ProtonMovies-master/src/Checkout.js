var minutes = 4;
var seconds = 59;
var expired = false;
async function generateUniqueID(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
async function getPurchaseData(){
    uniqueID = await generateUniqueID();
    var info = JSON.parse(localStorage.getItem("ticketsPrice"));
    if(info == null){
        alert("Sessão Expirada. Você será redirecionado para a página inicial");
        window.open("index.html", "_self");
    }
    else{
        document.getElementById("price").innerHTML=( `
    <h4 style="margin-top: 0; margin-bottom: 10px; padding: 0px 0px 0; flex: 1; color: rgb(119, 219, 119);">Valor da compra R$: ${info[0]} </h4>
        `);
    }
    
}

function goToIndex(){
    localStorage.clear();
    alert("Sua sessão será expirada. Você será redirecinado para a página inicial");
    expired = true;
    window.open("index.html", "_self");
}

async function getSessions() {
    var data = await fetch('http://localhost:3000/sessions');
      return data.json();
}
async function updateSession(session) {
    var options = {
      method: 'PUT',
      body: JSON.stringify(session),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    return fetch(`http://localhost:3000/sessions/${session.id}`, options)
      .then(res => res.json())
      .then(post => console.log(post))
      .catch(error => console.error(error));
  
}

async function makePayment(){
    var info = JSON.parse(localStorage.getItem("ticketsPrice"));
    console.log(info);
    var sessions = await getSessions();
    var purchased = false;
    // //var price = info[0];
    // sem verificação de input //TODO adicionar
    // var card_number = document.getElementById("cardnumber").value;
    // var name = document.getElementById("cardholder").value;
    // var expire_date = document.getElementById("date").value;
    // var cvv = document.getElementById("verification").value;
    expired = true;
    for(var i in sessions){
        if(info[5] == sessions[i].id){
            var session = sessions[i];
            var seats = info[1];
            for(var j in seats){
                if(session.seats[seats[j]].client_id == null){
                    session.seats[seats[j]-1].seat = seats[j];
                    session.seats[seats[j]-1].client_id = await generateUniqueID();
                }
                else{
                    purchased = true;
                    break;
                }
            }
            if(purchased != true){
                await updateSession(session);
                console.log(session);
                expired = true;
                alert("Sucesso");
            }
            else{
                alert("Seus assentos selecionados foram comprados por outro cliente. Iremos finalizar sua sessão");
                window.open("index.html", "_self");
            }
        }
    }
    //TODO adicionar loading para dar contexto
    //FIXME não limpar storage ao chamar purchaseDetails
     window.open("purchaseDetails.html", "_self");
}


function showCountdown(){

        setInterval(function(){
            if(minutes == 0 && seconds == 0){
                document.getElementById("timeLeft").innerHTML=( `
            <h4 class="title">Tempo Restante: 00:00</h4>
            `);
            }
            else if(seconds == 0){
                document.getElementById("timeLeft").innerHTML=( `
                <h4 class="title">Tempo Restante: ${minutes}:${seconds}</h4>   
            `);
            minutes--;
            seconds = 59;
            }
            else{
                document.getElementById("timeLeft").innerHTML=( `
                <h4 class="title">Tempo Restante: 0${minutes}:${seconds}</h4>
                `);
                seconds--;
            }
            
        }, 1000);
}


function countdown(){
    showCountdown();
    setTimeout(function(){
         alert("Tempo da Sessão expirado. Você será redirecinado para a página inicial");
         localStorage.clear();
         expired = true;
         clearTimeout();
         window.open("index.html", "_self");
         
    }, 300010);
    
}

window.onbeforeunload = function(){
    localStorage.clear();
    if(expired == true){
        return undefined;
    }
    else{
        return 'Você irá perder os seus ingressos e sua sessão irá expixar ao fechar essa página';
    }
}
$(document).ready(function() {
    // Radio box border
    $('.method').on('click', function() {
      $('.method').removeClass('blue-border');
      $(this).addClass('blue-border');
    });
  
    // Validation
    var $cardInput = $('.input-fields input');
  
    $('.next-btn').on('click', function(e) {
  
      $cardInput.removeClass('warning');
  
      $cardInput.each(function() {
         var $this = $(this);
  
         if (!$this.val()) {
           $this.addClass('warning');
         }
      });
  
    });
   
});