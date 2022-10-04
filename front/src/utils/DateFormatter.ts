import { Temporal } from "@js-temporal/polyfill";

const DateFormatter = (date: string) => {
  const formatDate = Temporal.PlainDateTime.from(date).add({ hours: 9 });
  const currentDate = Temporal.Now.plainDateTimeISO();
  const result = currentDate.since(formatDate);
  if (result.months !== 0) {
    return `${result.months}달 전`;
  } else if (result.days !== 0) {
    return `${result.days}일 전`;
  } else if (result.hours !== 0) {
    return `${result.hours}시간 전`;
  } else if (result.minutes !== 0) {
    return `${result.minutes}분 전`;
  } else {
    return `${result.seconds}초 전`;
  }
};

export default DateFormatter;
