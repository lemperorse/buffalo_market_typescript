<template>
<div>
    <div class="search_box"> 
        <input type="text" class="input_search" v-model="search" id="id" >
        <div class="search_btn"><i class="fas fa-search"></i></div>
    </div>
</div>
</template>

<style scoped>
.search_box { 
    background: #0EAD69;
    position: relative;
    padding: 15px;
    border-radius: 5px;
    display: flex;
}

.search_box .search_btn {
    width: 40px;
    height: 30px;
    border-radius: 15%; 
    background: #74C69D;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-left: 15px;
    cursor: pointer;
}

.search_box .input_search {
    outline: none;
    border: 0;
    /* background: #7a5cf0; */
    background: #74C69D;
    border-radius: 5px;
    padding: 15px 20px;
    width: 300px;
    height: 30px;
    color: #fff;
}

::placeholder {
    color: #fff;
}

::-webkit-input-placeholder {
    color: #fff;
}

:-ms-input-placeholder {
    color: #fff;
}
</style>
