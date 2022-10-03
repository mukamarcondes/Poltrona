var pagamento = document.getElementsByName('payment')


function teste() {
    console.log(pagamento[0].checked)
    console.log(pagamento[1].checked)
    console.log(pagamento[2].checked)

    if (pagamento[0].checked) {
        window.location.replace("http://127.0.0.1:5500/pagamento_muka/depois/index.html")
    } else if (pagamento[1].checked) {
        window.location.replace("http://127.0.0.1:5500/pagamento_muka/depois2/index.html")
    } else if (pagamento[2].checked) {
        window.location.replace("http://127.0.0.1:5500/pagamento_muka/depois3/boleto.html")
    }
}


