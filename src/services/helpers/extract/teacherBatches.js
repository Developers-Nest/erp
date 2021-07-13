/**
 * @param {function} getTeacherBatches extracts all the batches teacher is taking from userInfo
 * @param {object} userInfo 
 * @returns all the batches teacher is taking
 */


function getTeacherBatches(userInfo){

    if(!userInfo || 
        !userInfo.permRole || 
        !userInfo.permRole.course) return new Error('Invalid Format')

    let course = userInfo.permRole.course[0]

    let batches = course.name

    return batches
}

export default getTeacherBatches