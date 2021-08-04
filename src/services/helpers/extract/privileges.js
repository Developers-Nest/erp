/**
 * @returns user priviledges
 */
function privileges(res) {
    let currentRole = res.userType
    let list = res.list
    let privilegesMap = {}
    list.map((r) => {
        r.routes.map((route) => {
            if (route.show && route.menuFor.find(role => role === currentRole)) {
                privilegesMap[route.title] = true
            }
        })
    })
    return privilegesMap
}

export default privileges