<template>
<div>
    <form >
        <div class="bg-white flex rounded shadow-xl">
            <span class="w-auto flex justify-end items-center text-gray-500 p-3">
                <i class="fas fa-search text-xl"></i>
            </span>
            <input class="w-full rounded" type="text" v-model="search">
            <button class="bg-green-400 hover:bg-green-300 rounded text-white m-1 pl-4 pr-4 items-center">
                <div class="font-semibold text-xs "></div>
            </button>
        </div>
    </form>
</div>
</template>

<style scoped> 
</style>
