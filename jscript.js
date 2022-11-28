function cardCheck() {

    let varHolder = document.getElementById('cardholder');
    let varNumber = document.getElementById('cardnumber');
    let varYear = document.getElementById('cardyear');
    let varMonth = document.getElementById('cardmonth');
    let varCvc = document.getElementById('cardcvc');  

    let regex = new RegExp('^[0-9]*$');
    let isValidNumber = regex.test (varNumber.value.replace(/\s/g, '')); 
    let isValidMonth = regex.test (varMonth.value);  
    let isValidYear = regex.test (varYear.value);  
    let isValidCvc = regex.test (varCvc.value);   

    let regex1= new RegExp('^[a-zA-Z ]*$');
    let isValidName = regex1.test (varHolder.value); 

    if (varNumber.value.replace(/\s/g, '').length === 16 === true 
        && isValidNumber === true
        && varHolder.value.length >= 3 === true 
        && isValidName === true
        && varYear.value.length === 2 === true 
        && varYear.value <= 26 === true
        && isValidYear === true
        && varMonth.value.length === 2 === true
        && varMonth.value <= 12 === true
        && isValidMonth === true
        && varCvc.value.length === 3 === true
        && isValidCvc === true) {

        let parent = document.getElementById('right');
        let child = document.getElementById('info');
        parent.removeChild(child);

        document.getElementById('mid').textContent = varNumber.value;
        document.getElementById('identity').textContent = varHolder.value;
        document.getElementById('identity').style.letterSpacing= "0";
        document.getElementById('year').textContent = varMonth.value +"/"+ varYear.value;
        document.getElementById('cvc').textContent = varCvc.value;

            let heading = document.createElement('h1');
            heading.textContent = 'THANK YOU!';
            heading.id= 'heading';

            let para = document.createElement('p');
            para.textContent = 'We have added your card details';
            para.id= 'para';

            let button = document.createElement('button');
            button.id= 'button';
            button.textContent = 'Continue';

            let image = document.createElement('img');
            image.id= 'image';
            image.src='./images/icon-complete.svg';

            parent.appendChild(image);
            parent.appendChild(heading);
            parent.appendChild(para);
            parent.appendChild(button);
    }

    else {

        if (varHolder.value.length >= 3 !== true || isValidName !== true){
            varHolder.style.borderColor = 'red';
        } else {varHolder.style.borderColor = 'hsl(270, 3%, 87%'}

        if (varYear.value.length === 2 !== true || varYear.value <= 26 !== true || isValidYear !== true){
            varYear.style.borderColor = 'red';
        } else {varYear.style.borderColor = 'hsl(270, 3%, 87%'}

        if (varMonth.value.length === 2 !== true || varMonth.value <= 12 !== true || isValidMonth !== true){
            varMonth.style.borderColor = 'red';
        } else {varMonth.style.borderColor = 'hsl(270, 3%, 87%'}

        if (varCvc.value.length === 3 !== true || isValidCvc !== true){
            varCvc.style.borderColor = 'red';
        } else {varCvc.style.borderColor = 'hsl(270, 3%, 87%'}

        if (varNumber.value.replace(/\s/g, '').length === 16 !== true || isValidNumber !== true){
            varNumber.style.borderColor = 'red';
        } else {varNumber.style.borderColor = 'hsl(270, 3%, 87%'}
    }
}

function inputCreditCard(input) {

  var formatedInput = function(char, backspace){
    var start = 0;
    var end = 0;
    var pos = 0;
    var separator = " ";
    var value = input.value;
  
    if (char !== false){
      start = input.selectionStart;
      end = input.selectionEnd;
  
        if (backspace && start > 0){
          start--;
  
          if (value[start] == separator){ 
            start--; 
          }
        }

      value = value.substring(0, start) + char + value.substring(end);
      pos = start + char.length; 
    }
  
    var d = 0; 
    var dd = 0; 
    var gi = 0; 
    var newV = "";
    var groups = /^\D*3[47]/.test(value) ? [4, 6, 5] : [4, 4, 4, 4];  
      
    for (var i = 0; i < value.length; i++){
        
      if (/\D/.test(value[i])){
        
        if (start > i){ 
          pos--; 
        }
      }

      else {
        if (d === groups[gi]){
          newV += separator;
          d = 0;
          gi++;
    
          if (start >= i){
            pos++; 
          }
        }

        newV += value[i];
        d++;
        dd++;
      }

      if (d === groups[gi] && groups.length === gi + 1){ 
        break; 
      }
    }
    
    input.value = newV;
    
    if (char !== false){ 
      input.setSelectionRange(pos, pos); 
    }
  }
  
  input.addEventListener('keypress', function(e){
            
    var code = e.charCode || e.keyCode || e.which;

    if (code !== 9 && (code < 37 || code > 40) && !(e.ctrlKey && (code === 99 || code === 118))){
        
      e.preventDefault();
      var char = String.fromCharCode(code);
        
      if (/\D/.test(char) || (this.selectionStart === this.selectionEnd &&
        this.value.replace(/\D/g, '').length >= (/^\D*3[47]/.test(this.value) ? 15 : 16))){          
        return false;
      }
        
      formatedInput(char);     
    }
  });

  input.addEventListener('keydown', function(e){
    
    if (e.keyCode === 8 || e.keyCode === 46) {
      e.preventDefault();
      formatedInput('', this.selectionStart === this.selectionEnd);
    }
  });
        
  input.addEventListener('paste', function() {
    setTimeout(function(){ formatedInput(''); }, 50);
  });
}
        
window.onload = afterDomIsLoaded;

function afterDomIsLoaded() {
  let cardNumberElement = document.querySelector('#cardnumber');
  inputCreditCard(cardNumberElement);
}

