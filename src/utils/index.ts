import jwt from "jsonwebtoken";
import moment from "moment";
import numeral from "numeral";

export const formatNumeral = (value: string | number, type = "0.0a") => {
  if (!value) return;
  let result = numeral(value).format(type);
  result = result.replace("m", " Tr").replace("k", " N").replace(/,/g, ".");
  return result;
};

export const formatMoment = (value: any, type: string | null) => {
  if (!value) return;
  switch (type) {
    case "duration":
      const seconds = moment.duration(value).asSeconds();
      const _duration = moment.utc(seconds * 1000).format("mm:ss");
      return _duration;
    default:
      return moment(value).fromNow();
  }
};

export const decodeAuthToken = (token: string) => jwt.decode(token);
