import moment from "moment";

export const Time = (value) => {
  var time = moment(value).format("LT");
  return time;
};

export const DateFormet = (value) => {
  var date = moment(value).format("L");
  return date;
};
