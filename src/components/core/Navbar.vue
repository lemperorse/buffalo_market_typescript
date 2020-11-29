<template>
<nav id="header" class="bg-white fixed w-full z-10 top-0 shadow">
    <div class="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
        <div class="w-1/3 pl-2 md:pl-0">
            <a class="text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold flex" href="#">
                <img class="w-8" src="https://www.img.in.th/images/ec95943a25cfea13d448a72eafdd2bf8.png" />
                <h3 class="ml-4 text-md">ตลาดควายไทย</h3>
            </a>
        </div>
        <div class="w-1/3 pl-2 md:pl-0">
        </div>
        <div class="w-1/3 pr-0">
            <div class="flex relative inline-block float-right">

                <div @click="profileMenu=!profileMenu" class="relative text-sm">
                    <button class="flex items-center focus:outline-none mr-3">
                        <img class="w-8 h-8 rounded-full mr-4" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg" alt="Avatar of User"> <span class="hidden md:inline-block">สมรศรีจันทร์</span>
                        <svg class="pl-2 h-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129">
                            <g>
                                <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                            </g>
                        </svg>
                    </button>
                    <div v-if="profileMenu" class="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 w-64 md:w-auto">
                        <ul class="list-reset">
                            <li @click="$router.push('/user/profileuser')">
                                <p class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">โปรไฟล์</p>
                            </li>
                            <li>
                                <hr class="border-t mx-2 border-gray-400">
                            </li>
                            <li @click="$router.push('/')"><a href="#" class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">ออกจากระบบ</a></li>
                        </ul>
                    </div>
                </div>

                <div class="block lg:hidden pr-4">
                    <button @click="navbarMenu = !navbarMenu" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>

        <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-3 lg:mt-2 bg-white z-20">
            <ul class="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                <li @click="$router.push('/user/home/')" class="mr-6 my-2 md:my-0">
                    <p class="block py-1 md:py-3 pl-1 align-middle text-orange-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600">
                        <i class="mdi mdi-home  mr-3 text-orange-600"></i><span class="pb-1 md:pb-0 text-md">หน้าแรก</span>
                    </p>
                </li>
                <li @click="$router.push('/user/ipost')" class="mr-6 my-2 md:my-0">
                    <p class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500">
                        <i class="mdi mdi-cart-arrow-right  mr-3"></i><span class="pb-1 md:pb-0 text-md">ประกาศของฉัน</span>
                    </p>
                </li>
                <li @click="$router.push('/user/report/')" class="mr-6 my-2 md:my-0">
                    <p class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500">
                        <i class="mdi mdi-chart-areaspline  mr-3"></i><span class="pb-1 md:pb-0 text-md">รายงานสถิติ</span>
                    </p>
                </li>
                <!-- <li>
                    <hr class="border-t mx-2 border-gray-400">
                </li>
                <li @click="$router.push('/')"><a href="#" class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">ออกจากระบบ</a></li> -->
            </ul>

        </div>

        <div v-if="navbarMenu" class="w-full flex-grow lg:flex lg:items-center  lg:w-auto md:hidden  lg:block mt-2 lg:mt-0 bg-white z-20">
            <ul class="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                <li @click="$router.push('/user/home/')" class="mr-6 my-2 md:my-0">
                    <p class="block py-1 md:py-3 pl-1 align-middle text-orange-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600">
                        <i class="mdi mdi-home  mr-3 text-orange-600"></i><span class="pb-1 md:pb-0 text-sm">หน้าแรก</span>
                    </p>
                </li>
                <li @click="$router.push('/user/ipost/')" class="mr-6 my-2 md:my-0">
                    <p class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500">
                        <i class="fa mdi-envelope  mr-3"></i><span class="pb-1 md:pb-0 text-sm">ประกาศของฉัน</span>
                    </p>
                </li>
                <li @click="$router.push('/user/report/')" class="mr-6 my-2 md:my-0">
                    <p class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-green-500">
                        <i class="mdi mdi-chart-area  mr-3"></i><span class="pb-1 md:pb-0 text-sm">รายงานสถิติ</span>
                    </p>
                </li>
                <!-- <li>
                    <hr class="border-t mx-2 border-gray-400">
                </li>
                <li @click="$router.push('/')"><a href="#" class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">ออกจากระบบ</a></li> -->
            </ul>
        </div>

    </div>
</nav>
</template>

<script>
export default {
    name: 'Root',
    /*-------------------------ประกาศ components ---------------------------------------*/
    components: {

    },
    /*-------------------------รับค่าเมื่อเราเป็น components---------------------------------------*/
    props: {

    },
    /*-------------------------ประกาศตัวแปรที่ใช้ ผูกกับ v-model ---------------------------------------*/
    data() {
        return {

            txt: 'Hello World',
            profileMenu: false,
            navbarMenu: false,

        };
    },
    /*------------------------- สิ่งทที่อยู่ในนี้จะถูกรัยเมื่อโหลด ------------------------------------------*/
    mounted: async function () {
        /**** เรียกใช้ methods ชื่อ load() */
        await this.load();
    },
    /*------------------------- กระทำการตอน router ถูกโหลดเข้ามา------------------------------------------*/
    async beforeRouteEnter(to, from, next) {
        next()
    },
    /*-------------------------ใช้จัดการ operation  หรือ คำนวณค่าต่างๆ (คล้าย methods)------------------------------------------*/
    computed: {

    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        /******* Methods default run ******/
        load: async function () {}
    },
}
</script>

<style lang='postcss' scoped>

</style>
