<template>
    <button
        class="ui-button"
        :class="uiButtonClasses"
    >
        <slot name="icon"></slot>
        <span class="ui-button__desc">
            <slot name="desc"></slot>
        </span>
    </button>
</template>

<script>

export default {
    name: "UiButton",

    props: {
        buttonType: {
            type: String,
            default: '',
        },
    },

    setup(props) {
        const uiButtonClasses = props.buttonType ? `ui-button--${props.buttonType}` : '';

        return {
            uiButtonClasses
        };
    },
}
</script>

<style lang="scss">
    @import "./styles/uiButton/_ui-button.scss";
</style>