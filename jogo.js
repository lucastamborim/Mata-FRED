var altura = 0
var largura = 0
var vidas = 1
var tempo = 15
criaMosquitoTempo = 1500
quantVidas = 5

var nivel = window.location.search // aqui ele recupera apenas o valor dado após a ? do href
    nivel = nivel.replace('?','') //substituindo o caracter '? 'para '' ( vazio )

    if(nivel === 'fredao'){ //esse primeiro if ira alterar o tempo de cada mosquito na tela e de jogo
        tempo = 20 
      criaMosquitoTempo = 1000
      quantVidas = 4

    }else if(nivel === 'gardenal'){

        criaMosquitoTempo = 750
        tempo = 30
        quantVidas = 3
    }

document.addEventListener('DOMContentLoaded', function(){ //aqui é criado um evento para esperar o carregamento do dom completo para tester nivel
   
    //alert(nivel)

    if(nivel === 'fredao'){ //esse if altera o numero de coracoes 

        document.getElementById('v5').remove()
      
    }else if(nivel === 'gardenal'){

        document.getElementById('v5').remove()
        document.getElementById('v4').remove()
         
    }
    
})

function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth

}

ajustaTamanhoPalcoJogo()
var cronometro = setInterval(function(){
    tempo -=1

    if(tempo < 0 ){
        clearInterval(cronometro) //eliminando a funcao apos a vitoria
        clearInterval(criaMosca) //quando vence, a funcao de criar a mosca nao sera mais executada
        window.location.href = 'vitoria.html' //redirecionando para a pagina de vitoria
    }else{
        document.getElementById('cronometro').innerHTML = tempo//alterando o valor entre as tags do span 'cronometro'

    }
},1000)

    function posicaoRandomica(){
    //remover o mosquito anterior(caso exista)
    
    if(document.getElementById('mosquito')){ //se a requisicao for true, ele aplica o codigo 
        document.getElementById('mosquito').remove() //removendo o elemento atraves do metodo remove do dom 

        if(vidas > quantVidas){ //se perder as 5 vidas, redireciona o usuario a tela de gameover
            //alert('interromper o jogo')
            window.location.href = 'fim_de_jogo.html'
        }else{
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png" //substituindo o src da imagem de acordo como o seu id

            vidas++ //ao incrementar um no valor de vidas, a proxima vida sera alterada, na sequencia (v1, v2 e v3)
    }
        
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90// as dimensoes aleatorias estaram dentro da altura e largura da tela
    var posicaoY = Math.floor(Math.random() * altura) - 90 //o -90 serve como margem para a criacao da mosca

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY //a criacao do operador ternario faz com q nao seja possivel a posicao seja negativa

    var mosquito = document.createElement('img') //criando o elemento img

    mosquito.src = 'imagens/mosca.png' // atribuindo o valor src da imagem
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() //atribuindo o valor classname da imagem 
    mosquito.style.left = posicaoX + 'px' //definindo a posicao X da imagem como aleatoria (posicaoX)
    mosquito.style.top = posicaoY + 'px' //definindo a posicao Y da imagem como aleatoria (posicaoY)
    mosquito.style.position = 'absolute' //definindo a posicao da imagem como absolute)
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove() //o 'this' faz referencia ao elemento html da funcao, no caso o mosquito
    }

    document.body.appendChild(mosquito) //adicionando ele na arvore do dom

}

function tamanhoAleatorio(){

    var classe = Math.floor(Math.random() * 3) //retorna um valor entre 1 e 3

    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2) //retorna um valor entre 0 e 1 ( esquerda ou direta)
    
    switch(classe){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
