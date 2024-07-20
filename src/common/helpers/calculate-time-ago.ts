// import
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const calcTimeAgo = (date: Date | number) => {
  return timeAgo.format(new Date(date));
};

export default calcTimeAgo;