<!-- validação de cartão de crédito -->

<?php
function cardIsValid($cardNumber)
{
    $number = substr($cardNumber, 0, -1);
    $doubles = [];

    for ($i = 0, $t = strlen($number); $i < $t; ++$i) {
        $doubles[] = substr($number, $i, 1) * ($i % 2 == 0? 2: 1);
    }

    $sum = 0;

    foreach ($doubles as $double) {
        for ($i = 0, $t = strlen($double); $i < $t; ++$i) {
            $sum += (int) substr($double, $i, 1);
        }
    }

    return substr($cardNumber, -1, 1) == (10-$sum%10)%10;
}

if (cardIsValid($customerCardNumber)) {
  // o cartão é válido e podemos dar andamento na integração
}
?>