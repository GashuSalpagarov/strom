var numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear__btn'),
    ce = document.getElementById('ce'),
    c = document.getElementById('c'),
    result = document.getElementById('result'),
    display = document.getElementById('display'),
    history = document.getElementById('history'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '',
    tip = document.querySelector('.calculator__tip'),
    openTipBtn = document.querySelector('.btn__open--tip');
    closeTipBtn = document.querySelector('.btn__close--tip');

for(var i=0; i<numbers.length; i++){
    var number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
};

for(var i=0; i<operations.length; i++){
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
};

for(var i=0; i<clearBtns.length; i++){
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e){
        clear(e.srcElement.id);
    });
};

c.addEventListener('click', clear);
ce.addEventListener('click', clear);
decimalBtn.addEventListener('click', decimal);
openTipBtn.addEventListener('click', openTip);
closeTipBtn.addEventListener('click', closeTip);

function numberPress(number) {
    if(MemoryNewNumber){
        display.value = number;
        MemoryNewNumber = false;
    } else{
        if(display.value === '0'){
            display.value = number; 
        } else{
            display.value += number;    
        };
    };
};

function operation(op) {
    var localOperationMemory = display.value;

    if(MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else{
        MemoryNewNumber = true;    
        if(MemoryPendingOperation === '+'){
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if(MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if(MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if(MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else{
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        }
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    };
};


function decimal() {
    if(MemoryNewNumber) {
        display.value = '0.';
        MemoryNewNumber = false;
    } else {
        if (display.value.indexOf('.') === -1){
            display.value +='.';
        };
        
    };
};

function clear(id) {
    if(id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        history.value = '';
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };
};
function openTip(){
    tip.style.opacity = "1",
    tip.style.left = "auto";
};
function closeTip(){
    tip.style.opacity = "0",
    tip.style.left = "-2000px";
};