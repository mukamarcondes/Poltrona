async function getDate(){
    var data = await fetch('https://cors.io/?http://worldtimeapi.org/api/timezone/America/Fortaleza');
    return data.json();
   
}

async function getMonth(){
    var data = await getDate();
    var date_time = data.datetime.split("T");
    //2018-12-25T14:36:00.376330-03:00
    //console.log(date_time);
    var date = date_time[0].split("-");
    var month = date[1];
    console.log("mes "+ month);
    return month;
}

async function getYear(){
    var data = await getDate();
    var date_time = data.datetime.split("T");
    //2018-12-25T14:36:00.376330-03:00
    //console.log(date_time);
    var date = date_time[0].split("-");
    var year = date[0];
    console.log("ano "+ year);
    return year;
}

async function getDay(){
    var data = await getDate();
    var date_time = data.datetime.split("T");
    //2018-12-25T14:36:00.376330-03:00
    //console.log(date_time);
    var date = date_time[0].split("-");
    var day = date[2];
    console.log("dia "+ day);
    return day;
}

async function getTime(){
    var data = await getDate();
    var date_time = data.datetime.split("T");
    //2018-12-25T14:36:00.376330-03:00
    //console.log(date_time);
    var time = date_time[1].split(".");
    console.log("Horas: "+ time);
    return time;
}

async function getHour(){
    var data = await getDate();
    var date_time = data.datetime.split("T");
    //2018-12-25T14:36:00.376330-03:00
    //console.log(date_time);
    var time = date_time[1].split(".");
    var timeSplited = time[0].split(":");
    var hour = timeSplited[0]; 
    console.log("Hora: "+ hour);
    return hour;
}

async function getSeconds(){
    var data = await getDate();
    var date_time = data.datetime.split("T");
    //2018-12-25T14:36:00.376330-03:00
    //console.log(date_time);
    var time = date_time[1].split(".");
    var timeSplited = time[0].split(":");
    var seconds = timeSplited[2]; 
    console.log("Hora: "+ seconds);
    return seconds;
}

async function getMinutes(){
    var data = await getDate();
    var date_time = data.datetime.split("T");
    //2018-12-25T14:36:00.376330-03:00
    //console.log(date_time);
    var time = date_time[1].split(".");
    var timeSplited = time[0].split(":");
    var minutes = timeSplited[1];
    console.log("Minutos: "+ minutes);
    return minutes;
}

function timeConvertor(time) {
    var PM = time.match('PM') ? true : false
    
    time = time.split(':')
    var min = time[1]
    if (PM) {
        var hour = 12 + parseInt(time[0],10)
        var sec = time[2].replace('PM', '')
    } else {
        var hour = time[0]
        var sec = time[2].replace('AM', '')       
    }
    return (hour+":"+min+":"+sec);
    //console.log(hour + ':' + min + ':' + sec)
  }

function convertMonth(session){
    var month = session.split(" ");
    switch(month[0]){
        case "Jan":
        return 01;

        case "Feb":
        return 02;

        case "Mar":
        return 03;

        case "Apr":
        return 04;

        case "May":
        return 05;

        case "Jun":
        return 06;

        case "Jul":
        return 07;

        case "Aug":
        return 08;

        case "Sep":
        return 09;

        case "Oct":
        return 10;

        case "Nov":
        return 11;

        case "Dec":
        return 12;
    }
}

