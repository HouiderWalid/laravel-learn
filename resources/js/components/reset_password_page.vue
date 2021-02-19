<template>
    <div class="d-flex align-items-center flex-column vh-100 w-100">
        <div id="form-container" class="d-flex flex-column align-items-center w-100 h-100 pt-4">
            <langSelect :langs="languages" :selected="currentLanguage" @update-lang="updateLanguage" ></langSelect>
            <div class="d-flex w-100 flex-column justify-content-center m-auto p-2 position-relative">
                <div :class="[ isLoading ? 'd-flex' : 'd-none']"
                     class="op-05 text-center justify-content-center align-items-center position-absolute w-100 h-100"
                     style="z-index: 100">
                    <b-spinner
                        class="op-1"
                        variant="primary"
                        type="grow"
                    ></b-spinner>
                </div>
                <h2 class="w-100 text-center mb-4 font-weight-bolder">{{ $t('reset_password_title')| capw }}</h2>
                <b-alert :show="!resetForm[1].validate" variant="danger" class="mb-4">{{
                        resetForm[1].errors[0]
                    }}
                </b-alert>
                <b-form-group :id="resetForm[0].id+'-group'" :label="$t(resetForm[0].title) | capfw"
                              :label-for="resetForm[0].id"
                              class="font-weight-bold">
                    <b-form-input
                        :id="resetForm[0].id"
                        :name="resetForm[0].id"
                        placeholder="example@domain.com"
                        class="font-weight-bold"
                        v-model="resetForm[0].content"
                        :state="resetForm[0].errors.length <= 0 && resetForm[0].validate"
                        :aria-describedby="resetForm[0].id+'-feedback'"
                    ></b-form-input>
                    <b-form-invalid-feedback
                        :id="resetForm[0].id+'-feedback'"
                        class="font-weight-normal">
                        {{ resetForm[0].errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-button variant="success" class="mb-1 mt-3 font-weight-bold py-2" @click="resetPassword">{{
                        $t('reset_password') | capfw
                    }}
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import lang from "../plugins/languages";
import langSelect from '../components/ui/select_language'

export default {
    name: "reset_password_page",
    components: {
      langSelect
    },
    data: function () {
        return {
            resetForm: [
                {
                    id: 'employee_email',
                    title: 'email',
                    errors: [],
                    content: '',
                    validate: null,
                },
                {
                    id: 'general_error',
                    errors: [],
                    validate: true
                },
            ],
            languages: lang.languages,
            currentLanguage: this.$store.getters.getLanguage ? this.$store.getters.getLanguage : navigator.language.split('-')[0]
        }
    },
    computed: {
        isLoading() {
            return this.$store.getters.isLoading(this.$store.getters.getConstants.RESET_PASSWORD)
        }
    },
    methods: {
        async resetPassword(){
            await this.$store.dispatch('resetPassword', [{ name: this.resetForm[0].id, data: this.resetForm[0].content }])
            this.displayErrors()
            if (this.$store.getters.getPasswordResetValidation) await this.$router.push({
                name: 'reset_password_message',
                params: { email: this.resetForm[0].content }
            })
        },
        displayErrors() {
            let err = this.$store.getters.getFormMessages(this.$store.getters.getConstants.RESET_PASSWORD)
            this.resetForm.forEach(field => {
                let fieldErr = err["errors"][field.id]
                if (fieldErr) {
                    field.errors = fieldErr
                    field.validate = false
                } else {
                    field.errors = []
                    field.validate = true
                }
            })
        },
        updateLanguage(locale) {
            this.$store.dispatch('changeLanguage', locale)
            this.$i18n.locale = locale.lang
        },

    },
    created() {
        //console.log('reset...')
    }
}
</script>

<style scoped>

.op-1 {
    opacity: 1;
}

.op-05 {
    background-color: rgba(255, 255, 255, 0.7);
}

a {
    text-decoration: none;
}

#form-container {
    max-width: 400px;
}
</style>
