import get from '../request/get';
import read from '../../localstorage/read';

/**
 * @param {string} term term id
 * @return list of assessments
 */

async function getEmployee(term) {
  let slug = `/employee`;
  let token = await read('token');
  let response = await get(slug, token);
  let list = [];
  response.map(employee => {
    list.push({
      key: employee._id,
      label: employee.firstName,
    });
  });

  return list;
}

export default getEmployee;
