<template>
    <header class="app-header">
        <div class="app-header__content container">
            <h1 hidden>Анкета пользователя</h1>
            <div class="app-header__logo-wrapper">
                <img src="../assets/img/alef_logo.svg" alt="logo">
            </div>
            <ul class="app-header__nav navigation">
                <li v-for="tab in parentFormTabs"
                    :class="{ 'is-active': tab.isActive }"
                    class="navigation__item"
                >
                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>

import {parentFormTabs} from './configs/tabData.js';

export default {
    name: "AppHeader",

    data() {
        return {
            parentFormTabs,
        };
    },

    methods: {
        selectTab(selectedTab) {
            for (let tab in this.parentFormTabs) {
                this.parentFormTabs[tab].isActive = (this.parentFormTabs[tab].name === selectedTab.name)
            }
        }
    },
}
</script>

<style lang="scss">
    @import "./styles/appHeader/_app-header.scss";
</style>