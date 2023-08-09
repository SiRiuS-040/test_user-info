<template>
    <div class="ui-form">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "UiForm"
}
</script>

<style scoped>
    @import "./styles/uiForm/_ui-form.scss";
</style>