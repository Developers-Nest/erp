import BASEURL from '../../config/server'

async function patch(slug, data, token=null){

    let url = BASEURL + slug
    let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json()

}

export default patch