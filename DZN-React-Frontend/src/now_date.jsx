export function func_date(today_date) {
  const cal_Date = new Date();
  today_date(
    `${cal_Date.getFullYear()}-${
      cal_Date.getMonth() + 1
    }-${cal_Date.getDate()} ${cal_Date.getHours()}:${cal_Date.getMinutes()}:${cal_Date.getSeconds()}`
  ); //set임
}

export function test() {
  const cal_Date = new Date();
  this.date = `${cal_Date.getFullYear()}-${
    cal_Date.getMonth() + 1
  }-${cal_Date.getDate()} ${cal_Date.getHours()}:${cal_Date.getMinutes()}:${cal_Date.getSeconds()}`;
}
