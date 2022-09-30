var selectedArray = new Array();
var size=0;
var lastSelectedPrice;
var lastSelectedHalfPrice;
var price;
var totalPrice;
function setSeats(session){
    //console.log(session);
    //console.log("teste "+session.seats[0].client_id);
    for(var i=0;i<=49;i++){
        var value = session.seats[i].client_id;
        if(value == null){
            document.getElementById(i+1).src = "free.png";
            selectedArray[i+1]=null;
        }
        else{
            document.getElementById(i+1).src = "taken.png";
            selectedArray[i+1]=-1;
        }
    }
    //console.log("array "+selectedArray);
}

function rated(movie_rated){
    switch(movie_rated){
        case "Livre":
        return "https://www.jota.info/wp-content/uploads/2015/11/2000px-DJCTQ_-_L.svg_-1024x1024.png?x48657";

        case "10 Anos":
        return "https://blogjatefalei.files.wordpress.com/2014/09/classificacao_10anos.png";

        case "12 Anos":
        return "https://upload.wikimedia.org/wikipedia/commons/2/2e/DJCTQ_-_12.JPG";

        case "14 Anos":
        return "https://blogjatefalei.files.wordpress.com/2014/09/classificacao_14anos.png";

        case "16 Anos":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/DJCTQ_-_16.svg/400px-DJCTQ_-_16.svg.png";

        case "18 Anos":
        return "https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/thumb/c/cc/DJCTQ_-_18.JPG/300px-DJCTQ_-_18.JPG";

    }
}

function showSessionInfo(session,movie){

    document.getElementById("sessionInfo").innerHTML=( `
    <div class="row">
    <div class="col s6" style="height: 415px; border-top:0; border-left:0; ">
      <img src="${movie.poster_image}" class="" style="height: 415px; width: 270px; border-left:0; border: none; border-spacing: 0px; ">
    </div>
    <div class="col-content s4">
      <p class=" center flow-text">${movie.name}</p>
      
      <p><label for="">Duração: </label>${movie.runtime +" min"}</p>
      <p><label for="">Horário: </label>${session.time}</p>
      <p><label for="">Data: </label>${session.date}</p>
      <p><label for=""></label>${session.auditorium}</p>
      <p><label class="center"></label>${session.image_type}</p>
      <img src="${rated(movie.rated)}" class="center"
        style="height: 30px; width: 30px;">
    </div>
  </div>
    `);
}

function convertSeat(seat){
    seat = seat.toString();
    seat = seat.split("");
   // console.log("assento "+seat);
    var size = seat.length;
   // console.log("size "+size);
    if(seat.length == 1){
        return "A"+seat[0];
    }
    if(seat[1] == 0){
        switch(seat[0]){
            case "1":
            return "A 10";

            case "2":
            return "B 20";

            case "3":
            return "C 30";

            case "4":
            return "D 40";

            case "5":
            return "E 50";

            case "6":
            return "F 60"

        }
    }
    else{
        switch(seat[0]){
            case "1":
            return "B "+seat[1];

            case "2":
            return "C "+seat[1];

            case "3":
            return "D "+seat[1];

            case "4":
            return "E "+seat[1];

            case "5":
            return "F "+seat[1];

        }
    }
}

function printSelected(seat){
    //console.log(selectedArray);
    
    var converted = convertSeat(seat);
        document.getElementById("noneSelected").innerHTML=( `
       
        `);
        document.getElementById("selectedSeats").innerHTML+=( `
        <div id="${"array"+seat}">
        <h6 class="center" >${converted}</h6>
        </div>       
        `);
}

function calculateTotalPrice(){
    var fullPrice = parseInt(document.getElementById("price").value, 10);
    var halfPrice = parseInt(document.getElementById("halfPrice").value, 10);
    totalPrice = (fullPrice*price)+(halfPrice*(price/2));
    return (fullPrice*price)+(halfPrice*(price/2));
}

