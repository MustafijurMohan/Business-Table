const ProductsModel = require('../models/ProductModel')


exports.ProductList = async (req, res) => {
    try {

        const pageNo =  Number(req.params.pageNo)
        const perPage =  Number(req.params.perPage)
        const searchValue =  req.params.searchKeyword
        const skipRow = (pageNo - 1) * perPage

        let data

        if (searchValue !== '0') {
            let SearchRgx = {'$regex': searchValue, '$options': 'i'}
            let SearchQuery = {$or: [ {title: SearchRgx}, {category: SearchRgx}, {subcategory: SearchRgx}, {brand: SearchRgx}, {remark: SearchRgx}, ]}

            data = await ProductsModel.aggregate([{
                $facet: {
                    Total: [{$match: SearchQuery}, {$count: 'Count'}],
                    Rows: [{$match: SearchQuery}, {$skip: skipRow}, {$limit: perPage}]
                }
            }])

        } else {
            data = await ProductsModel.aggregate([{
                $facet: {
                    Total: [{$count: 'Count'}],
                    Rows: [{$skip: skipRow}, {$limit: perPage}]
                }
            }])
        }

        res.status(200).json({status: 'Successfull', data})


    } catch (error) {
        res.status(200).json({status: 'Fail', error: error})
    }
}