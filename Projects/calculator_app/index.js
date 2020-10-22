const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.keys')
const numberDisplay = document.querySelector('.display')

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)

    if (operator === 'add') return firstNum + secondNum
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
}

const operatorText = {
    add : '+',
    subtract : '-',
    multiply: '*',
    divide: '/'
}

keys.addEventListener('click', e => {
    const key = e.target
    const action = key.dataset.action
    const keyText = key.textContent
    const previousAction = calculator.dataset.previousAction    
    const numberDisplayed = numberDisplay.textContent
    const modValue = calculator.dataset.modValue

    

    //if key is number
    if (!action) { 
        const operator = calculator.dataset.operator      
       if (numberDisplayed === '0' || previousAction === 'operator' || previousAction === 'calculate') {
           
           numberDisplay.textContent = keyText                    
                          
       } else {
           numberDisplay.textContent = numberDisplayed + keyText
       }
      
       calculator.dataset.previousAction = 'number'
       console.log('is number')
    }

    //if key is a operator
    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = numberDisplayed

        if (firstValue && operator && previousAction !== 'operator' && previousAction !== 'calculate') {
            const calcValue = calculate(firstValue, operator, secondValue)
            numberDisplay.textContent = calcValue
            calculator.dataset.firstValue = calcValue
           
        } else {            
            calculator.dataset.firstValue = numberDisplayed
        }
        key.classList.add('is-depressed')
        
        calculator.dataset.previousAction = 'operator'       
        calculator.dataset.operator = action
        console.log("is operator")
    }

    //if key is decimal
    if (action === 'decimal') {
        if (!numberDisplayed.includes('.')) {
            numberDisplay.textContent = numberDisplayed + '.'
        } else if (previousAction === 'operator' || previousAction === 'calculate') {
            numberDisplay.textContent = '0.'
        }        
        calculator.dataset.previousAction = 'decimal'
        console.log("is decimal")
    }

    //if key is calculate
    if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        let secondValue = numberDisplayed
        

        if (firstValue) {
            if (previousAction === 'calculate') {
                firstValue = numberDisplayed
                secondValue = calculator.dataset.modValue
                
            }             
            numberDisplay.textContent = calculate(firstValue, operator, secondValue)
        }         
        
        calculator.dataset.modValue = secondValue
        calculator.dataset.previousAction = 'calculate'
        console.log("is calculate")
    }

    //if key is clear AC
    if (action === 'clear') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousAction = ''          
        
        numberDisplay.textContent = 0
        calculator.dataset.previousAction = 'clear'
        console.log("is clear")
    }

    if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'AC'

    }

    //remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
})
