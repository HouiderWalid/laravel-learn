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
                <h2 class="w-100 text-center mb-4 font-weight-bolder">{{ $t('employee_register')| capw }}</h2>
                <b-alert :show="!registerForm[5].validate" variant="danger" class="mb-4">{{
                        registerForm[5].errors[0]
                    }}
                </b-alert>
                <b-form-group :id="registerForm[0].id+'-group'" :label="$t(registerForm[0].title) | capfw"
                              :label-for="registerForm[0].id"
                              class="font-weight-bold">
                    <b-form-input
                        :id="registerForm[0].id"
                        :name="registerForm[0].id"
                        class="font-weight-bold"
                        v-model="registerForm[0].content"
                        :state="registerForm[0].errors.length <= 0 && registerForm[0].validate"
                        :aria-describedby="registerForm[0].id+'-feedback'"
                    ></b-form-input>
                    <b-form-invalid-feedback
                        :id="registerForm[0].id+'-feedback'"
                        class="font-weight-normal">
                        {{ registerForm[0].errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group :id="registerForm[1].id+'-group'" :label="$t(registerForm[1].title) | capfw"
                              :label-for="registerForm[1].id"
                              class="font-weight-bold">
                    <b-form-input
                        :id="registerForm[1].id"
                        :name="registerForm[1].id"
                        placeholder="example@domain.com"
                        class="font-weight-bold"
                        v-model="registerForm[1].content"
                        :state="registerForm[1].errors.length <= 0 && registerForm[1].validate"
                        :aria-describedby="registerForm[1].id+'-feedback'"
                    ></b-form-input>
                    <b-form-invalid-feedback
                        :id="registerForm[1].id+'-feedback'"
                        class="font-weight-normal">
                        {{ registerForm[1].errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group :id="registerForm[2].id+'-group'" :label="$t(registerForm[2].title) | capfw"
                              :label-for="registerForm[2].id"
                              class="font-weight-bold">
                    <b-form-input
                        :id="registerForm[2].id"
                        :name="registerForm[2].id"
                        type="password"
                        class="font-weight-bold"
                        v-model="registerForm[2].content"
                        :state="registerForm[2].errors.length <= 0 && registerForm[2].validate"
                        :aria-describedby="registerForm[2].id+'-feedback'"
                    ></b-form-input>
                    <b-form-invalid-feedback
                        :id="registerForm[2].id+'-feedback'"
                        class="font-weight-normal">
                        {{ registerForm[2].errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group :id="registerForm[3].id+'-group'" :label="$t(registerForm[3].title) | capfw"
                              :label-for="registerForm[3].id"
                              class="font-weight-bold">
                    <b-form-input
                        :id="registerForm[3].id"
                        :name="registerForm[3].id"
                        type="password"
                        class="font-weight-bold"
                        v-model="registerForm[3].content"
                        :aria-describedby="registerForm[3].id+'-feedback'"
                    ></b-form-input>
                    <!--b-form-invalid-feedback
                        :id="registerForm[3].id+'-feedback'"
                        class="font-weight-normal">
                        {{ registerForm[3].errors[0] }}
                    </b-form-invalid-feedback-->
                </b-form-group>
                <b-form-checkbox
                    :id="registerForm[4].id"
                    :name="registerForm[4].id"
                    class="font-weight-bold"
                    v-model="registerForm[4].content"
                >
                    {{ $t('remember_me') }}.
                </b-form-checkbox>
                <b-button variant="success" class="mb-1 mt-3 font-weight-bold py-2" @click="registerEmployee">{{
                        $t('register') | capfw
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
            </div>
        </div>
    </div>
</template>

<script>
import langSelect from './ui/select_language'
import lang from "../plugins/languages";
export default {
    name: "register_page",
    components: {
      langSelect
    },
    data: function(){
        return {
            registerForm: [
                {
                    id: 'employee_username',
                    title: 'username',
                    errors: [],
                    content: '',
                    validate: null
                },
                {
                    id: 'employee_email',
                    title: 'email',
                    errors: [],
                    content: '',
                    validate: null
                },
                {
                    id: 'employee_password',
                    title: 'password',
                    errors: [],
                    content: '',
                    validate: null
                },
                {
                    id: 'employee_password_confirmation',
                    title: 'password_confirmation',
                    errors: [],
                    content: '',
                    validate: null
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
            return this.$store.getters.isLoading(this.$store.getters.getConstants.REGISTER)
        }
    },
    methods: {
        displayErrors() {
            let err = this.$store.getters.getFormMessages(this.$store.getters.getConstants.REGISTER)
            this.registerForm.forEach(field => {
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
            await this.$store.dispatch('socialMediaLogin', {case: this.$store.getters.getConstants.REGISTER, provider: provider})
            this.displayErrors()
        },
        async registerEmployee(){
            await this.$store.dispatch('register', [
                {name: this.registerForm[0].id, data: this.registerForm[0].content},
                {name: this.registerForm[1].id, data: this.registerForm[1].content},
                {name: this.registerForm[2].id, data: this.registerForm[2].content},
                {name: this.registerForm[3].id, data: this.registerForm[3].content},
                {name: this.registerForm[4].id, data: this.registerForm[4].content}
            ])

            this.displayErrors()

            if (this.$store.getters.getAuth) await this.$router.push('/')
        }
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
