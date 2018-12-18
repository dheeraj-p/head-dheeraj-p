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

const isOptionValueNotValid = optionValue => optionValue < 1 || !isFinite(optionValue);

const validateOffsetHead = function(optionValue, errorMessageProvider, option){
  let isValid = true, error = "";
  let optionDescripitions = {'-c': "byte", "-n": "line"};

  if(isOptionValueNotValid(optionValue)){
    let optionDescription = optionDescripitions[option];
    isValid = false;
    error = errorMessageProvider(optionValue, optionDescription);
  }
  return {isValid, error};
}

const validateOffsetTail = function(optionValue, errorMessageProvider){
  let isValid = true, error = "";
  if(optionValue == 0){
    isValid = false;
  }

  if(isNaN(optionValue)){
    error = errorMessageProvider(optionValue);
    isValid = false;
  }
  return {isValid, error};
} 

module.exports = {
  parseInputs,
  validateOffsetHead,
  isOptionSpecified,
  isNumberOption,
  isOptionWithValue,
  getNormalOptionInputs,
  getNumberOptionInputs,
  getOptionWithValueInputs,
  getDefaultInputs,
  newParsedInputs,
  validateOffsetTail
}