import get from '../request/get'
import read from '../../localstorage/read'

/**
 * @param {string} course course id
 * @param {string} batch batch id
 * @returns array of subjects
 */

async function getSubject(course, batch) {

    let slug = `/subject/assign?course=${course}&batch=${batch}`
    let token = await read('token')
    let response = await get(slug, token)
    let subjectArray = []
    response.map((data) => {
        subjectArray.push({
            label: data.subject,
            key: data.subjectId
        })
    })
    return subjectArray

}

export default getSubject