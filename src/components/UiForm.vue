<template>
    <form class="ui-form">
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: "UiForm"
}
</script>

<style scoped>
    @import "./styles/uiForm/_ui-form.scss";
</style>