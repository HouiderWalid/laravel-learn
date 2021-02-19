<template>
    <div class="d-flex flex-row w-100">
        <div class="dash-menu d-flex shadow-sm flex-column px-2 nowrap-space overflow-hidden" :class="[dash_menu_toggle ? 'dash-menu-expand' : 'dash-menu-shrink']">
            <h3 class="m-0 even-height" >{{ 'Ath Auth Project' | capw }}</h3>
            <router-link v-for="item in dash_menu_items" :key="item.title" :to="item.url" class="w-100 px-2 dash-menu-item font-weight-bold">
                <b-icon :icon="item.icon" class="mr-3"></b-icon>
                {{ item.title | capfw }}
            </router-link>
        </div>
        <div class="w-100 d-flex flex-column" >
            <div id="dash-nav-bar" class="w-100 d-flex flex-row align-items-center px-4" style="background-color:  rgba(0, 0, 0, 0.1)">
                <burger_menu_toggle class="mr-4 icon-btn rounded-circle p-2 ml-0" @click="dash_menu_toggle = !dash_menu_toggle"></burger_menu_toggle>
<!--                <font-awesome-layers >
                    <font-awesome-icon :icon="['fas', 'bars']" />
                </font-awesome-layers>-->
                <h3 class="m-0 even-height mr-auto" >{{ 'Dashboard' | capfw }}</h3>
                <font-awesome-layers :class="{ 'icon-btn-hovered': notifications }" class="position-relative fa-2x mr-4 p-2 cursor-pointer icon-btn rounded-circle p-2"
                                     @click="readNotifications" position="top-right" >
                    <font-awesome-icon :icon="['far', 'bell']" />
                    <font-awesome-layers-text v-if="countUnreadNotifications > 0" counter :value="countUnreadNotifications"
                                              class="m-1" style="font-weight: bold; font-size: 50px" />
                    <b-list-group v-if="notifications" class="position-absolute overflow-auto" style="height: 60vh; font-size: 16px; right: calc(100% - 50px); top: 60px; min-width: 500px">
                        <b-list-group-item v-for="notification in getNotifications" :key="notification.id" href="#" class="flex-column align-items-start text-left">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-3" :class="{ 'font-weight-bold': !notification['read_at']}">{{ notification['data']['header'] }}</h5>
                                <small>{{ notification['created_at'] }}</small>
                            </div>
                            <p :class="{ 'font-weight-bold': !notification['read_at'] }" style="font-size: 14px">
                                {{ notification['data']['body'] }}
                            </p>
                            <small :class="{ 'font-weight-bold': !notification['read_at']}">{{ notification['data']['footer'] }}</small>
                        </b-list-group-item>
                    </b-list-group>
                </font-awesome-layers>
                <font-awesome-layers class="fa-2x p-2 cursor-pointer icon-btn rounded-circle p-2"  @click="logout">
                    <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                </font-awesome-layers>
            </div>
            <div class="w-100 d-flex flex-column overflow-auto" style="height: calc(100vh - 60px)">
                <div class="mb-auto">
                    <router-view></router-view>
                </div>
                <div class="even-height">
                    <p class="text-center">@2021</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DateDifference } from "../helpers/methods";
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
            ],
            notifications: false
        }
    },
    components:{
        burger_menu_toggle: () => import('../components/burger_menu_toggle')
    },
    computed:{
        countUnreadNotifications: function () {
            console.log("count notifications", this.$store.getters.getNotifications.filter(notification => !notification['read_at']).length)
            console.log("count notifications with no filter", this.$store.getters.getNotifications.length)
            return this.$store.getters.getNotifications.filter(notification => !notification['read_at']).length
        },
        getNotifications: function (){
            // return this.$store.getters.getNotifications
            return this.$store.getters.getNotifications.map(notification => {
                    notification['created_at'] = new DateDifference(new Date(Date.now()), new Date(notification['created_at']), null).date_converted
                    return notification
                }
            )
        },
    },
    methods: {
        logout(){
            this.$store.dispatch('logout')
            this.$router.replace('/login')
        },
        async readNotifications(){
            this.notifications = !this.notifications
            await this.$store.dispatch('readNotifications')
        }
    },
    mounted() {
        console.log('home 5')
        this.$store.dispatch('getUserNotifications', {case: this.$store.getters.getConstants.NOTIFICATIONS})
    },
    created() {
        document.title = 'home page'
    }
}
</script>

<style scoped>
    .icon-btn{
        box-sizing: content-box;
    }
    .icon-btn:hover, .icon-btn-hovered{
        background-color: rgba(255, 255, 255, 0.3)
    }
    .nowrap-space{
        white-space: nowrap;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .dash-menu-expand{
        width: 250px;
        transition: width 400ms;
    }
    .dash-menu-shrink{
        width: 50px;
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
        line-height: 40px;
        text-decoration: none;
        color: rgba(0, 0, 0, 0.5);
    }
    .dash-menu-item:hover{
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 5px;
    }
</style>
