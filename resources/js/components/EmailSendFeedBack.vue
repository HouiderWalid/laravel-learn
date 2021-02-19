<template>
    <div class="d-flex align-items-center flex-column vh-100 w-100">
        <div id="form-container" class="d-flex flex-column align-items-center w-100 h-100 pt-4">
            <langSelect :langs="languages" :selected="currentLanguage" @update-lang="updateLanguage" ></langSelect>
            <div class="d-flex w-100 flex-column justify-content-center m-auto p-2 position-relative">
                <b-alert show variant="success">
                    <h4 class="alert-heading">{{ $t('reset_message_header') }}</h4>
                    <p>
                        {{ $t('reset_message_body_1') }}<strong> {{ this.$props.email }} </strong>{{ $t('reset_message_body_2') }}.
                    </p>
                    <hr>
                    <p class="mb-0">
                        {{ $t('reset_message_footer_1') }}<strong><a href="/login" style="color: inherit"> {{ $t('reset_message_footer_2') }}</a></strong>.
                    </p>
                </b-alert>
            </div>
        </div>
    </div>
</template>

<script>
import lang from "../plugins/languages";
import langSelect from "./ui/select_language";
export default {
    name: "EmailSendFeedBack",
    components: {
      langSelect
    },
    props: {
      email: {
          type: String,
          required: true
      }
    },
    data: function () {
        return {
            languages: lang.languages,
            currentLanguage: this.$store.getters.getLanguage ? this.$store.getters.getLanguage : navigator.language.split('-')[0]
        }
    },
    methods: {
        updateLanguage(locale) {
            this.$store.dispatch('changeLanguage', locale)
            this.$i18n.locale = locale.lang
        },
    },
    created() {
        //console.log('params : '+this.$route.params.email)
    }
}
</script>

<style scoped>
#form-container {
    max-width: 800px;
}
</style>
