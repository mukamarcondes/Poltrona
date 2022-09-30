function displayPlayingMovies(){
    getMovies().then(function(movies){
        console.log(movies);
        for(var i in movies){
            if(movies[i].playing == true){
                document.getElementById("moviesPlaying").innerHTML+=( `
                <div class="col s2.2">
                <div class="card hoverable">
                    <div class="card-image">
                        <img class="img" src="${movies[i].poster_image}">
                        <span class="card-title" position="center">${movies[i].name}</span>
                    </div>
                    <div class="card-content">
                        <p class="truncated">${movies[i].description}</p>
                    </div>
                    <div class="card-action">
                        <a href="moviePage.html?movieid=${movies[i].id}">Ver mais</a>
                    </div>
                </div>
                </div>
            `);
            }
            else{
                document.getElementById("moviesNotPlaying").innerHTML+=( `
                <div class="col s2.2">
                <div class="card hoverable">
                    <div class="card-image">
                        <img class="img" src="${movies[i].poster_image}">
                        <span class="card-title" position="center">${movies[i].name}</span>
                    </div>
                    <div class="card-content">
                        <p>${movies[i].description}</p>
                    </div>
                    <div class="card-action">
                        <a href="moviePage.html?movieid=${movies[i].id}">Ver mais</a>
                    </div>
                </div>
                </div>
            `);
            }
        }
    })
}

async function getSessions() {
    var options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    var data = await fetch('http://localhost:3000/sessions',options);
      return data.json();
  }

async function clearReservedAndStorage(){
    var sessions = await getSessions();
    var storage = JSON.parse(localStorage.getItem("ticketsPrice"));
    if(storage != null){
        for(var i in sessions){
            if(sessions[i] == info[3]){
                for(var j in info[2]){
                    //TODO remover assentos reservados
                }
            }
        }
    }
}