async function selectTicketsPrice(){
    var fullPrice = parseInt(document.getElementById("price").value, 10);
    var halfPrice = parseInt(document.getElementById("halfPrice").value, 10);
    var arrayInfoCheckout = new Array();
    var arraySeats = new Array();
    var pickedSize = 0;
    arrayInfoCheckout[0] = calculateTotalPrice();
    var tickets_type = {
        full: fullPrice,
        half: halfPrice 
    }
    for(var i=1;i<=50;i++){
        if(selectedArray[i] != null && selectedArray[i] != -1){
            arraySeats[pickedSize]=i;
            pickedSize++; 
        }
    }
    arrayInfoCheckout[1] = arraySeats;
    arrayInfoCheckout[2] = tickets_type;
    

    var movieId;

        var url = window.location.href;
        var arr = url.split("sessionid=");
        var id = parseInt(arr[1], 10);  
        //console.log(id);
        var sessions = await getSessions();
        for (var i in sessions) {
          if (sessions[i].id == id) {
            arrayInfoCheckout[3] = sessions[i];
            movieId = sessions[i].movie_id;
          }
        }

      var movies = await getMovies();
      for (var i in movies) {
        if (movies[i].id == movieId) {
          arrayInfoCheckout[4] = movies[i];
        }
      }
      arrayInfoCheckout[5] = id;
    localStorage.setItem("ticketsPrice", JSON.stringify(arrayInfoCheckout));
    localStorage.setItem("inCheckout",true);
    console.log(JSON.parse(localStorage.getItem("ticketsPrice")));
    window.open("checkout.html", "_self")
}

async function selectPrice(type){
    
    // ta foda...
    var fullPrice = await parseInt(document.getElementById("price").value, 10);
    var halfPrice = await parseInt(document.getElementById("halfPrice").value, 10);
    lastSelectedHalfPrice = halfPrice;
    lastSelectedPrice = fullPrice;
    var fullSelected = await parseInt(fullPrice+halfPrice, 10);
    console.log("full price "+fullSelected);
    $("#btnCheckout").html(`
            <a class="blue waves-effect waves-light right btn disabled" onclick="selectTicketsPrice()">Proseguir para pagamento</a>
            `);
    //console.log("ultima inteira selecionada depois "+lastSelectedPrice);
    //console.log("ultima meia selecionada depois "+lastSelectedPrice);
    if(type == 0){
        var qtd = size-fullPrice;
        //console.log("selecionado full "+fullPrice);
        if(fullPrice == size){
            $("#btnCheckout").html(`
            <a class="blue waves-effect waves-light right btn " onclick="selectTicketsPrice()">Proseguir para pagamento</a>
            `);
        }
        if(fullSelected == size){
            //console.log("rthgfthtrhtr");
            $("#btnCheckout").html(`
            <a class="blue waves-effect waves-light right btn " onclick="selectTicketsPrice()">Proseguir para pagamento</a>
            `);
        }
        calculateTotalPrice();
        $("#total").html(`
            <h5 class="header">Valor total R$: ${totalPrice}</h5>
            `);

        for(var i=0;i<=qtd;i++){
            if(i == 0){
                document.getElementById("halfPrice").innerHTML=( `
                <option value="0">0</option>
                `);
            }
            else{
                document.getElementById("halfPrice").innerHTML+=( `
                <option value="${i}">${i}</option>
                `);
                
            }
        }
        document.getElementById("halfPrice").value = lastSelectedHalfPrice;
    }
    else{
        calculateTotalPrice();
        await console.log("full "+fullSelected);
        var qtd = size-halfPrice;
        //console.log("selecionado half "+halfPrice);
        if(halfPrice == size){
            //console.log("desativar o outro");
            $("#btnCheckout").html(`
            <a class="blue waves-effect waves-light right btn " onclick="selectTicketsPrice()">Proseguir para pagamento</a>
            `);
        }
        else if(fullSelected == size){
            $("#btnCheckout").html(`
            <a class="blue waves-effect waves-light right btn " onclick="selectTicketsPrice()">Proseguir para pagamento</a>
            `);

        }
        calculateTotalPrice();
        $("#total").html(`
            <h5 class="header">Valor total R$: ${totalPrice}</h5>
            `);
        for(var i=0;i<=qtd;i++){
            //console.log("i");

            if(i == 0){
                document.getElementById("price").innerHTML=( `
                <option value="0">0</option>
                `);
            }
            else{
                document.getElementById("price").innerHTML+=( `
                <option value="${i}">${i}</option>
                `);
            }
        }
        document.getElementById("price").value = lastSelectedPrice;
     
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, options);
      });
    
      // Or with jQuery
    
      $(document).ready(function () {
        $('select').formSelect();
      });

}



