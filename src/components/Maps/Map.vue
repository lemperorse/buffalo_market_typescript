<template>
<div>
    <div class="bg-white border-l-8 border-purple-700 rounded shadow-xl p-2 mt-6">
        <div class="flex flex-col md:flex-row items-center">
            <GmapMap class="sizemap" :center="center" :zoom="7" map-type-id="roadmap">
                <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center = m.position" />
            </GmapMap>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            center: {
                lat: 19.1664466,
                lng: 99.9019888,
            },
            markers: [{
                    position: {
                        lat: 19.1664466,
                        lng: 99.9019888,
                    },
                },
                {
                    position: {
                        lat: 20.0,
                        lng: 99.9019888,
                    },
                },
                {
                    position: {
                        lat: 19.3,
                        lng: 100.9019888,
                    },
                },
                {
                    position: {
                        lat: 20.3,
                        lng: 100.9019888,
                    },
                },
            ],

        }
    }

}
</script>

<style scoped>
.sizemap {
    width: 1000px;
    height: 300px;
}
</style>