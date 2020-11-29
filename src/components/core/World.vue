<template>
<div class="container mx-auto">
    <center>
        <h2 class="text-2xl"> <i class="em em-world_map" aria-role="presentation" aria-label=""></i> แผนที่สถานที่สำคัญ</h2>
    </center>
    <center>
        <p class="text-xl"> แผนที่ตั้งของเกษตร ผู้ผลิต สถานที่สำคัญที่เกี่ยวข้อง</p>
    </center>
    <img @click="dialog = true" class="w3-full" src="https://images.pexels.com/photos/269874/pexels-photo-269874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
    <v-dialog v-model="dialog" scrollable persistent max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                <h1 class="text-2xl mt-1">ข้อมูล</h1> <v-spacer></v-spacer>
                <v-btn @click="dialog=false" dark icon color="red">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <h1 class="text-xl mt-1">ชื่อสถานที่ : ฟาร์มแอนนี่</h1>
                <h1 class="text-xl mt-1">ที่อยู่ : เลขที่ 888 ม.6</h1>
                <h1 class="text-xl mt-1">ตำบล : แม่กา</h1>
                <h1 class="text-xl mt-1">อำเภอ : เมือง</h1>
                <h1 class="text-xl mt-1">จังหวัด : พะเยา</h1>
                <h1 class="text-xl mt-1">เบอร์ติดต่อ : 0912312312</h1> 
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
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
            dialog: false,
            tab: 0,
            txt: 'Hello World',
            page: 1,
            center: {
                lat: 19.1664466,
                lng: 99.9019888
            },
            markers: [{
                    position: {
                        lat: 19.1664466,
                        lng: 99.9019888
                    }
                },
                {
                    position: {
                        lat: 20.0,
                        lng: 99.9019888
                    }
                },
                {
                    position: {
                        lat: 19.3,
                        lng: 100.9019888
                    }
                },
                {
                    position: {
                        lat: 20.3,
                        lng: 100.9019888
                    }
                },
            ],

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

<style scoped>
.sizemap {
    width: 300px;
    height: 300px;
}
</style>
