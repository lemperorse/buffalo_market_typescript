<template>
<div class="m-4 rounded-xl shadow-2xl border-b-4 border-yellow-600 p-4">
    <div class="flex  ">
    <i :class="`${icon}`" aria-role="presentation" aria-label="THUMBS UP SIGN"></i>
        <div class="pl-4">
            <h4 class="text-xl">{{name}}</h4>
            <h3>{{text}}</h3>
            <hr>
            <p class="text-gray-600">
                {{detail}}
            </p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        name: { default: 'รายงาน' },
        icon: { default: ' em em-world_map text-5xl' },
        text: { default: 'ข้อมูลสรุปรายระเอียดต่างๆ' }, 
        detail: { default: 'ข้อมูลสรุปรายระเอียดต่างๆ' }, 
    },
    data: () => {
        return ({
            test: 'sss',
            app:'',
        })
    },
    async created(){ 
          this.app = this.$config._app.basePath
    },

  
}
</script>