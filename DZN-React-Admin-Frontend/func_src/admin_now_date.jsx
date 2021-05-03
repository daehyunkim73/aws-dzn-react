export function func_date() {
    const cal_Date = new Date();
    this.now_date = `${cal_Date.getFullYear()}-${cal_Date.getMonth() + 1}-${cal_Date.getDate()} ${cal_Date.getHours()}:${cal_Date.getMinutes()}:${cal_Date.getSeconds()}`
}