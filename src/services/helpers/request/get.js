import BASEURL from '../../config/server'
import CHATBASEURL from '../../config/chatserver'

// server > 0 represents chat service

async function get(slug, token=null, server=0){
    let url = '', auth = ''
    if(server>0){
        url = CHATBASEURL + slug
        auth = `${token}`
    }
    else{
        url = BASEURL + slug 
        auth = `Bearer ${token}`
    } 

    console.log('Auth ', auth)
    console.log('URL ', url)

    const response = await fetch( url, {
        method: 'GET',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        }
    })

    console.log('Response ', response)

    return response.json()
}

export default get