const parseInputs = function(inputs){
  let parsedInputs = {option: 'n', optionValue : 10};
  parsedInputs.fileNames = [...inputs];
  return parsedInputs;
}

exports.parseInputs = parseInputs;
