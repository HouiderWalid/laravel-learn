<template>
    <div class="w-100 vh-100 d-flex align-items-center justify-content-center flex-column">
        <p class="waiting-message">Fetching your data from {{ $route.params.provider }} service, Please wait...</p>
        <b-icon icon="three-dots" animation="cylon" font-scale="4"></b-icon>
    </div>
</template>

<script>
export default {
    name: "provider_page",
    async created() {
        await this.$store.dispatch('socialMedialCallback', { case: this.$store.getters.getConstants.DEFAULT, provider: this.$route.params.provider, query: this.$route.query })
        if (this.$store.getters.getAuth) await this.$router.push('/')
    }
}
</script>

<style scoped>
.waiting-message{
    font-size: 30px;
}
</style>
