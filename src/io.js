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
      optionValue = partOption;
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

exports.parseInputs = parseInputs;
