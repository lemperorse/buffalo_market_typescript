<template>
<div>
    <img :src="wave" class="animate__animated animate__fadeInUp fixed hidden lg:block inset-0 h-full" style="z-index: -1;" />
    <div class="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img :src="shop" class=" hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto " />
        <form class="flex flex-col justify-center items-center w-1/2">
            <img :src="avatar" class="w-32 animate__animated animate__fadeInDown" />
            <div class=" ">
                <h2 class="animate__animated animate__fadeInRight my-8 font-display font-bold text-2xl text-gray-700 text-center">
                    ยินดีต้อนรับ
                </h2>
                <div class="mt-8">
                    <!-- <form> -->
                    <div class="relative animate__animated animate__fadeInRight">
                        <div class="relative flex w-full flex-wrap items-stretch mb-3 ">
                            <span class="z-10 h-full leading-snug font-normal absolute text-center text-red-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                <i class="fas fa-user"></i>
                            </span>
                            <input type="text" placeholder="ชื่อผู้ใช้งาน" class="px-3 py-3 placeholder-gray-500 rounded bg-red-200  focus:bg-white focus:shadow-outline w-full pl-10" />
                        </div>
                    </div>
                    <div class="relative mt-6 animate__animated animate__fadeInRight">
                        <div class="relative flex w-full flex-wrap items-stretch mb-3 ">
                            <span class="z-10 h-full leading-snug font-normal absolute text-center text-red-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                <i class="fas fa-lock"></i>
                            </span>
                            <input type="password" placeholder="รหัสผ่าน" class="px-3 py-3 placeholder-gray-500 rounded bg-red-200 focus:bg-white focus:shadow-outline w-full pl-10" />
                        </div>
                        <div class="mt-2">
                            <a @click="$router.push('/forgot/')" class="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer">
                                ลืมรหัสผ่าน
                            </a>
                        </div>
                    </div>

                    <div class="mt-6">
                        <!-- <button @click="$router.push('/user/home/')" class="animate__animated animate__slideInUp bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                                shadow-lg">
                                เข้าสู่ระบบ
                            </button> -->
                        <div class="flex justify-center mt-6">
                            <button @click="$router.push('/user/home/')" type="submit" class="w-full animate__animated animate__slideInUp rounded-full p-3 bg-green-500 hover:bg-green-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" >
                                <div class="text-white"> เข้าสู่ระบบ</div>
                            </button>
                        </div>
                    </div>
                    <!-- </form> -->
                    <div class="animate__animated animate__slideInUp mt-6 text-sm font-display font-semibold text-gray-700 text-center">
                        ยังไม่มีบัญชี ? <a @click="$router.push('/register/')" class="cursor-pointer text-indigo-600 hover:text-indigo-800">สมัครสมาชิก</a>
                    </div>
                </div>
            </div>

        </form>
    </div>

</div>
</template>

<script>
import wave from "@/assets/login/wave.png";
import shop from "@/assets/login/undraw_shopping_app_flsj.svg";
import avatar from "@/assets/login/male_avatar_323b.svg";

export default {
    data() {
        return {
            wave,
            shop,
            avatar
        };
    },
};
</script>
