import get from '../request/get'
import read from '../../localstorage/read'

/**
 * @returns array of courses
 */

async function getCourse(){
    let token = await read('token')
    let response = await get('/course', token)
    let courseArray = []
    response.map((data)=>{
    courseArray.push({
        label: data.courseName,
        key: data._id
    })
    })
    return courseArray

}

export default getCourse