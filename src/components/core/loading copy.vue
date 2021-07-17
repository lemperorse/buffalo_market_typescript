<template>
<div>
    <v-dialog width="100" class="rounded-full" v-model="dialog" persistent>
        <div class="p-2">
            <center>
                <v-btn class="mx-2" x-large fab depressed dark color="orange lighten-1">
                    <i class="em em-shopping_bags text-2xl" aria-role="presentation" aria-label=""></i>
                </v-btn>
            </center>
        </div>
    </v-dialog>
</div>
</template>

<script>
import { Core } from "@/store/core";
export default {
    computed: {
        dialog() {
            return Core.loading
        }

    }
}
</script>

<style>

</style>
