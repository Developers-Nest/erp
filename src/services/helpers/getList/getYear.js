/**
 * @returns {array} month names
 */

function getYear() {
  var d = new Date();
  let currentyear = d.getUTCFullYear();
  let years = [];
  for (let i = 2020; i <= currentyear; i++) {
    years.push({key: i - 2020, label: i});
  }
  return years;
}

export default getYear;
