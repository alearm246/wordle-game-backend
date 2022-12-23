function convertCamalToSnake(camelCasedVariable) {
    const [camelCasedVariableString] = Object.keys({camelCasedVariable});
    const cameCasedVariableArray = camelCasedVariableString.split("");
    const snakeCased = cameCasedVariableArray.map(letter => {
        if(letter === letter.toUpperCase()) {
            return "_" + letter.toLocaleLowerCase();
        } else {
            return letter;
        }
    })
    return snakeCased.join("");
}

module.exports = convertCamalToSnake;