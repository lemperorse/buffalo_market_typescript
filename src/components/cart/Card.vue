<template>
    <v-card elevation="3">
        <v-img :style="`width:${w}; height:${h}`" class="white--text align-end w-full rounded-t-lg  " :src="img">
 
        </v-img>
        <v-card-text class="">
            <span class="font-semibold leading-tight mb-1 text-indigo-600 text-sm line1">{{name}}</span>
            <div class="font-bold mb-1">
                <span class="text-sm">฿ {{price}}</span>
            </div>
        </v-card-text>
    </v-card>
 


</template>

<script>

export default {
    props:{
        path:{
            default:'/user/productdetail?product='
        },
        name:{
            default:'name'
        },
        price:{
            default:0
        },
        img:{
            default:'https://images.pexels.com/photos/4052387/pexels-photo-4052387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        },
        w:{
            default:"100%;"
        },
        h:{
            default:"200px;"
        }
    }
}
</script>

<style>

</style>
