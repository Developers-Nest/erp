import get from '../request/get';
import read from '../../localstorage/read';

/**
 * @return list of assessments
 */

async function getUserType() {
  let slug = `/usertype`;
  let token = await read('token');
  let response = await get(slug, token);
  let list = [];
  response.map(usertype => {
    list.push({
      key: usertype.name,
      label: usertype.name,
      id: usertype._id,
    });
  });

  return list;
}

export default getUserType;
