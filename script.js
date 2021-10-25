'use strict'


let display = document.getElementById('display')
let numbers = document.querySelectorAll('[id*=tecla]')
let operations = document.querySelectorAll('[id*=operation]')

let newNumber = true
let operator
let lastNumber

const pendingOperation = () => operator !== undefined

const calculate = () => {
    if (pendingOperation()) {
        const realTimeNumber = parseFloat(display.textContent.replace(',','.'))
        newNumber = true
        const result = eval (`${lastNumber}${operator}${realTimeNumber}`)
        updateDisplay(result)
    }    
    
}

const updateDisplay = (number) => {
    if (newNumber) {
        display.textContent = number.toLocaleString('BR')
        newNumber = false
    }else{
        display.textContent += number.toLocaleString('BR')
    }
}

const displayNumbers = (event) => {
    updateDisplay(event.target.value)
} 
numbers.forEach(number => number.addEventListener('click', displayNumbers))

const selectOperation = (event) => {
    if (!newNumber) {   
        calculate() 
        newNumber = true
        operator = event.target.value
        lastNumber = parseFloat(display.textContent.replace(',','.'))
    }

}
 
operations.forEach(operation => operation.addEventListener('click',selectOperation))

const equalButton = () => {
    calculate()
    operator = undefined
}
document.getElementById('btn-equal').addEventListener('click', equalButton)

const clearScreen = () => {
     display.textContent =''
     operator = undefined
     newNumber = true
     lastNumber = undefined
}
document.getElementById('clear-screen').addEventListener('click', clearScreen)

const removeLastNumber = () => display.textContent = display.textContent.slice(0, -1)
document.getElementById('back').addEventListener('click', removeLastNumber)

const changeSignal = () => {
    newNumber = true    
    updateDisplay(display.textContent * -1)
}
document.getElementById('change-signal').addEventListener('click', changeSignal)

const existDecimal = () => display.textContent.indexOf(',') !== -1
const existNumber = () => display.textContent.length > 0
const insertNumber = () =>{
    if (!existDecimal()) {
        if (existNumber()) {
            updateDisplay(',')
        }else{
            updateDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertNumber)

const keyboards = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'split-operation',
    '*'         : 'multiplication-operation',
    '-'         : 'subtract-operation',
    '+'         : 'sum-operation',
    '='         : 'btn-equal',
    'Enter'     : 'btn-equal',
    'Backspace' : 'back',
    'c'         : 'clear-screen',
    'Escape'    : 'clear-screen',
    ','         : 'decimal'
}

const mapKeyboard = (event) => {
    const keyboard = event.key
    const allowedKey = () => Object.keys(keyboards).indexOf(keyboard) !== -1
    if (allowedKey()) document.getElementById(keyboards[keyboard]).click()       
}
document.addEventListener('keydown',mapKeyboard)

const porcentageButton = () =>{
    const numberPorcent = display.textContent
    const result =  eval(`${lastNumber}${operator}${(lastNumber / 100) * numberPorcent} `)
    newNumber = true
    updateDisplay(result)   
}
document.getElementById('btn-porcent').addEventListener('click', porcentageButton)