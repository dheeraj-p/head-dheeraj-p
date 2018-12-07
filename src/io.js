const HEAD_USAGE = "usage: head [-n lines | -c bytes] [file ...]";

const isOptionSpecified = optionCandidate => optionCandidate.startsWith('-');

const parseInputs = function(inputs){ 
  let option = '-n';
  let optionValue = '10';
  let fileNames = [...inputs];

  if(isOptionSpecified(inputs[0])){
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

const isOptionValid = function(option){
  return option == "-n" || option == "-c";
}

const validateOptionValue = function(option, optionValue){
  let isValid = true, error = "";
  let optionDescripitions = {'-c': "byte", "-n": "line"};
  if(optionValue < 1 || !isFinite(optionValue)){
    let optionDescription = optionDescripitions[option];
    isValid = false;
    error = `head: illegal ${optionDescription} count -- ${optionValue}`;
  }
  return {isValid, error};
}

const validateInputs = function(inputs){
  if(!isOptionValid(inputs.option)){
    let error = "head: illegal option -- " + inputs.option.substr(1);
    error = error + "\n" + HEAD_USAGE;
    return {isValid: false, error};
  }
  return validateOptionValue(inputs.option, inputs.optionValue);
}

exports.parseInputs = parseInputs;
exports.validateInputs = validateInputs;
exports.isOptionValid = isOptionValid;
exports.validateOptionValue = validateOptionValue;
exports.isOptionSpecified = isOptionSpecified;
