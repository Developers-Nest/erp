import get from '../request/get';
import read from '../../localstorage/read';

/**
 * @return list of assessments
 */

async function getEmployee() {
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
