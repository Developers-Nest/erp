import get from '../request/get';
import read from '../../localstorage/read';

/**
 * @param {course} string course id
 * @returns array of batches
 */

async function getStudents(course, batch) {
  let slug = `/student/course?course=${course}&batch=${batch}`;
  console.log('Students slug ', slug);
  let token = await read('token');
  let response = await get(slug, token);
  console.log('Students ', response);

  return response;
}

export default getStudents;
