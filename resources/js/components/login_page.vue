<template>
    <div class="d-flex align-items-center flex-column vh-100 w-100">
        <div id="form-container" class="d-flex flex-column align-items-center w-100 h-100 pt-4">
            <langSelect :langs="languages" :selected="currentLanguage" @update-lang="updateLanguage"></langSelect>
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
                <h2 class="w-100 text-center mb-4 font-weight-bolder">{{ $t('employee_login')| capw }}</h2>
                <b-alert :show="!loginForm[3].validate" variant="danger" class="mb-4">{{
                        loginForm[3].errors[0]
                    }}
                </b-alert>
                <b-form-group :id="loginForm[0].id+'-group'" :label="$t(loginForm[0].title) | capfw"
                              :label-for="loginForm[0].id"
                              class="font-weight-bold">
                    <b-form-input
                        :id="loginForm[0].id"
                        :name="loginForm[0].id"
                        placeholder="example@domain.com"
                        class="font-weight-bold"
                        v-model="loginForm[0].content"
                        :state="loginForm[0].errors.length <= 0 && loginForm[0].validate"
                        :aria-describedby="loginForm[0].id+'-feedback'"
                    ></b-form-input>
                    <b-form-invalid-feedback
                        :id="loginForm[0].id+'-feedback'"
                        class="font-weight-normal">
                        {{ loginForm[0].errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group :id="loginForm[1].id+'-group'" :label="$t(loginForm[1].title) | capfw"
                              :label-for="loginForm[1].id"
                              class="font-weight-bold">
                    <b-form-input
                        :id="loginForm[1].id"
                        type="password"
                        :name="loginForm[1].id"
                        class="font-weight-bold"
                        v-model="loginForm[1].content"
                        :state="loginForm[1].errors.length <= 0 && loginForm[1].validate"
                        :aria-describedby="loginForm[1].id+'-feedback'"
                    ></b-form-input>
                    <b-form-invalid-feedback
                        :id="loginForm[1].id+'-feedback'"
                        class="font-weight-normal">
                        {{ loginForm[1].errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-checkbox
                    :id="loginForm[2].id"
                    :name="loginForm[2].id"
                    class="font-weight-bold"
                    v-model="loginForm[2].content"
                >
                    {{ $t('remember_me') }}.
                </b-form-checkbox>
                <b-button variant="success" class="mb-1 mt-3 font-weight-bold py-2" @click="login">{{
                        $t('login') | capfw
                    }}
                </b-button>
                <b-button variant="outline-primary" class="my-1 font-weight-bold">
                    <b-icon icon="facebook" class="mr-2"></b-icon>
                    Facebook
                </b-button>
                <b-button variant="outline-danger" class="my-1 font-weight-bold" @click="socialMediaLogin('google')">
                    <b-icon icon="google" class="mr-2"></b-icon>
                    Google
                </b-button>
                <a href="/reset/password" class="w-100 text-center mt-4">{{ $t('forgot_password') }} ?</a>
                <a href="/register" class="w-100 text-center mt-1">{{ $t('sign_up') }} ?</a>
            </div>
        </div>
    </div>
</template>
<script>
import langSelect from './ui/select_language'
import lang from "../plugins/languages";
export default {
    name: "login_page",
    components: {
      langSelect
    },
    data: function () {
        return {
            loginForm: [
                {
                    id: 'employee_username',
                    title: 'username',
                    errors: [],
                    content: '',
                    validate: null,
                },
                {
                    id: 'employee_password',
                    title: 'password',
                    errors: [],
                    content: '',
                    validate: null,
                },
                {
                    id: 'employee_remember_me',
                    title: 'remember me.',
                    errors: [],
                    content: false,
                    validate: null,
                },
                {
                    id: 'general_error',
                    errors: [],
                    validate: true
                }
            ],
            languages: lang.languages,
            currentLanguage: this.$store.getters.getLanguage ? this.$store.getters.getLanguage : navigator.language.split('-')[0]
        }
    },
    computed: {
        isLoading() {
            return this.$store.getters.isLoading(this.$store.getters.getConstants.LOGIN)
        }
    },
    methods: {
        async login() {
            await this.$store.dispatch('login', [
                {name: this.loginForm[0].id, data: this.loginForm[0].content},
                {name: this.loginForm[1].id, data: this.loginForm[1].content},
                {name: this.loginForm[2].id, data: this.loginForm[2].content}
            ])
            this.displayErrors()

            if (this.$store.getters.getAuth) await this.$router.push('/')
        },
        clearErrors(){
            this.$store.dispatch('clearErrors')
        },
        displayErrors() {
            let err = this.$store.getters.getFormMessages(this.$store.getters.getConstants.LOGIN)
            this.loginForm.forEach(field => {
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
        async socialMediaLogin(provider){
            await this.$store.dispatch('socialMediaLogin', {case: this.$store.getters.getConstants.LOGIN, provider: provider})
        }
    },
    created() {
        console.log('login')
        console.log(document.querySelector("html").lang)
        document.title = 'login page'
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
