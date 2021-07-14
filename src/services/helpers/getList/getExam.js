import get from '../request/get'
import read from '../../localstorage/read'

/**
 * @param {string} course course id
 * @param {string} batch batch id
 * @param {string} subject subject id
 * @param {string} term term id
 * @param {string} assessment assessment id
 * @returns array of exams
 */

async function getExam(course, batch, subject, term, assessment) {

    let slug = `/cce/exam/exam?term=${term}&assessment=${assessment}&course=${course}&batch=${batch}&subject=${subject}`
    console.log('Exam slug ', slug)
    let token = await read('token')
    let response = await get(slug, token)
    console.log("Exam response ", response)
    let examArray = []
    response.map((data) => {
        examArray.push({
            label: data.exam.name,
            key: data._id
        })
    })
    return examArray

}

export default getExam