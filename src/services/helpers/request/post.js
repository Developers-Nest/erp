import BASEURL from '../../config/server'
import CHATBASEURL from '../../config/chatserver'

// server > 0  represents chat service

async function post(slug, data, token=null, server=0){

    let url
    if(server>0){
      url = CHATBASEURL + slug
    } else url=BASEURL + slug

    let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json()

}

export default post