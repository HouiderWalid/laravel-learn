function capitalizeFirstWord(value) {
    if (!value) return ''
    value = value.toString().trim()
    return value.charAt(0).toUpperCase() + value.slice(1)
}

function capitalizeWords(value) {
    if (!value) return ''
    value = value.toString().trim()
    let allWords = value.split(' ')
    if (allWords.length < 2) return capitalizeFirstWord(value)
    else {
        let allWordsCqp = ''
        allWords.forEach(word => allWordsCqp = allWordsCqp + ' ' + capitalizeFirstWord(word))
        return allWordsCqp.trim()
    }
}

const capfw = {
    name: 'capfw',
    methode: capitalizeFirstWord
}

const capw = {
    name: 'capw',
    methode: capitalizeWords
}

export default {
    capfw,
    capw
}
