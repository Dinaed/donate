import moment from "moment/moment";

export function calculateSumOfNumbers(number) {
  return number.reduce((acc, arg) => acc + arg, 0);
}

export function getFormattedTime(date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}