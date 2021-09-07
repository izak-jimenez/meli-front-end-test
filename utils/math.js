/**
 * splitFloatingPointNumber function
 * This function takes a float as input and returns its integer and decimal portions
 * @param {number} float
 * @returns {object}
 */

export const splitFloatingPointNumber = (float) => {
  const integerPart = Math.trunc(float);
  const decimalPart = (float % 1).toFixed(2).substring(2);
  return {
    integer: integerPart,
    decimal: decimalPart,
  };
};
