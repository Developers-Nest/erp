function buildTeacherTimetableDayWise(data){
    let timeTable = {
        'Monday': [],
        'Tuesday': [],
        'Wednesday': [],
        'Thursday': [],
        'Friday': [],
        'Saturday': [],
        'Sunday': []
    }    

    data.map((cls)=>{
        let days = cls.days // days
        days.map((day)=>{
            timeTable[day.name].push(day.periods)
        })
    })

    return timeTable

}

export default buildTeacherTimetableDayWise