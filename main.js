let passwordLength = 16
const passwordText = document.querySelector('#password')
const upperCaseCheckbox = document.querySelector('#uppercase-check')
const numbersCheckbox = document.querySelector('#numbers-check')
const symbolsCheckbox = document.querySelector('#symbols-check')
const passwordSecurityBar = document.querySelector('#security-indicator-bar')
const renewPasswordIcon = document.querySelector('#renew')

generatePassword()
handlePasswordLength()

//Event listeners
const copyButton = document.querySelector('#copy')
copyButton.addEventListener('click', copyPassword);

upperCaseCheckbox.addEventListener('click', generatePassword)
numbersCheckbox.addEventListener('click', generatePassword)
symbolsCheckbox.addEventListener('click', generatePassword)

renewPasswordIcon.addEventListener('click', generatePassword)

//Gera uma nova senha aleatória sempre que acionada
function generatePassword() {
    let chars = 'abcdefghijklmnopqrstuvwxyz'
    const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '@?!#$%&*()[]'

    let password = ''

    if(upperCaseCheckbox.checked) {
        chars += uppers
    }

    if(numbersCheckbox.checked) {
        chars += numbers
    }

    if(symbolsCheckbox.checked) {
        chars += symbols
    }
    
    for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    showPassword(password)
    calculatePasswordStrengh()
}

//Exibe a senha gerada no input
function showPassword(password) {
    passwordText.value = password
}

//Controla o evento de change no range de tamanho da senha
function handlePasswordLength() {
    const passwordLengthText = document.querySelector('#password-length-text')
    const passwordLengthInput = document.querySelector('#password-length')
    passwordLengthInput.addEventListener('input', () => {
        passwordLength = passwordLengthInput.value;
        passwordLengthText.innerText = passwordLength
        generatePassword()
        calculateFontSize()
    })
    return passwordLength
}

//Copiar text do input contendo a senha
function copyPassword() {
    navigator.clipboard.writeText(passwordText.value)
}

function calculatePasswordStrengh() {
    const percent = Math.round(
                                (passwordLength/64) * 25 + 
                                    (upperCaseCheckbox.checked ? 15 : 0) +
                                    (numbersCheckbox.checked ? 25 : 0) +
                                    (symbolsCheckbox.checked ? 35 : 0)
                                )

    passwordSecurityBar.style.width = `${percent}%`

    if(percent > 69){
        passwordSecurityBar.classList.remove('critical')
        passwordSecurityBar.classList.remove('warning')
        passwordSecurityBar.classList.add('safe')
    } else if (percent > 50){
        passwordSecurityBar.classList.remove('critical')
        passwordSecurityBar.classList.remove('safe')
        passwordSecurityBar.classList.add('warning')
    } else {
        passwordSecurityBar.classList.remove('warning')
        passwordSecurityBar.classList.remove('safe')
        passwordSecurityBar.classList.add('critical')
    }
    
    if(percent >= 100){
        passwordSecurityBar.classList.add('completed')
    } else {
        passwordSecurityBar.classList.remove('completed')
    }
}

function calculateFontSize(){
    if(passwordLength > 45){
        passwordText.classList.remove('font-sm')
        passwordText.classList.remove('font-xs')
        passwordText.classList.add('font-xxs')
    } else if(passwordLength > 32){
        passwordText.classList.remove('font-sm')
        passwordText.classList.remove('font-xxs')
        passwordText.classList.add('font-xs')
    } else if (passwordLength > 22){
        passwordText.classList.remove('font-xs')
        passwordText.classList.remove('font-xxs')
        passwordText.classList.add('font-sm')
    } else {
        passwordText.classList.remove('font-xs')
        passwordText.classList.remove('font-xxs')
        passwordText.classList.remove('font-sm')
    }
}