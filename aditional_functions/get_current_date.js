function date(){
    const currentDate = new Date();

    const year = currentDate.getFullYear();

    let month = currentDate.getMonth() + 1;  // getMonth() returns a value from 0 to 11, so we need to add 1
    if (month < 10) {
    month = `0${month}`;
    }

    let day = currentDate.getDate();
    if (day < 10) {
    day = `0${day}`;
    }

    return `${year}-${month}-${day}`;

}
module.exports= date