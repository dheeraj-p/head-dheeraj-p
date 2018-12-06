const parseInputs = function(inputs){
  let option = '-n';
  let optionValue = '10';
  let fileNames = [...inputs];

  if(inputs[0].startsWith('-')){
    let partOption = inputs[0].substr(1,1); 
    option = inputs[0].substr(0,2);
    optionValue = inputs[0].substr(2);
    fileNames = inputs.slice(1);
    if(isFinite(partOption)){
      optionValue = inputs[0].substr(1);
      option = "-n";
    }
    if(optionValue == ''){
      optionValue = inputs[1];
      fileNames = inputs.slice(2);
    }
  }
  let parsedInputs = {option, optionValue, fileNames};
  return parsedInputs;
}

const validateOptions = function(inputs){
  let optionDescripitions = {'-c': "byte", "-n": "line"};
  let isValid = true, error = "";
  if(inputs.optionValue < 1 || !isFinite(inputs.optionValue)){
    let optionDescription = optionDescripitions[inputs.option];
    isValid = false;
    error = `head: illegal ${optionDescription} count -- ${inputs.optionValue}`;
  }
  return {isValid, error};
}

exports.parseInputs = parseInputs;
exports.validateOptions = validateOptions;
