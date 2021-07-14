import get from '../request/get'
import read from '../../localstorage/read'

/**
 * @param {course} string course id 
 * @returns array of batches
 */

async function getBatch(course) {

    let slug = `/batch?course=${course}`
    let token = await read('token')
    let response = await get(slug, token)
    console.log("Batch ", response)
    let batchArray = []
    response.map((data) => {
        batchArray.push({
            label: data.batchName,
            key: data._id
        })
    })

    return batchArray

}

export default getBatch