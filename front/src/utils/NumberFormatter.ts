import numeral from "numeral";

const convertToAccountingFormat = (number: string) => {
  return numeral(number).format(`0,0`);
};

export default convertToAccountingFormat;
