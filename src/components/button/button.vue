<template>
<div>
    <button type="submit" class="btn green1"></button>
</div>
</template>

<style scoped>
.btn {
    border-radius: 5px;
    padding: 14px 24px;
    /* font-size: 12px; */
    text-decoration: none;
    color: #fff;
    position: relative;
    display: inline-block;
}

.btn:active {
    transform: translate(0px, 5px);
    -webkit-transform: translate(0px, 5px);
    box-shadow: 0px 1px 0px 0px;
}

.green1 {
    background-color: #6930C3;
    box-shadow: 0px 5px 0px 0px #002855;
}

.green1:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(139, 92, 246, var(--tw-bg-opacity));
}
</style>
