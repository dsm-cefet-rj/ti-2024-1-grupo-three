const input = document.getElementById("message-input");
input.addEventListener('keyup', (e)=> {if(e.keyCode === 13){
    sendMessage();
}})

const usuarios = ["Lucas Calmon", "Bruno Chaves", "Marcus Junior", "Lucas Teixeira"];
const respostas= ["Fala Pessoal!", "Boa noite!", "Al-mossar até morrer!", "Oi", "Al-bilal >>>> Al-mossar", "Adoro PSW! Salve Diogo"];
const cores = ['aqua','chocolate','violet', 'yellow']



function sendMessage(){
    var message= document.getElementById('message-input');
    if(!message.value){
        message.style.border = '1px solid red';
        return;
    }
    message.style.border = 'none';
    var btnSubmit = document.getElementById('btn-submit');
    
    showHistoric(message.value);
    message.value='';
}

function showHistoric(message){
    var randomUsu = Math.floor(Math.random()*usuarios.length);
    var randomRes = Math.floor(Math.random()*respostas.length);
    if(message.value == '/time'){

    }else if(message.value == '/aviso'){

    }else if(message.value == '/sair'){

    }else if(message.value == '/sairtime'){

    }else{
    var historic = document.getElementById('historico-forum');
    //minha msg
    var boxMessage = document.createElement('div');
    boxMessage.className = 'box-message';
    var myMessage= document.createElement('p');
    myMessage.className = 'myMessage';
    myMessage.innerHTML = message;

    boxMessage.appendChild(myMessage);
    historic.appendChild(boxMessage);
    //resposta
    var boxResponseMessage = document.createElement('div');
    boxResponseMessage.className = 'box-response-message';
    var nameChat= document.createElement('p')
    nameChat.className = 'name-chat'
    nameChat.innerHTML = usuarios[randomUsu];
    nameChat.style.color= cores[randomUsu];
    var responseChat= document.createElement('p');
    responseChat.className = 'response-chat';
    responseChat.innerHTML = respostas[randomRes];

    boxResponseMessage.appendChild(nameChat);
    boxResponseMessage.appendChild(responseChat);
    historic.appendChild(boxResponseMessage);
    }
    

    historic.scrollTop = historic.scrollHeight;
}