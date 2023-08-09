<template>
    <div class="app-content">
        <AppHeader class="app-content__header"/>
        <AppMain class="app-content__main"/>
        <AppFooter class="app-content__footer"/>
    </div>
</template>

<script>
import "./style.scss";

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';

export default {
    name: 'App',
    components: {
        AppHeader,
        AppMain,
        AppFooter,
    },
}

</script>

<style lang="scss">
    @import "./components/styles/appContent/_app-content.scss";
</style>