function showSelectedTicket(){
   // calculateTotalPrice();
    var strSeats = "";
    for(var i=1;i<=50;i++){
        if(selectedArray[i] != null && selectedArray[i] != -1){
            strSeats+=`${convertSeat(selectedArray[i])}, `;
        }
    }
    //console.log("str "+strSeats);
    document.getElementById("modalSelectTickets").innerHTML=( `
    <!-- Modal Structure -->
    <div id="modal3" class="modal bottom-sheet" tabindex="0" style="z-index: 1003; display: none; opacity: 0; bottom: -100%; ">
    <div class="modal-content">
      <div class="row">
        <div class="col s9">
            <h3 class="header">Selecione o tipo do ingresso</h3>
        </div>
        <div class="col s3">
            <h4 class="header">Selecionados: ${strSeats}</h4>
        </div>
        <div class="col s3" id="total">
        <h5 class="header">Valor total R$: 0</h5>
    </div>
      </div>
      
      
      <ul class="collection">
        <li class="collection-item "  style="white-space: nowrap;">
          <span class="title">Inteira</span>
          <p>R$: ${price}
            <br>
            <br>
          </p>
          <div class="input-field  right">
              <select id="price" onchange="selectPrice(${0})">
              <option value="0">0</option>
              </select>
              <label>Quantidade</label>
            </div>
        </li>
          <li class="collection-item  " style="white-space: nowrap;">
            <span class="title">Meia</span>
            <p>R$: ${price/2}
              <br> <label> Necessário a apresentação de comprovante na entrada da sala</label>
            </p>
            <div class="input-field  right">
              <select  id="halfPrice" onchange="selectPrice(${1})">
              <option value="0">0</option>
              </select>
              <label>Quantidade</label>
            </div>
            
          </li>
    </div>
    </ul>
    <div id="btnCheckout">
      <a class="blue waves-effect waves-light right btn disabled" onclick="selectTicketsPrice()">Proseguir para pagamento</a>
    </div>
  </div>
</div>
</div>
</div>
    `); 

    for(var i=0;i<size;i++){
        document.getElementById("price").innerHTML+=( `
            <option  value="${i+1}">${i+1}</option>
        `);
        document.getElementById("halfPrice").innerHTML+=( `
            <option  value="${i+1}">${i+1}</option>
        `);
   
    }
  





    $(document).ready(function () {
        $('.sidenav').sidenav();
      });
      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, options);
      });
    
      // Or with jQuery
    
      $(document).ready(function () {
        $('select').formSelect();
      });
      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
      });
    
      // Or with jQuery
    
      $(document).ready(function () {
        $('.modal').modal();
      });
    
    
      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.slider');
        var instances = M.Slider.init(elems, options);
      });
}

function getPrice(session){
    switch(session.image_type){
        case "IMAX 3D":
        price = 40;
        return 40;

        case "IMAX 2D":
        price = 35;
        return 35;

        case "3D":
        price = 30;
        return 30;

        case "2D":
        price = 25;
        return 25;
    }
}



function setButton(){
    if(size != 0){
        showSelectedTicket();
        document.getElementById("btnTicket").innerHTML=( `
            <a class="waves-effect blue waves-light btn modal-trigger" href="#modal3" >Tipo de Ingresso</a>    
        `);
        
    }
    else{
        document.getElementById("btnTicket").innerHTML=( `
        <a class="waves-effect blue waves-light btn modal-trigger disabled" href="#modal3" >Tipo de Ingresso</a>       
        `);
        document.getElementById("noneSelected").innerHTML=( `
            <h6 class="center">Nenhum</h6>
        `);
    }
}

function removeSelected(seat){
    //console.log(selectedArray);
    $("#array"+seat).remove();
}

function selectSeat(seat){
    var image = document.getElementById(seat).src;
    // FIXME a posição do vetor pode variar
    image = image.split("/");
    image = image[10];
    if(image == "selected.png"){
        document.getElementById(seat).src = "free.png";
        selectedArray[seat]=null;
        removeSelected(seat);
        size--;
        setButton();
    }
    if(image == "free.png"){
        if(size >= 5){
            M.toast({html: 'Você só pode selecionar no máximo 5 assentos por compra'});
            return ;
        }
        document.getElementById(seat).src = "selected.png";
        selectedArray[seat]=seat;
        printSelected(seat);
        size++;
        setButton();
    }
}