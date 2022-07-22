const buttonNumber = document.querySelectorAll('.buttonNumber');
const buttonOperator = document.querySelectorAll('.buttonOperator');
const buttonEqual = document.querySelector('.buttonEqual');
const buttonDecimal = document.querySelector('.buttonDecimal');

const PreviousResult = document.querySelector('.previous-result')
const CurrentResult = document.querySelector('.current-result')

const clearButton = document.querySelector('.clearButton');
const deleteButton = document.querySelector('.deleteButton');



class Calculator {
    constructor(PreviousResult,CurrentResult){
        this.PreviousResult = PreviousResult;
        this.CurrentResult = CurrentResult;
        this.clear();
    }

    clear() {
        this.CurrentOperand = '';
        this.PreviousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.CurrentResult.textContent = this.CurrentResult.textContent.slice(0,-1)
    }

    appendNumber(number){
        if(number == '.' && this.CurrentOperand.includes('.')) return;
        this.CurrentOperand = this.CurrentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.CurrentOperand === '') return 
        if(this.PreviousOperand !== ''){
            this.compute();
        }

        this.operation = operation;
        this.PreviousOperand = this.CurrentOperand;
        this.CurrentOperand = ''
    }

    compute(){
        let result;
        const prev = Number(this.PreviousOperand);
        const current = Number(this.CurrentOperand)

        if(isNaN(prev) || isNaN(current)) return 

        switch(this.operation){
            case '+' :
                result = prev + current;
                break
            case '-' :
                result = prev - current;
                break
            case '*' :
                result = prev *  current;
                break
            case '/' :
                result = prev / current;
                break
            default:
                return;
        }

        this.CurrentOperand = result
        this.operation = undefined;
        this.PreviousOperand = ''
    }

    updateDisplay(){

        this.CurrentResult.textContent = this.CurrentOperand;
        if(this.operation != null){
            this.PreviousResult.textContent = this.PreviousOperand + " " + this.operation;
        } else {
            this.PreviousResult.textContent = ''
        }

    }
}


const calculator = new Calculator(PreviousResult,CurrentResult)




clearButton.addEventListener('click',() => {
    calculator.clear();
    calculator.updateDisplay();
})


deleteButton.addEventListener('click',() => {
    calculator.delete();
})

buttonNumber.forEach(button => {    
    button.addEventListener('click',(e) => {
        calculator.appendNumber(e.target.textContent);
        calculator.updateDisplay();
    })
})

buttonOperator.forEach(button => {
    button.addEventListener('click',(e) => {
        calculator.chooseOperation(e.target.textContent);
        calculator.updateDisplay();
    })
})


buttonEqual.addEventListener('click',() => {
    calculator.compute();
    calculator.updateDisplay();
})






