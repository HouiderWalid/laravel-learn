<template>
    <div class="h-100 d-flex flex-row flex-md-wrap justify-content-around">
        <div class="p-4 bord">
            <div class="rounded-circle bord" style="min-width: 300px">

            </div>
        </div>
        <div class="p-5 bord" style="min-width: 700px">
            <div v-for="field in normalFields" class="">
                <b-form-group :id="field.id+'-group'" :label="$t(field.title) | capfw"
                              :label-for="field.id"
                              class="font-weight-bold">
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
                    type: 'image',
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
            ]
        }
    },
    computed: {
        normalFields(){
            return this.profile_form.filter(field => field.type === 'normal')
        }
    }
}
</script>

<style scoped>

</style>
