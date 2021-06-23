

// @ts-ignore

const getView = function(page:any){
    return () => import(`@/views/user/${page}.vue`)
}


const userRouter: any = [
    {
        path: '/user/home',
        name: 'home',
        component: getView('Home')
    },
    {
        path: '/test',
        name: 'test',
        component: getView('Test')
    },

    //*****************************หน้ารายละเอียดสินค้า******************************** */
    {
        path: '/user/productdetail',
        name: 'productdetail',
        component: getView('ProductDetail')
    }, 
    //*****************************หน้าจัดการประกาศ******************************** */
    {
        path: '/user/post',
        name: 'post',
        component: getView('Post')
    },
    {
        path: '/user/postbuyedit',
        name: 'postbuyedit',
        component: getView('PostBuyEdit')
    },
    {
        path: '/user/postselledit',
        name: 'postselledit',
        component: getView('PostSellEdit')
    },
    {
        path: '/user/addpostbuy',
        name: 'addpostbuy',
        component: getView('AddPostBuy')
    },
    {
        path: '/user/addpostsell',
        name: 'addpostsell',
        component: getView('AddPostSell')
    },
    //*****************************รายงาน******************************** */
    {
        path: '/user/report',
        name: 'report',
        component: getView('Report')
    },
    //*****************************โปรไฟล์******************************** */
    {
        path: '/user/profileuser',
        name: 'profileuser',
        component: getView('ProfileUser')
    },
    //*****************************ร้านค้าของฉัน******************************** */
    {
        path: '/user/myshop',
        name: '_myshop',
        component: getView('_myshop')
    },
    {
        path: '/user/myshoplist',
        name: '_myshoplist',
        component: getView('_myshoplist')
    },
    {
        path: '/user/myshopbuy',
        name: '_myshopbuy',
        component: getView('_myshopbuy')
    },
    {
        path: '/user/myshopsell',
        name: '_myshopsell',
        component: getView('_myshopsell')
    },
    {
        path: '/user/myshopreport',
        name: '_myshopreport',
        component: getView('_myshopreport')
    },
    //*****************************หน้าสินค้าทั้งหมดของฉัน******************************** */
    {
        path: '/user/productall',
        name: 'productall',
        component: getView('productall')
    },

]

export  {
    userRouter
}