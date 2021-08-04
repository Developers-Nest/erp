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
    
    const response = await fetch( url, {
        method: 'GET',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}

export default get