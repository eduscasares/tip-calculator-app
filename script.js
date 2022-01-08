const billAmount = document.getElementById('billAmount');
const defaultTips = document.querySelectorAll('.tip');
const customTip = document.getElementById('customTip');
const numberOfPeople = document.getElementById('numberOfPeople');
const error = document.querySelector('.error');
const results = document.querySelectorAll('.results');
const reset = document.getElementById('reset');


billAmount.addEventListener('input', setBillValue);
defaultTips.forEach(button => {
    button.addEventListener('click', handleClick);
});
customTip.addEventListener('input', setCustomTip);
numberOfPeople.addEventListener('input', setNumberOfPeople);
reset.addEventListener('click', resetToDefault);

function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue(){
    if (billAmount.value.includes(',')){
        billAmount.value = billAmount.value.replace(',', '.');
    }

    if(!validateFloat(billAmount.value)){
        billAmount.value = billAmount.value.substring(0, billAmount.value.length-1);
    }

    billValue = parseFloat(billAmount.value);

    calculateTip();
    console.log(billValue);
}

function handleClick(event){
    defaultTips.forEach(button => {
        //set active state 
        if(event.target.innerHTML == button.innerHTML){
            tipValue = parseFloat(button.innerHTML)/100;
        }
    });

    //clear custom tip
    customTip.value = '';

    calculateTip();

    // console.log(tipValue);
}


function setCustomTip(){
    if(!validateInt(customTip.value)){
        customTip.value = customTip.value.substring(0, customTip.value.length-1);
    }
    
    tipValue = parseFloat(customTip.value/100);

    if(customTip.value !== ''){
        calculateTip();
    }
    
    console.log(tipValue);
}


function setNumberOfPeople(){
    if(!validateInt(numberOfPeople.value)){
        numberOfPeople.value = numberOfPeople.value.substring(0, numberOfPeople.value.length-1);
    }

    peopleValue = parseFloat(numberOfPeople.value);

    if(peopleValue <= 0){
        error.classList.add('showError');
        numberOfPeople.classList.add('showError');
    } else {
        error.classList.remove('showError');
        numberOfPeople.classList.remove('showError');
    }

    calculateTip();
    // console.log(peopleValue);
}

function calculateTip(){
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

function resetToDefault(){
    billAmount.value = '0.0';
    setBillValue();

    defaultTips[2].click();

    numberOfPeople.value = '1';
    setNumberOfPeople();
}