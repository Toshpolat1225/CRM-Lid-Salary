const {
    Router
} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('user/index',{
        layout: 'user'
    })
})

module.exports = router