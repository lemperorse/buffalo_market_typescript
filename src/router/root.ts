

// @ts-ignore
const getView = function(page:any){
    return () => import(`@/views/root/${page}.vue`)
}


const rootRouter = [
    {
        path: '',
        name: 'admin-home',
        component: getView('Home')
    },
    {
        path: 'login',
        name: 'login-home',
        component: getView('Login')
    },
    {
        path: 'register',
        name: 'register-home',
        component: getView('Register')
    },
    {
        path: 'forgot',
        name: 'forgot-home',
        component: getView('Forgot_password')
    },
    {
        path: 'forgot-admin',
        name: 'forgot_admin-home',
        component: getView('Forgot_password_admin')
    },
    {
        path: 'forgot-user',
        name: 'forgot_user-home',
        component: getView('Forgot_password_user')
    },
    {
        path: 'product',
        name: 'product',
        component: getView('Product')
    },
    {
        path: 'productbuy',
        name: 'productbuy',
        component: getView('ProductBuy')
    },
    {
        path: 'productsell',
        name: 'productsell',
        component: getView('ProductSell')
    },
    {
        path: 'map',
        name: 'map',
        component: getView('Map')
    },
]


export  {
    rootRouter
}