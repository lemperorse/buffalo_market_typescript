<template>
<div>
    <button @click="$router.go(-1)" class="p-3 text-red-600">
        <i class="fas fa-arrow-circle-left text-3xl"></i>
    </button>
    <img :src="wave" class="animate__animated animate__fadeInUp fixed hidden lg:block inset-0 h-full" style="z-index: -1;" />
    <div class="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img :src="team_up" class="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto" />
        <form class="flex flex-col justify-center items-center w-1/2">
            <img :src="team_re" class="w-32 animate__animated animate__fadeInDown" />
            <div class=" ">
                <h2 class="animate__animated animate__fadeInRight my-8 font-display font-bold text-xl text-gray-700 text-center">
                    ติดต่อขอรหัสผ่าน
                </h2>
                <div class="mt-8">
                    <!-- <form>  -->
                        <div class="mt-6">
                            <button  @click="$router.push('/forgot-admin')" class="animate__animated animate__slideInUp bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                                shadow-lg">
                                ติดต่อแอดมิน
                            </button>
                        </div>

                        <div class="mt-6">
                            <button @click="$router.push('/forgot-user')" class="animate__animated animate__slideInUp bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                                shadow-lg">
                                เปลี่ยนรหัสผ่านเอง
                            </button>
                        </div>
                    <!-- </form> -->
                </div>
            </div>

        </form>
    </div>

</div>
</template>

<script>
import wave from "@/assets/login/wave.png";
import team_up from "@/assets/login/undraw_team_up_ip2x.svg";
import team_re from "@/assets/login/undraw_Remote_team_re_ck1y.svg";

export default {
    data() {
        return {
            wave,
            team_re,
            team_up
        };
    },
};
</script>
