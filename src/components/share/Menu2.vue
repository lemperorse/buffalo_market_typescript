<template>
<div class="m-4 rounded-xl shadow-2xl border-b-4 border-yellow-500 p-4">
    <div class="flex  ">
    <i :class="` text-4xl ${icon}`" aria-role="presentation" aria-label="THUMBS UP SIGN"></i>
        <div class="pl-4">
            <h4 class="text-xl">{{name}}</h4>
            <h3>{{text}}</h3>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        name: { default: 'รายงาน' },
        icon: { default: 'em em---1' },
        text: { default: 'ข้อมูลสรุปรายระเอียดต่างๆ' }, 
    },
    data: () => {
        return ({
            test: 'sss',
            app:'',
        })
    },
    async created(){ 
          this.app = this.$config._app.basePath
    }
}
</script>