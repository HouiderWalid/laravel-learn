<template>
    <router-view></router-view>
</template>

<script>
import languages from "../plugins/languages";

export default {
    name: "root",
    created() {
        if (!this.$store.getters.getLanguage) {
            this.$store.dispatch('changeLanguage', this.getLocalLanguage(navigator.language.split('-')[0], languages.languages))
            this.$i18n.locale = navigator.language.split('-')[0] || languages.languages[0].lang
        }else {
            this.$i18n.locale = this.$store.getters.getLanguage.lang
        }
    },
    methods: {
        getLocalLanguage(lang, allLang) {
            let languageFound = allLang.find(language => language.lang === lang)
            return languageFound ? languageFound : navigator.language.split('-')[0]
        }
    }
}
</script>

<style scoped>

</style>
