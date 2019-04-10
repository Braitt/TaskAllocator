let anamagrama = function (str1, str2) {
    let hash = {};
    for (char in str1) {
        if (hash[char]) {
            hash[char] += 1;
        }
        else {
            hash[char] = 1;
        }
    }
    // Aquí en hash esta cada letra como llave y como valor cuantas veces aparece en str1
    let count = 0;
    for (char in str2) {
        if (hash[char]) {
            hash[char] -= 1;
        }
        else {
            count += 1;
        }
    }
    const array = Object.keys(hash); // ['a', 'b']
    for (let k = 0; k < array.length; k++) {
        count += Math.abs(hash[array[k]]);
    }
    return count;
}