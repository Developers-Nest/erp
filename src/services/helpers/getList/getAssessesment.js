import get from '../request/get'
import read from '../../localstorage/read'

/**
 * @param {string} term term id 
 * @return list of assessments
 */

async function getAssessments(term){

    let slug = `/cce/initial/assessment?termname=${term}`
    let token = await read('token')
    let response = await get(slug, token)
    let assessmentArray = []
    response.map((data) => {
        assessmentArray.push({
            label: data.name,
            key: data._id
        })
    })
    return assessmentArray
}

export default getAssessments