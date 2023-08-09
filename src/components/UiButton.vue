<template>
    <button class="ui-button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "UiButton"
}
</script>

<style lang="scss">
    @import "./styles/uiButton/_ui-button.scss";
</style>