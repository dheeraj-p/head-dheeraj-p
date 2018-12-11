const HEAD_USAGE = "usage: head [-n lines | -c bytes] [file ...]";

const isOptionSpecified = optionCandidate => {
  return optionCandidate.startsWith('-') && optionCandidate.length > 1;
}

const isNumberOption = option => isFinite(option.substr(1,1));

const isOptionWithValue = option => option.length > 2;

const newParsedInputs = function(option, optionValue, fileNames) {
 return {option, optionValue, fileNames}; 
}

const getNumberOptionInputs = inputs => {
  return newParsedInputs('-n', inputs[0].substr(1), inputs.slice(1));
}

const getOptionWithValueInputs = inputs => {
  return newParsedInputs(inputs[0].slice(0,2), inputs[0].substr(2), inputs.slice(1));
}

const getNormalOptionInputs = inputs => {
  return newParsedInputs(inputs[0], inputs[1], inputs.slice(2));
}

const getDefaultInputs = inputs => {
  return newParsedInputs('-n', 10, [...inputs]);
}

const parseInputs = function(inputs){ 
  const option = inputs[0];
  if(!isOptionSpecified(option)){
    return getDefaultInputs(inputs);
  }

  if(isNumberOption(option)){
    return getNumberOptionInputs(inputs);
  }

  if(isOptionWithValue(option)){
    return getOptionWithValueInputs(inputs);
  }

  return getNormalOptionInputs(inputs);
}

const isOptionValid = function(option){
  return option == "-n" || option == "-c";
}

const isOptionValueValid = optionValue => optionValue < 1 || !isFinite(optionValue);

const validateOptionValue = function(option, optionValue){
  let isValid = true, error = "";
  let optionDescripitions = {'-c': "byte", "-n": "line"};
  if(isOptionValueValid(optionValue)){
    let optionDescription = optionDescripitions[option];
    isValid = false;
    error = `head: illegal ${optionDescription} count -- ${optionValue}`;
  }
  return {isValid, error};
}

const validateOffset = function(optionValue){
  let isValid = true, error = "";
  if(isNaN(optionValue)){
    error = `tail: illegal offset -- ${optionValue}`;
    isValid = false;
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
exports.isNumberOption = isNumberOption;
exports.isOptionWithValue = isOptionWithValue;
exports.getNormalOptionInputs = getNormalOptionInputs;
exports.getNumberOptionInputs = getNumberOptionInputs;
exports.getOptionWithValueInputs = getOptionWithValueInputs;
exports.getDefaultInputs = getDefaultInputs;
exports.newParsedInputs = newParsedInputs;
exports.validateOffset = validateOffset;
