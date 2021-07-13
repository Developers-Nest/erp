import BASEURL from '../../config/server'

async function get(slug, token=null){
    let url = BASEURL+slug
    const response = await fetch( url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}

export default get