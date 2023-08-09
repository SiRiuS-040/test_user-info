<template>
    <label
        :class="{ 'ui-form-field--has-error': !field.isValid && field.validated}"
        class="ui-form-field">
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

import { fieldValidation } from './configs/formData.js';

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
                isValid: false,
                validated: false,
            },
            fieldData: {},
            fieldValidation,
        };
    },

    mounted(props) {
        this.fieldValidation.formFieldStatus.push(this.field)
    },

    methods: {
        validate(evt) {
            this.fieldValidation.invalidFields = 0;
            this.field.validated = true;

            if (evt.target.type === 'tel') {
                const regex = /[0-9]|\./;
                if( !regex.test(evt.data) ) {
                    this.field.value = this.field.value.slice(0, -1)
                }
            }
            if (this.field.value.length === 0) {
                console.log('поле имени пустое')
                this.field.isValid = false;
            } else {
                this.field.isValid = true;
            }
        },
        addData(value) {
            this.validate(value)
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