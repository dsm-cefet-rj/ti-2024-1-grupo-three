const input = document.getElementById("message-input");
input.addEventListener('keyup', (e)=> {if(e.keyCode === 13){
    sendMessage();
}})



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
    var historic = document.getElementById('historico-forum');

    var boxMessage = document.createElement('div');
    boxMessage.className = 'box-message';
    var myMessage= document.createElement('p');
    myMessage.className = 'myMessage';
    myMessage.innerHTML = message;

    boxMessage.appendChild(myMessage);
    historic.appendChild(boxMessage);

    historic.scrollTop = historic.scrollHeight;
}