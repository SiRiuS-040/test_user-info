<template>
    <label class="ui-form-field">
        <span class="ui-form-field__input-label">{{ name }}</span>
        <input
            v-model="field.value"
            v-on:input="addData"
            :type="fieldType"
            :placeholder="placeholder"
            class="ui-form-field__input-text"
        >
        <slot></slot>
    </label>
</template>

<script>
export default {
    name: "UiFormField",
    props: {
        id: {
            type: Number,
            default: 0,
        },
        fieldType: {
            type: String,
            default: 'text',
        },
        dataType: {
            type: String,
            default: 'data',
        },
        labelType: {
            type: String,
            default: 'Поле',
        },
        name: {
            type: String,
            default: 'Значение',
        },
        placeholder: {
            type: String,
            default: 'Placeholder',
        },
        value: {
            type: String,
            default: '',
        },
    },

    data(props) {
        return {
            field: {
                fieldId: props.id,
                dataType: props.dataType,
                labelType: props.labelType,
                value: props.value,
            },
            fieldData: {},
        };
    },

    methods: {
        addData() {
            this.fieldData.id = this.field.fieldId;
            const fieldLabelType = this.field.labelType;
            this.fieldData[fieldLabelType] = fieldLabelType;
            this.fieldData.value = this.field.value;
            this.$emit('createData', this.field);
        }
    },
}
</script>

<style lang="scss" scoped>
    @import "./styles/uiFormField/_ui-form-field.scss";
</style>