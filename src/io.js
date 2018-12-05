const parseInputs = function(inputs){
  let option = '-n';
  let optionValue = '10';
  let fileNames = [...inputs];

  let optionMatched = inputs[0].match(/^-(n|c)/);
  if(optionMatched != null){
    option = optionMatched[0];
    optionValue = inputs[0].substr(2);
    fileNames = inputs.slice(1);
    if(optionValue == ''){
      optionValue = inputs[1];
      fileNames = inputs.slice(2);
    }
  }

  let parsedInputs = {option, optionValue, fileNames};
  return parsedInputs;
}

exports.parseInputs = parseInputs;
