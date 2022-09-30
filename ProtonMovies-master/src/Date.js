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