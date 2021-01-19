<template>
    <v-select :options="langs" v-model="selectedLang" label="lang" :searchable="false">
        <template #selected-option="language">
            <div>
                <flag :iso="language.flag" v-bind:squared=false />
                <span class="ml-1">{{ language.lang | capfw}}</span>
            </div>
        </template>
        <template v-slot:option="language">
            <div>
                <flag :iso="language.flag" v-bind:squared=false />
                <span class="ml-1">{{ language.lang | capfw}}</span>
            </div>
        </template>
    </v-select>
</template>

<script>
export default {
    name: "select_language",
    props: ['langs', 'selected'],
    data: function(){
        return{
            selectedLang: this.selected
        }
    },
    watch: {
        selectedLang: function (val) {
            this.$emit('update-lang', val)
        }
    }
}
</script>

<style scoped>

</style>
