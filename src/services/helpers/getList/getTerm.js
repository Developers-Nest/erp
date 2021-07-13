import get from '../request/get'
import read from '../../localstorage/read'


async function getTerms() {

    let slug = '/cce/initial/assessmentterm'
    let token = await read('token')
    let response = await get(slug, token)
    console.log("Term Array ", response)
    let termArray = []
    response.map((data) => {
        termArray.push({
            label: data.name,
            key: data._id
        })
    })
    return termArray

}

export default getTerms