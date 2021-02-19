<template>
    <div class="d-flex flex-column">
        <div>
            <h1 class="text-left" style="margin: 100px">{{ 'profile' | capfw }}</h1>
        </div>
        <div class="d-flex flex-row flex-wrap justify-content-around px-5">
            <div class="mb-4 d-flex flex-column align-items-center" style="flex-grow: 1">
                <div class="shadow-sm rounded-circle">
                    <img class="rounded-circle" height="200" width="200" style="max-width: 250px" :src="display_image" alt="profile_avatar">
                </div>
                <b-form-file v-model="setImage" ref="img_up_btn" class="mt-3 d-none" plain></b-form-file>
                <b-button variant="success" class="mt-5 font-weight-bold" style="min-width: 100px" @click="() => this.$refs.img_up_btn.$el.click()">{{
                        $t('change') | capfw
                    }}
                </b-button>
            </div>
            <div class="p-5 mb-4 shadow-sm" style="flex-grow: 2; width: 600px">
                <div class="d-flex flex-wrap flex-row justify-content-between w-100">
                    <div v-for="field in normalFields" class="">
                        <b-form-group v-if="field.type === 'normal'" :id="field.id+'-group'" :label="$t(field.title) | capfw"
                                      :label-for="field.id"
                                      class="font-weight-bold" style="width: 100%; min-width: 300px">
                            <b-form-input
                                :id="field.id"
                                :name="field.id"
                                class="font-weight-bold"
                                v-model="field.content"
                                :state="field.errors.length <= 0 && field.validate"
                                :aria-describedby="field.id+'-feedback'"
                            ></b-form-input>
                            <b-form-invalid-feedback
                                :id="field.id+'-feedback'"
                                class="font-weight-normal">
                                {{ field.errors[0] }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group v-if="field.type === 'checkbox'" :id="field.id+'-group'" :label="$t(field.title) | capfw"
                                      :label-for="field.id"
                                      class="font-weight-bold">
                            <b-form-checkbox
                                :id="field.id"
                                :name="field.id"
                                class="font-weight-bold"
                                v-model="field.content"
                                :state="field.errors.length <= 0 && field.validate"
                                :aria-describedby="field.id+'-feedback'"
                            ></b-form-checkbox>
                            <b-form-invalid-feedback
                                :id="field.id+'-feedback'"
                                class="font-weight-normal">
                                {{ field.errors[0] }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </div>
                </div>
                <b-button variant="success" class="mb-1 mt-3 font-weight-bold" style="min-width: 100px; float: right" @click="updateProfile">{{
                        $t('save') | capfw
                    }}
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "profile_page",
    data: function () {
        return {
            profile_form: [
                {
                    id: 'employee_company',
                    title: 'company',
                    type: 'select',
                    content: '',
                    errors: [],
                    validate: null
                },
                {
                    id: 'employee_image',
                    title: 'image',
                    type: 'file',
                    content: '',
                    errors: [],
                    validate: null
                },
                {
                    id: 'employee_username',
                    title: 'username',
                    type: 'normal',
                    content: '',
                    errors: [],
                    validate: null
                },
                {
                    id: 'employee_email',
                    title: 'email',
                    type: 'normal',
                    content: '',
                    errors: [],
                    validate: null
                },
                {
                    id: 'employee_first_name',
                    title: 'first_name',
                    type: 'normal',
                    content: '',
                    errors: [],
                    validate: null
                },
                {
                    id: 'employee_last_name',
                    title: 'last_name',
                    type: 'normal',
                    content: '',
                    errors: [],
                    validate: null
                },
                {
                    id: 'employee_function',
                    title: 'function',
                    type: 'normal',
                    content: '',
                    errors: [],
                    validate: null
                },
                {
                    id: 'employee_phone',
                    title: 'phone',
                    type: 'normal',
                    content: '',
                    errors: [],
                    validate: null
                },
                {
                    id: 'employee_address',
                    title: 'address',
                    type: 'textarea',
                    content: '',
                    errors: [],
                    validate: null
                },
                {
                    id: 'employee_password',
                    title: 'password',
                    type: 'normal',
                    content: '',
                    errors: [],
                    validate: null
                },
                {
                    id: 'employee_password_confirmation',
                    title: 'password_confirmation',
                    type: 'normal',
                    content: '',
                    errors: [],
                    validate: null
                },
            ],
            general_error: {
                id: 'general_error',
                errors: [],
                validate: true
            },
            display_image: ''
        }
    },
    computed: {
        normalFields(){
            return this.profile_form.filter(field => field.type === 'normal')
        },
        setImage: {
            get: function () {},
            set: function (file) {
                if (file instanceof File)
                    this.profile_form[1].content = file
                this.getImage()
            }
        },
    },
    methods: {
        getUserProfile(){
            let user = this.$store.getters.getUser
            if (user instanceof Object)
                Object.keys(user).forEach(fieldKey => {
                    for (let field of this.profile_form){
                        if (field.id === fieldKey) field.content = user[fieldKey]
                    }
                })
        },
        async updateProfile(){
            console.log(this.profile_form)
            await this.$store.dispatch('updateUserProfile', this.profile_form)
            this.displayErrors()
        },
        getImage(){
            let file = this.profile_form[1].content
            if(typeof file == 'string') this.display_image = this.profile_form[1].content
            if (file instanceof File) {
                let fileReader = new FileReader()
                fileReader.onload = e => this.display_image = e.target.result
                fileReader.readAsDataURL(file)
            }
        },
        displayErrors() {
            let err = this.$store.getters.getFormMessages(this.$store.getters.getConstants.PROFILE)
            this.profile_form.forEach(field => {
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
    },
    mounted() {
        console.log('profile')
        this.getUserProfile()
        this.getImage()
    }
}
</script>

<style scoped>

</style>
