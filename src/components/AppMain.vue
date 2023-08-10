<template>
    <main class="app-main">
        <section
            v-if="parentFormTabs.formTab.isActive"
            class="app-main__section content-container"
        >
            <UiForm class="information-form">
                <div class="information-form__parent-info">
                    <h2 class="app-main__section-title">Персональные данные</h2>
                    <div class="information-form__parent-fields">
                        <UiFormField
                            v-for="field in userFormFields"
                            :key="field.id"
                            :fieldType="field.fieldType"
                            :dataType="field.dataType"
                            :labelType="field.labelType"
                            :name="field.fieldLabel"
                            :placeholder="field.placeholder"
                            :value="userData[field.labelType]"
                            @createData="addData"
                            class="information-form__field"
                        />
                    </div>
                </div>
                <div class="information-form__child-info">
                    <h2 class="app-main__section-title information-form__child-title">
                        Дети (макс. 5)
                        <UiButton
                            v-if="isAddChildBtnVisible"
                            @click="addChildField"
                            buttonType="add"
                            class="information-form__btn-add-child"
                        >
                            <template #icon>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.13332 10.8556C4.50125 10.8555 3.98887 11.3679 3.98887 12C3.98887 12.6321 4.50126 13.1445 5.13332 13.1445L10.8554 13.1445L10.8554 18.8668C10.8554 19.4989 11.3678 20.0113 11.9999 20.0113C12.632 20.0113 13.1444 19.4989 13.1444 18.8668L13.1443 13.1445L18.8667 13.1445C19.4988 13.1445 20.0112 12.6321 20.0112 12C20.0112 11.3679 19.4988 10.8556 18.8667 10.8556L13.1443 10.8556L13.1443 5.13338C13.1443 4.50132 12.632 3.98893 11.9999 3.98893C11.3678 3.98893 10.8554 4.50131 10.8554 5.13338L10.8554 10.8556L5.13332 10.8556Z" fill="currentColor"/>
                                </svg>
                            </template>
                            <template #desc>
                                Добавить ребенка
                            </template>
                        </UiButton>
                    </h2>
                    <div class="information-form__children-list">
                        <div class="information-form__child-fields"
                             v-for="child in childList"
                             :key="child.id"
                        >
                            <UiFormField
                                v-for="field in childFormFields"
                                :key="field.id"
                                :id="child.id"
                                :fieldType="field.fieldType"
                                :dataType="field.dataType"
                                :labelType="field.labelType"
                                :name="field.fieldLabel"
                                :placeholder="field.placeholder"
                                @createData="addData"
                                class="information-form__field"
                            />
                            <UiButton
                                @click="deleteChildField(child.id)"
                                buttonType="del"
                            >
                                <template #desc>
                                    Удалить
                                </template>
                            </UiButton>
                        </div>
                    </div>
                </div>
                <UiButton
                    @click="saveData(fieldValidation)"
                    buttonType="save"
                    class="information-form__btn-save"
                >
                    <template #desc>
                        Сoхранить
                    </template>
                </UiButton>

                <h2
                    v-if="fieldValidation.dataSaved"
                    class="information-form__info_saved"
                >Данные успешно сохранены!</h2>
            </UiForm>
        </section>
        <section
            v-if="parentFormTabs.previewTab.isActive"
            class="main__section content-container"
        >
            <div class="preview-form">
                <div
                    v-if="!userInfoPreview.userData.data.name.value"
                    class="preview-form__wrapper"
                >
                    <h2 class="app-main__section-title">Сведения отсутствуют</h2>
                </div>
                <div
                    v-if="userInfoPreview.userData.data.name.value"
                    class="preview-form__wrapper"
                >
                    <div class="preview-form__user-info">
                        <h2 class="app-main__section-title">Персональные данные</h2>
                        <p class="preview-form__user-data">
                            {{ userInfoPreview.userData.data.name.value }}
                            <span>
                            {{ `, ${setAge(userInfoPreview.userData.data.age.value)}` }}
                            </span>
                        </p>
                    </div>
                    <div
                        v-if="isChildListVisible"
                        class="preview-form__child-info"
                    >
                        <h2 class="app-main__section-title">Дети</h2>
                        <ul class="preview-form__child-list">
                            <li
                                v-for="child in userInfoPreview.childData"
                                :key="child.id"
                                class="preview-form__child-item"
                            >
                                <p
                                    v-if="child.data.name.value"
                                    class="preview-form__child-desc"
                                >
                                <span>
                                    {{ child.data.name.value }}</span>
                                    <span>
                                        {{ `, ${setAge(child.data.age.value)}` }}
                                </span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    </main>
