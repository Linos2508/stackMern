export function inArray(needle, haystack = []) {
    if (haystack.length > 0) {
        let length = haystack.length;
        for (let i = 0; i < length; i++) {
            if (haystack[i] === needle) return true;
        }
    }
    return false;
}
export function dateFormat(type, dateOb) {
    let r;
    let y = dateOb.getFullYear();
    let m = ("0" + (dateOb.getMonth() + 1)).substr(-2);
    let d = ("0" + dateOb.getDate()).substr(-2);
    switch (type) {
        case 1:
            r = d + "/" + m + "/" + y;
            break;
        case 2:
            r = y + "-" + m + "-" + d;
            break;
        case 3:
            r = y + "-" + m + "-" + d + "T" + dateOb.getHours() + ":"  + dateOb.getMinutes();
            console.log(r);
            break;
        default:
            r = d + "/" + m + "/" + y;
            break;
    }
    return r;
}
export function getBaseApi() {
    return "http://localhost:5000";
}