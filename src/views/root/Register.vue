<template>
<div>
    <button @click="$router.go(-1)" class="p-3 text-red-600">
        <i class="fas fa-arrow-circle-left text-3xl"></i>
    </button>
    <img :src="wave" class="animate__animated animate__fadeInUp fixed hidden lg:block inset-0 h-full" style="z-index: -1;" />
    <div class="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img :src="sweethome" class="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto" />
        <form class="flex flex-col justify-center items-center w-1/2">
            <img :src="adduser" class="w-32 animate__animated animate__fadeInDown" />
            <div class=" ">
                <h2 class="my-8 font-display font-bold text-xl text-gray-700 text-center animate__animated animate__fadeInRight">
                    สมัครสมาชิก
                </h2>
                <div class="mt-8">
                    <form>
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
                                <input type="password" placeholder="รหัสผ่าน" class="px-3 py-3 placeholder-gray-500 rounded bg-red-200  focus:bg-white focus:shadow-outline w-full pl-10" />
                            </div>
                            <div class="relative flex w-full flex-wrap items-stretch mb-3 ">
                                <span class="z-10 h-full leading-snug font-normal absolute text-center text-red-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                    <i class="fas fa-lock"></i>
                                </span>
                                <input type="password" placeholder="ยืนยันรหัสผ่าน" class="px-3 py-3 placeholder-gray-500 rounded bg-red-200  focus:bg-white focus:shadow-outline w-full pl-10" />
                            </div>
                        </div>

                        <div class="mt-6"> 
                            <button @click="$router.push('/')" type="submit" class="w-full animate__animated animate__slideInUp rounded-full p-3 bg-red-500 hover:bg-red-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" >
                                <div class="text-white"> สมัครสมาชิก</div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </form>
    </div>

</div>
</template>

<script>
import wave from "@/assets/login/wave.png";
import adduser from "@/assets/login/undraw_Add_user_re_5oib.svg";
import sweethome from "@/assets/login/undraw_sweet_home_dkhr.svg";

export default {
    data() {
        return {
            wave,
            adduser,
            sweethome
        };
    },
};
</script>
