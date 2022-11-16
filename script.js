// codEncomenda = 'BR12345678910'

$(document).find("#busca button").on('click', function () {
    codEncomenda = $("#busca input").val()
    getEncomendaInfo(codEncomenda)
});

$( document.activeElement).on("keyup", function(e){
    codEncomenda = $("#busca input").val()
    if(e['originalEvent']['key'] == 'Enter')
        getEncomendaInfo(codEncomenda)
})

function getEncomendaInfo(codEncomenda) {
    if (codEncomenda) {
        $.ajax({
            type: "GET",
            url: `api/req.json`,
            dataType: "JSON",
            success: function (response) {
                desenhaCampos(response[codEncomenda] ?? null);
            }
        });
    } else {
        $('#rastreio').html('')
        $('#rastreio').append('<h4 class="alerta">É necessário informar um código de rastreio valido!</h4>')
    }
}

function desenhaCampos(json) {
    $("#rastreio").html('')
    arrStatus= {"Objeto saiu para entrega ao destinatário": 'Objeto saiu para entrega', 'Objeto entregue ao destinatário': 'Objeto entregue'}
    $(document).find('.alerta').remove()
    $.ajax({
        type: "get",
        url: "components/dsEncomenda.html",
        success: function (response) {
            for (let i = 0; i < json.length; i++) {
                $("#rastreio").append(response);
              
                $('.info-encomenda-div').each(function (index, element) {
                    $(element).addClass('' + index)
                });

                $('.' + i + ' .indexDiv').append('<h1>'+(i + 1)+'</h1>')
                $('.' + i + ' .tituloStatus h3').text(arrStatus[json[i]['status']] ?? json[i]['status'])
                $('.' + i + ' .dsStatusEncomenda .dtStatusEncomenda').text(json[i]['data'] + ' ás ' + json[i]['hora'])
                if (json[i]['local']) {
                    $('.' + i + ' .dsStatusEncomenda .dsLocalOrigem').text(json[i]['local'])
                } else {
                    $('.' + i + ' .dsStatusEncomenda .dsLocalOrigem').text(json[i]['origem'])
                    $('.' + i + ' .dsStatusEncomenda .dsLocalDestino').text(json[i]['destino'])
                }
            }
        }
    });    
}
