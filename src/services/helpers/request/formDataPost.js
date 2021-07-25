import BASEURL from '../../config/server'

/**
 * @param {data} formData 
 * @returns 
 */


async function post(slug, data, token = null) {
    let url = BASEURL + slug
    let response = await fetch(url, {
        method: 'post',
        body: data,
        headers: {
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data; ',
        }
    })

    return response.json()

}

export default post