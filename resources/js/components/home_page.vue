<template>
    <div class="d-flex flex-row w-100 h-100">
        <div class="dash-menu h-100 d-flex flex-column px-3 nowrap-space overflow-hidden" :class="[dash_menu_toggle ? 'dash-menu-expand' : 'dash-menu-shrink']">
            <h3 class="m-0 even-height" >{{ $t('Ath Auth Project') | capw }}</h3>
            <router-link v-for="item in dash_menu_items" :key="item.title" :to="item.url" class="w-100 dash-menu-item font-weight-bold">
                <b-icon :icon="item.icon" class="mr-2"></b-icon>
                {{ $t(item.title) | capfw }}
            </router-link>
        </div>
        <div class="h-100 w-100 overflow-auto">
            <div id="dash-nav-bar" class="w-100 d-flex flex-row align-middle px-4" style="background-color:  rgba(0, 0, 0, 0.1)">
                <b-icon icon="list" class="mr-4 align-middle even-height cursor-pointer" scale="2" @click="dash_menu_toggle = !dash_menu_toggle"></b-icon>
                <h3 class="m-0 even-height mr-auto" >{{ $t('Dashboard') | capfw }}</h3>
                <b-icon icon="box-arrow-right" class="mr-4 align-middle even-height cursor-pointer" scale="1.5" @click="logout"></b-icon>
            </div>
            <div class="d-flex flex-column justify-content-between bord" style="min-height: 100vh">
                <div class="bord">
                    <h1 class="m-5 text-center">{{ $t('profile') | capfw }}</h1>
                    <router-view></router-view>
                </div>
                <div class="bord even-height">
                    <p class="">@2021</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "home_page",
    data: function(){
        return{
            dash_menu_toggle: true,
            dash_menu_items: [
                {
                    icon: 'bar-chart-fill',
                    title: 'dashboard',
                    url: 'dashboard',
                    active: false
                },
                {
                    icon: 'person-fill',
                    title: 'profile',
                    url: 'profile',
                    active: false
                }
            ]
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logout')
            this.$router.replace('/login')
        }
    }
}
</script>

<style scoped>
    .nowrap-space{
        white-space: nowrap;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .dash-menu-expand{
        width: 300px;
        transition: width 400ms;
    }
    .dash-menu-shrink{
        width: 80px;
        transition: width 400ms;
    }
    .even-height{
        height: 60px;
        line-height: 60px;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .dash-menu-item{
        height: 40px;
        line-height: 40px;
        text-decoration: none;
        color: black;
    }
</style>
