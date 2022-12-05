const {toNumber} = require("lodash");

exports.PaginationUtil = async (
    entity,
    rpp = 10,
    page = 1,
    size = 0,
    field = '',
    order = [['id', 'DESC']],
    where = null
) => {
    const offset = toNumber(page) * toNumber(size)
    let fields = []
    if (field.length) {
        fields = field?.split(',')
    }
    console.log(fields)
    return await entity?.findAndCountAll({
        ...where,
        order,
        attributes: fields,
    })
}