</template>

<script>

import UiForm from '../components/UiForm.vue';
import UiFormField from '../components/UiFormField.vue';
import UiButton from '../components/UiButton.vue';
import {parentFormTabs} from './configs/tabData.js';
import {userFormFields, childFormFields, userData, childList, fieldValidation} from './configs/formData.js';

export default {
    name: 'AppMain',
    components: {
        UiForm,
        UiFormField,
        UiButton,
    },

    data() {
        return {
            parentFormTabs,
            userFormFields,
            childFormFields,
            fieldValidation,

            isChildListVisible: false,
            isAddChildBtnVisible: true,

            userData,
            childList,

            userInfoPreview: {
                userData: {
                    data: {
                        name: {},
                        age: {},
                    },
                },
                childData: [],
            },
        };
    },

    methods: {
        checkAddBtnVisibility() {
            if (this.childList.length >= 5) {
                this.isAddChildBtnVisible = false;
            } else {
                this.isAddChildBtnVisible = true;
            }
        },
        checkChildListVisibility() {
            if (this.userInfoPreview.childData.length === 0) {
                this.isChildListVisible = false;
            } else {
                this.isChildListVisible = true;
            }
        },
        setAge(age) {
            function plural(number, titles) {
                const cases = [2, 0, 1, 1, 1, 2];
                return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
            }
            const declension = ['год', 'года', 'лет'];
            return `${age} ${plural(age, declension)}`;
        },
        deleteChildField(id) {
            let dataIndex = this.childList.findIndex(child => child.id === id)
            fieldValidation.formFieldStatus.forEach(function (data, index) {
                if (data.dataType === 'childData' && data.fieldId === dataIndex) {
                    delete fieldValidation.formFieldStatus[index]
                }
            })
            this.childList.splice(dataIndex, 1);
            this.checkAddBtnVisibility();
            this.checkChildListVisibility();
        },
        addChildField(evt) {
            evt.preventDefault();
            const childData = {
                data: {},
            };
            if (this.childList.length === 0) {
                childData.id = 0;
            } else {
                const lastDataId = this.childList.at(-1).id;
                childData.id = lastDataId + 1;
            }
            this.childList.push(childData)
            this.checkAddBtnVisibility();
            this.checkChildListVisibility();
        },
        addData(fieldData) {
            this.fieldValidation.dataSaved = false;
            if (fieldData.dataType === 'userData') {
                this.userData.data[fieldData.labelType] = fieldData;
            }
            if (fieldData.dataType === 'childData') {
                const dataIndex = this.childList.findIndex(child => child.id === fieldData.fieldId)
                this.childList[dataIndex].data[fieldData.labelType] = fieldData;
            }
        },
        clearData() {
            this.fieldValidation.formFieldStatus.splice(2);
            this.childList = Array();
            this.userData.data.name.value = '';
            this.userData.data.age.value = '';

            this.fieldValidation.formFieldStatus.forEach(function (data) {
                data.validated = false;
                data.isValid = false;
            })
        },
        saveData(validationData) {
            validationData.dataSaved = false;
            validationData.isFormValid = false;
            validationData.invalidFields = 0;
            validationData.formFieldStatus.forEach(function (data) {
                data.validated = true;
                if (data.isValid === false) {
                    validationData.invalidFields++
                }
            })
            if (validationData.invalidFields === 0) {
                validationData.isFormValid = true;
            }

            if (validationData.isFormValid == true) {
                this.fieldValidation.dataSaved = true;
                this.userInfoPreview.userData = Object();
                this.userInfoPreview.childData = Array();

                const copyUserData = {
                    data: {},
                };
                for (let key in this.userData.data) {
                    let copyUserField = Object();
                    Object.assign(copyUserField, this.userData.data[key])
                    copyUserData.data[key] = copyUserField;
                };
                const copyChildList = Array();
                this.childList.forEach(function(child) {
                    let copyChild = {};
                    Object.assign(copyChild, child)
                    copyChildList.push(copyChild);
                })

                Object.assign(this.userInfoPreview.userData, copyUserData)
                Object.assign(this.userInfoPreview.childData, copyChildList)
                this.clearData();
                this.checkAddBtnVisibility();
                this.checkChildListVisibility();
            }
        },
    },
}
</script>

<style lang="scss">
    @import "./styles/appMain/_app-main.scss";
</style>