async function displaySessions(){
    var url = window.location.href;
    var arr = url.split("movieid=");
    //console.log(arr);
    var id = parseInt(arr[1], 10);
    //console.log(id);
    var movies = await getMovies();
    //console.log(movies);
    var sessions = await getSessions();

    var mthActual = await getMonth();
    var dayActual = await getDay();
    var yearActual = await getYear();

    var hourActual = await getHour();
    var minutesActual = await getMinutes();
    var none=true;
    for(var i in sessions){

        var mth = convertMonth(sessions[i].date);
        var date = sessions[i].date;
        //console.log("atual "+ date);
        var splited = date.split(" ");
        //console.log("se "+ splited);
        var day = date[4]+date[5];
        var year = date[8]+date[9]+date[10]+date[11];

        var time = sessions[i].time.split(":");
        var hour = time[0];
        var minutes = time[1];
        //console.log("cond dia "+ day);
        //console.log("cond mes "+ mth);
        //console.log("cond ano "+ year);
        document.getElementById("tbl").innerHTML=( `
        
        
          <tr class="center">
            <th>Filme</th>
            <th>Sala</th>
            <th></th>
            <th>Horários</th>
          </tr>
                                                                       
        `);
        if((sessions[i].movie_id == id) && (mth == mthActual) && (day == dayActual) && (year == yearActual) && (hour >= hourActual) || (minutes<minutesActual && hour==hourActual)){
            none=false;
            document.getElementById("tableSessions").innerHTML+=( `
            


            <tr>
                <td>${movies[id-1].name}</td>
                <td>${sessions[i].auditorium}</td>
                <td>${sessions[i].image_type}</td>
                <td>
                <a href="buyTicket.html?sessionid=${sessions[i].id}" class="blue left waves-effect waves-light btn ">${hour+":"+minutes}</a>
                </td>
            </tr>
           
            
            `);
        }
    }
    if(none!=false){
        document.getElementById("content_sessions").innerHTML=(`
        <div class="row center">
            <h3>Nenhuma Sessão encontrada para esse filme</h3>
        </div>
      `);
    }
    else{
        setPagination();
        document.getElementById("loader").innerHTML=(`
            
      `);
    }
}
async function setPagination(){
    var month = await getMonth();
    mouth = parseInt(month, 10);
    var day = await getDay();
    day = parseInt(day, 10);
        document.getElementById("playingDates").innerHTML+=( `
            <li class="active blue"><a onclick="displaySessionsByDate(${day})">Hoje</a></li>
            <li class="waves-effect"><a onclick="displaySessionsByDate(${day+1})">${day+1 +" Dec"}</a></li>
            <li class="waves-effect"><a onclick="displaySessionsByDate(${day+2})">${day+2 +" Dec"}</a></li>
            <li class="waves-effect"><a onclick="displaySessionsByDate(${day+3})">${day+3 +" Dec"}</a></li>
            <li class="waves-effect"><a onclick="displaySessionsByDate(${day+4})">${day+4 +" Dec"}</a></li>
        `);
}
// FIXME corrigir o += para não somar com as sessões do dia anterior
// async function displaySessionsByDate(daySession){
    
//     var url = window.location.href;
//     var arr = url.split("movieid=");
//     //console.log(arr);
//     var id = parseInt(arr[1], 10);
//     //console.log(id);
//     var movies = await getMovies();
//     //console.log(movies);
//     var sessions = await getSessions();

//     var mthActual = await getMonth();
//     var dayActual = await getDay();
//     dayActual = parseInt(dayActual, 10);
//     var yearActual = await getYear();

//     var hourActual = await getHour();
//     var minutesActual = await getMinutes();

//     for(var i in sessions){
//         var mth = convertMonth(sessions[i].date);
//         var date = sessions[i].date;
//         //console.log("atual "+ date);
//         var splited = date.split(" ");
//         //console.log("se "+ splited);
//         var day = daySession;
//         var year = date[8]+date[9]+date[10]+date[11];

//         var time = sessions[i].time.split(":");
//         var hour = time[0];
//         var minutes = time[1];
//         //console.log("cond dia "+ day);
//         //console.log("cond mes "+ mth);
//         //console.log("cond ano "+ year);
//         if((sessions[i].movie_id == id) && (mth == mthActual) && (day == dayActual+1) && (year == yearActual) && (hour >= hourActual) || (minutes<minutesActual && hour==hourActual)){
//             document.getElementById("tableSessions").innerHTML+=( `
//             <tr>
//                 <td>${movies[id-1].name}</td>
//                 <td>${sessions[i].auditorium}</td>
//                 <td>${sessions[i].image_type}</td>
//                 <td>
//                 <a href="file:///Users/rodrigogomes/Documents/Codes/ProtonMovies/src/Seats/pickSeat.html?sessionid=${sessions[i].id}" class="blue left waves-effect waves-light btn ">${hour+":"+minutes}</a>
//                 </td>
//             </tr>
//             `);
//         }
//     }
// }

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

async function displaySessionsInfo(){
    var url = window.location.href;
    var arr = url.split("movieid=");
    //console.log(arr);
    var id = parseInt(arr[1], 10);
    //console.log(id);
    var movies = await getMovies();
    //console.log(movies);
    for(var i in movies){
        if(movies[i].id == id){
            document.getElementById("pageName").innerHTML=( `
                ${movies[i].name + " - Sessões"}
            `);
            
             document.getElementById("infoCard").innerHTML=( `
            <div class="row">
            <div class="col s6" style="height: 415px; border-top:0; border-left:0; ">
              <img src="${movies[i].poster_image}" class="" style="height: 415px; width: 270px; border-left:0; border: none; border-spacing: 0px; ">
            </div>
      
            <div class="col-content s4">
              <p class=" center flow-text">${movies[i].name}</p>
              <p align="justify"><label for="">Descrição: </label>${movies[i].description}</p>
              <p><label for="">Duração: </label>${movies[i].runtime +" min"}</p>
              <p><label for="">Ano: </label>${movies[i].release_date}</p>
              <img src="${rated(movies[i].rated)}" class="left"
                style="height: 30px; width: 30px;">
            </div>
            
          </div>
          
            `);

            document.getElementById("trailer").innerHTML=( `
            
            <iframe width="615" height="375" src="${movies[i].trailer}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <!--img width="400" height="450" src="${movies[i].poster}"-->
            </div>
            `);
        }
    }
}
