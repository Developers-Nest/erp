import get from '../request/get'
import read from '../../localstorage/read'

/**
 * @param {designation} string designation id 
 * @returns array of names 
 */

async function getHRname(designation) {

    let slug = `/employee?designation=${designation}`
    let token = await read('token')
    let response = await get(slug, token)
    console.log("HRnames ", response)
    let namearray = []
    response.map((data) => {
        namearray.push({
            label: data.firstName,
            key: data._id
        })
    })

    return namearray

}

export default getHRname