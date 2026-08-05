// Seleção de elementos do DOM
const passwordDisplay = document.getElementById('password-display');
const passwordLength = document.getElementById('password-length');
const btnMinus = document.getElementById('btn-minus');
const btnPlus = document.getElementById('btn-plus');
const chkUppercase = document.getElementById('chk-uppercase');
const chkLowercase = document.getElementById('chk-lowercase');
const chkNumbers = document.getElementById('chk-numbers');
const chkSymbols = document.getElementById('chk-symbols');
const btnGenerate = document.getElementById('btn-generate');
const strengthBarPreview = document.getElementById('strength-bar-preview');

const indicatorFraca = document.getElementById('indicator-fraca');
const indicatorMedia = document.getElementById('indicator-media');
const indicatorForte = document.getElementById('indicator-forte');

// Listas de caracteres
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

// Controles do contador numérico
btnMinus.addEventListener('click', () => {
    let val = parseInt(passwordLength.value);
    if (val > parseInt(passwordLength.min)) {
        passwordLength.value = val - 1;
    }
});

btnPlus.addEventListener('click', () => {
    let val = parseInt(passwordLength.value);
    if (val < parseInt(passwordLength.max)) {
        passwordLength.value = val + 1;
    }
});

// Função para gerar a senha aleatória
function generatePassword() {
    let allowedChars = '';
    if (chkUppercase.checked) allowedChars += uppercaseChars;
    if (chkLowercase.checked) allowedChars += lowercaseChars;
    if (chkNumbers.checked) allowedChars += numberChars;
    if (chkSymbols.checked) allowedChars += symbolChars;

    if (allowedChars === '') {
        passwordDisplay.value = '';
        updateStrength(0);
        return;
    }

    let length = parseInt(passwordLength.value);
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    passwordDisplay.value = password;
    evaluateStrength(password, length);
}

// Avaliação lógica da força da senha
function evaluateStrength(password, length) {
    let score = 0;

    if (length >= 8) score++;
    if (length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Mapeamento dos scores em 3 níveis (Fraca, Média, Forte)
    if (score <= 3) {
        updateStrength(1); // Fraca
    } else if (score <= 5) {
        updateStrength(2); // Média
    } else {
        updateStrength(3); // Forte
    }
}

// Atualização visual dos painéis com base na força calculada
function updateStrength(level) {
    // Reset dos estados ativos
    indicatorFraca.classList.remove('active');
    indicatorMedia.classList.remove('active');
    indicatorForte.classList.remove('active');
    strengthBarPreview.style.backgroundColor = '#FFCAD4';

    if (level === 1) {
        indicatorFraca.classList.add('active');
        strengthBarPreview.style.backgroundColor = '#D90429'; // Vermelho
    } else if (level === 2) {
        indicatorMedia.classList.add('active');
        strengthBarPreview.style.backgroundColor = '#FFCC00'; // Amarelo
    } else if (level === 3) {
        indicatorForte.classList.add('active');
        strengthBarPreview.style.backgroundColor = '#38B000'; // Verde
    }
}

// Evento de gatilho do botão gerar
btnGenerate.addEventListener('click', generatePassword);

// Opcional: Gerar uma senha automaticamente ao abrir a página
generatePassword();
