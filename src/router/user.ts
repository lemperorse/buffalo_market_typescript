

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

    //*****************************หน้ารวมสินค้า******************************** */
    {
        path: '/user/productdetail',
        name: 'productdetail',
        component: getView('ProductDetail')
    },
    {
        path: '/user/buyproduct',
        name: 'buyproduct',
        component: getView('BuyProduct')
    },
    {
        path: '/user/sellerdetail',
        name: 'sellerdetail',
        component: getView('SellerDetail')
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

]

export  {
    userRouter
}