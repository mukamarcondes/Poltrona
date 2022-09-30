function login(){
    var user = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    //preguiça de criar usuario ta foda..
    if((user=="r") && (password=="r")){
        window.open("userpage.html", "_self");
    }
    else{
        M.toast({html: 'Usuário ou senha incorretos'})
    }
}