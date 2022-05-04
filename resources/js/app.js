import '../css/app.css'
// correct password is `password` lol

const $ = (s, o = document) => o.querySelector(s);
const $$ = (s, o = document) => o.querySelectorAll(s);

const login = $('#login-form');
const passwordContainer = $('.password', login);
const password = $('input', passwordContainer);
const nomeContainer = $('.nome', login)? $('.nome', login) : '';
const nome = nomeContainer ? $('input', nomeContainer) : '';
const sobrenomeContainer = $('.sobrenome', login) ? $('.sobrenome', login) : '';
const sobrenome = sobrenomeContainer ? $('input', sobrenomeContainer) : '';
const emailContainer = $('.email', login) ? $('.email', login) : '';
const email = emailContainer ? $('input', emailContainer) : '';
const passwordList = $('.dots', passwordContainer);
const submit = $('button', login);

password.addEventListener('input', e => {
    if(password.value.length > $$('i', passwordList).length) {
        passwordList.appendChild(document.createElement('i'));
    }
    submit.disabled = !password.value.length;
    passwordContainer.style.setProperty('--cursor-x', password.value.length * 10 + 'px');
});

let pressed = false;

password.addEventListener('keydown', e => {

    if(pressed || login.classList.contains('processing') || (password.value.length > 14 && e.keyCode != 8 && e.keyCode != 13)) {
        e.preventDefault();
    }
    pressed = true;

    setTimeout(() => pressed = false, 50);

    if(e.keyCode == 8) {
        let last = $('i:last-child', passwordList);
        if(last !== undefined && last) {
            last.classList.add('remove');
            setTimeout(() => last.remove(), 50);
        }
    }

});

password.addEventListener('select', function() {
    this.selectionStart = this.selectionEnd;
});

login.addEventListener('submit', e => {

    e.preventDefault();

    if(!login.classList.contains('processing')) {
        login.classList.add('processing');
        var returnSocket = false;
              const socket = io();
              if(sobrenome && nome){
                  var location = 'register';
                    socket.emit('register', { 
                        'nome'      : nome.value,
                        'sobrenome' : sobrenome.value,
                        'email'     : email.value,
                        'password'  : password.value,
                    });
                    socket.on('redirectHome', function(dataReturnSocket){
                        if(dataReturnSocket.state == true){
                            returnSocket = true;
                        }
                    });
                }else{
                    var location = 'login';
                    socket.emit('login', { 
                        'email'     : email.value,
                        'password'  : password.value,
                    });
                    socket.on('login', function(returnLogin){
                        console.log(returnLogin);
                       if(returnLogin.status == 0){
                            swal({
                                title: "Algo deu errado :-(",
                                text: returnLogin.msg,
                                icon: "error",
                            });
                       }else{
                            returnSocket = true;
                       }
                    });
                    socket.on('isConnect', function(returnConfirm){
                        setTimeout(function(){
                            window.location.href= `/login/${returnConfirm.connectCod}`;
                        },3000);
                    })
                }
              
        setTimeout(() => {

            let cls = returnSocket == true ? 'success' : 'error';
           
            login.classList.add(cls);
            if(location == 'register'){
                swal({
                    title: "Sucesso!",
                    text: "Seu registo foi realizado com sucesso, estamos te redirecionando para o login!",
                    icon: "success",
                    button: "Ok",
                  });
                setTimeout(() => {
                    window.location.href="/";
                },5000);
            }
            setTimeout(() => {
                login.classList.remove('processing', cls);
                if(cls == 'error') {
                    password.value = '';
                    passwordList.innerHTML = '';
                    submit.disabled = true;
                }
            }, 2000);
            setTimeout(() => {
                if(cls == 'error') {
                    passwordContainer.style.setProperty('--cursor-x', 0 + 'px');
                }
            }, 600);
            
        }, 1500);
    }

});
