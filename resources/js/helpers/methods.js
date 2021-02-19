export function DateDifference(dateOne, dateTwo, converter){
    if (!(dateOne instanceof Date) || !(dateTwo instanceof Date)) throw 'The date must be an instance of Date.'
    let date_difference = dateOne - dateTwo
    this.state = date_difference > 0 ? '+' : '-'
    let time = {
        y:   { worth: 31556952000, val: 0 },
        m:   { worth: 2629746000, val: 0 },
        d:   { worth: 86400000, val: 0 },
        h:   { worth: 3600000, val: 0 },
        min: { worth: 60000, val: 0 },
        s:   { worth: 1000, val: 0 },
        ms:  { worth: 1, val: 0 }
    }
    let result = {}
    let rest = Math.abs(date_difference)
    Object.keys(time).forEach(key => {
        if(rest/time[key].worth >= 1){
            time[key].val = Math.floor(rest/time[key].worth)
            rest = rest%time[key].worth
        }
        result[key] = time[key].val
    })

    getTimeAgo.call(this, result, converter)
}

function getTimeAgo(date, converter){
    if(!(date instanceof Object)) throw 'The date must be an instance of object.'
    let time_ago = {}
    for (let key of Object.keys(date)) {
        let nb = parseInt(date[key])
        if(nb >= 1) {
            time_ago['name'] = key
            time_ago['val'] = nb
            break
        }
    }
    if(converter == null) convertTimeToString.call(this, time_ago)
    else converter.call(this, time_ago)
}

function convertTimeToString(date){
    let time = date.name === 'y' ? 'year' : date.name === 'm' ? 'month' : date.name === 'd' ? 'day' : date.name === 'h' ? 'hour' : date.name === 'min' ? 'minute' : 'second'
    this.date_converted = date.val > 1 ? date.val + ' ' + time + 's' : date.val + ' ' + time
    this.date_converted = this.state === '-' ? 'in ' + this.date_converted : this.date_converted + ' ago'
}
