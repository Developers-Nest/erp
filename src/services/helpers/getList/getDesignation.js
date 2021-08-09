import get from '../request/get'
import read from '../../localstorage/read'

/**
 *
 * @returns array of designation
 */

async function getDesignation() {

    let slug = `/designation`
    let token = await read('token')
    let response = await get(slug, token)
    console.log("Designation ", response)
    let designationArray = []
    response.map((data) => {
        designationArray.push({
            label: data.name,
            key: data._id
        })
    })

    return designationArray

}

export default getDesignation