import BASEURL from '../../config/server'

async function post(slug, data, token=null){
    let url = BASEURL + slug
    console.log("POST URL ", url)
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json()

}

export default post