import Axios from "axios";
import globals from "../../helpers/globals"
const instance = Axios.create({
    baseURL: globals.app_url + "api/",
    timeout: 60000,
    xsrfHeaderName: 'X-XSRF-TOKEN',
    xsrfCookieName: 'X-XSRF-TOKEN',
    headers: {
        'content-type': 'multipart/form-data',
        'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").content
    },
    responseType: 'json'
});
const constants = {
    DEFAULT: 0,
    LOGIN: 1,
    REGISTER: 2,
    RESET_PASSWORD: 3,
    RESET_PASSWORD_CALL_BACK: 4,
    NOTIFICATIONS: 5,
    PROFILE: 6
}

const state ={
    user:{
        profile: null,
        logged: false,
        token: null,
        lang: null,
        reset_password_data: null
    },
    user_login_form:{
        loading: false,
        messages: {
            "errors": {}
        }
    },
    user_register_form:{
        loading: false,
        messages: {
            "errors": {}
        }
    },
    user_reset_password_form:{
        loading: false,
        messages: {
            "errors": {}
        },
        validate: false
    },
    user_reset_password_callback_form:{
        loading: false,
        messages: {
            "errors": {}
        }
    },
    user_notifications: {
        loading: false,
        notifications: []
    },
    user_profile_form:{
        loading: false,
        messages: {
            "errors": {}
        }
    }
}

const mutations ={
    SET_LOGGED(state, status){
        state.user.logged = status.state
    },
    SET_USER_PROFILE(state, profile){
        state.user.profile = profile
    },
    SET_LOADING(state, payload){
        switch (payload.case) {
            case constants.DEFAULT:
                state.user_login_form.loading = payload.state
                state.user_register_form.loading = payload.state
                break
            case constants.LOGIN:
                state.user_login_form.loading = payload.state
                break
            case constants.REGISTER:
                state.user_register_form.loading = payload.state
                break
            case constants.RESET_PASSWORD:
                state.user_reset_password_form.loading = payload.state
                break
            case constants.RESET_PASSWORD_CALL_BACK:
                state.user_reset_password_callback_form.loading = payload.state
                break
            case constants.NOTIFICATIONS:
                state.user_notifications.loading = payload.state
                break
            case constants.PROFILE:
                state.user_profile_form.loading = payload.state
                break
            default :
                console.log('nothing to load')
        }
    },
    SET_TOKEN(state, token){
        state.user.token = token
    },
    SET_FORM_MESSAGES(state, payload){
        let msg = null
        switch (payload.case) {
            case constants.LOGIN:
                msg = state.user_login_form.messages
                break
            case constants.REGISTER:
                msg = state.user_register_form.messages
                break
            case constants.RESET_PASSWORD:
                msg = state.user_reset_password_form.messages
                break
            case constants.RESET_PASSWORD_CALL_BACK:
                msg = state.user_reset_password_callback_form.messages
                break
            case constants.PROFILE:
                msg = state.user_profile_form.messages
                break
            default:
                console.log('nothing to display')
        }
        if (msg != null){
            Object.keys(msg).forEach(key => msg[key] = {})
            msg[payload.messages.type] = payload.messages.message
        }
    },
    SET_LANGUAGE(state, payload){
        state.user.lang = payload
    },
    SET_PASSWORD_RESET(state, payload){
        state.user.reset_password_token = payload
    },
    SET_RESET_PASSWORD_VALIDATION(state, payload){
        state.user_reset_password_form.validate = payload
    },
    SET_USER_NOTIFICATIONS(state, payload){
        state.user_notifications.notifications = payload
    }
}

const actions ={
    async login({commit, state}, payload) {
        commit('SET_LOADING', {case: constants.LOGIN, state: true})
        const loginData = new FormData()
        loginData.append('lang', state.user.lang.lang || navigator.language.split('-')[0])
        payload.forEach(field => loginData.append(field.name, field.data))
        let server_response = null
        try {
            server_response = await instance.post('login', loginData)
            if (server_response != null){
                if (server_response.data.code === 200) {
                    let json_data = server_response.data.data
                    commit('SET_LOGGED', {case: constants.LOGIN, state: true})
                    commit('SET_TOKEN', { token_type: json_data['token_type'], token_content: json_data['access_token'] })
                    commit('SET_USER_PROFILE', json_data['user'])
                }else if(server_response.data.code === 401){
                    commit('SET_FORM_MESSAGES', {case: constants.LOGIN, messages: {"type": "errors", "message": server_response.data.message}})
                }else{
                    commit('SET_FORM_MESSAGES', {case: constants.LOGIN, messages: {"type": "errors", "message": {"general_error": [server_response.data.message ? server_response.data.message : 'Unknown error']}}})
                }
            }
        }catch (e) {
            commit('SET_FORM_MESSAGES', {case: constants.LOGIN, messages: {"type": "errors", "message": {"general_errors": ['server failure']}}})
        }
        commit('SET_LOADING', {case: constants.LOGIN, state: false})
    },
    async socialMediaLogin({commit}, payload){
        commit('SET_LOADING', {case: payload.case, state: true})
        let server_response = null
        try{
            server_response = await instance.get('login/'+payload.provider)
            if (server_response && server_response.data.code === 200) window.location.href = server_response.data.data
            else if(server_response){
                commit('SET_FORM_MESSAGES', {case: payload.case, messages: {"type": "errors", "message": {"general_error": [server_response.data.message ? server_response.data.message : 'Unknown error']}}})
            }
        }catch (e) {
            commit('SET_FORM_MESSAGES', {case: payload.case, messages: {"type": "errors", "message": {"general_errors": ['server failure']}}})
        }
    },
    async socialMedialCallback({commit}, payload){
        let server_response = null
        try{
            server_response = await instance.get('login/'+payload.provider+'/callback', { params: payload.query })
            if (server_response && server_response.data.code === 200){
                let json_data = server_response.data.data
                commit('SET_LOGGED', {case: constants.LOGIN, state: true})
                commit('SET_TOKEN', { token_type: json_data['token_type'], token_content: json_data['access_token'] })
                commit('SET_USER_PROFILE', json_data['user'])
            }else if (server_response){
                commit('SET_FORM_MESSAGES', {case: payload.case, messages: {"type": "errors", "message": {"general_error": [server_response.data.message ? server_response.data.message : 'Unknown error']}}})
            }
        }catch (e) {
            commit('SET_FORM_MESSAGES', {case: payload.case, messages: {"type": "errors", "message": {"general_errors": ['server failure']}}})
        }
        commit('SET_LOADING', {case: payload.case, state: false})
    },
    async register({commit, state}, payload){
        commit('SET_LOADING', {case: constants.REGISTER, state: true})
        const registerData = new FormData()
        registerData.append('lang', state.user.lang.lang || navigator.language.split('-')[0])
        payload.forEach(field => registerData.append(field.name, field.data))
        let server_response = null
        try {
            server_response = await instance.post('register', registerData)
            if (server_response != null){
                if (server_response.data.code === 200) {
                    let json_data = server_response.data.data
                    commit('SET_LOGGED', {case: constants.REGISTER, state: true})
                    commit('SET_TOKEN', { token_type: json_data['token_type'], token_content: json_data['access_token'] })
                    commit('SET_USER_PROFILE', json_data['user'])
                }else if(server_response.data.code === 401){
                    commit('SET_FORM_MESSAGES', {case: constants.REGISTER, messages: {"type": "errors", "message": server_response.data.message}})
                }else{
                    commit('SET_FORM_MESSAGES', {case: constants.REGISTER, messages: {"type": "errors", "message": {"general_error": [server_response.data.message ? server_response.data.message : 'Unknown error']}}})
                }
            }
        }catch (e) {
            commit('SET_FORM_MESSAGES', {case: constants.REGISTER, messages: {"type": "errors", "message": {"general_errors": ['server failure']}}})
        }
        commit('SET_LOADING', {case: constants.REGISTER, state: false})
    },
    async resetPassword({commit, state}, payload){
        commit('SET_LOADING', {case: constants.RESET_PASSWORD, state: true})
        const registerData = new FormData()
        registerData.append('lang', state.user.lang.lang || navigator.language.split('-')[0])
        payload.forEach(field => registerData.append(field.name, field.data))
        let server_response = null
        try {
            server_response = await instance.post('employee/reset/password/email-check', registerData)
            if (server_response != null){
                if (server_response.data.code === 200) {
                    let json_data = server_response.data.data
                    commit('SET_PASSWORD_RESET', { email: json_data['token_type'], token: json_data['access_token'] })
                    commit('SET_RESET_PASSWORD_VALIDATION', true)
                }else if(server_response.data.code === 401){
                    commit('SET_FORM_MESSAGES', {case: constants.RESET_PASSWORD, messages: {"type": "errors", "message": server_response.data.message}})
                }else{
                    commit('SET_FORM_MESSAGES', {case: constants.RESET_PASSWORD, messages: {"type": "errors", "message": {"general_error": [server_response.data.message ? server_response.data.message : 'Unknown error']}}})
                }
            }
        }catch (e) {
            commit('SET_FORM_MESSAGES', {case: constants.RESET_PASSWORD, messages: {"type": "errors", "message": {"general_errors": ['server failure']}}})
        }
        commit('SET_LOADING', {case: constants.RESET_PASSWORD, state: false})
    },
    async getUserNotifications({commit, state}, payload){
        commit('SET_LOADING', {case: payload.case, state: true})
        let server_response = null
        try {
            server_response = await instance.get('employee/notifications/'+state.user.profile.employee_id)
            console.log(server_response.data)
            if (server_response != null) {
                if (server_response.data.code === 200) {
                    commit('SET_USER_NOTIFICATIONS', JSON.parse(server_response.data.data))
                }else if (server_response.data.code === 404){
                    commit('SET_FORM_MESSAGES', {case: payload.case, messages: {"type": "errors", "message": server_response.data.message}})
                }
            }
        }catch (e) {
            commit('SET_FORM_MESSAGES', {case: payload.case, messages: {"type": "errors", "message": {"general_errors": ['server failure']}}})
        }
        commit('SET_LOADING', {case: payload.case, state: false})
    },
    async readNotifications({commit, state}){
        commit('SET_LOADING', {case: constants.RESET_PASSWORD, state: true})
        let server_response = null
        try {
            server_response = await instance.get('employee/notifications/read/'+state.user.profile.employee_id)
            if (server_response != null) {
                if (server_response.data.code === 200) {
                    commit('SET_USER_NOTIFICATIONS', JSON.parse(server_response.data.data))
                }else if (server_response.data.code === 404){
                    commit('SET_FORM_MESSAGES', {case: constants.RESET_PASSWORD, messages: {"type": "errors", "message": server_response.data.message}})
                }
            }
        }catch (e) {
            commit('SET_FORM_MESSAGES', {case: constants.RESET_PASSWORD, messages: {"type": "errors", "message": {"general_errors": ['server failure']}}})
        }
        commit('SET_LOADING', {case: constants.RESET_PASSWORD, state: false})
    },
    async updateUserProfile({commit, state}, payload){
        commit('SET_LOADING', {case: constants.PROFILE, state: true})
        const profileData = new FormData()
        profileData.append('lang', state.user.lang.lang || navigator.language.split('-')[0])
        payload.forEach(field => profileData.append(field.id, field.content))
        let server_response = null
        try {
            server_response = await instance.post('employee/update/'+state.user.profile['employee_id'], profileData)
            console.log(server_response.data)
            if (server_response != null){
                if (server_response.data.code === 200) {
                    let json_data = server_response.data.data
                    //commit('SET_USER_PROFILE', json_data['user'])
                }else if(server_response.data.code === 401){
                    commit('SET_FORM_MESSAGES', {case: constants.PROFILE, messages: {"type": "errors", "message": server_response.data.message}})
                }else{
                    commit('SET_FORM_MESSAGES', {case: constants.PROFILE, messages: {"type": "errors", "message": {"general_error": [server_response.data.message ? server_response.data.message : 'Unknown error']}}})
                }
            }
        }catch (e) {
            commit('SET_FORM_MESSAGES', {case: constants.PROFILE, messages: {"type": "errors", "message": {"general_errors": ['server failure']}}})
        }
        commit('SET_LOADING', {case: constants.PROFILE, state: false})
    },
    logout({commit}){
        commit('SET_LOGGED', {case: constants.LOGIN, state: false})
        commit('SET_TOKEN', null)
        commit('SET_USER_PROFILE', null)
    },
    changeLanguage({commit}, payload){
        commit('SET_LANGUAGE', payload)
    },
    clearErrors({commit}){
        commit('SET_FORM_MESSAGES', {case: constants.LOGIN, messages: {type: 'errors', message: {}}})
    }
}

const getters ={
    getAuth(state){
        return state.user.logged
    },
    isLoading: (state) => (caseId) =>{
        let loading = null
        switch (caseId) {
            case constants.LOGIN:
                loading = state.user_login_form.loading
                break
            case constants.REGISTER:
                loading = state.user_register_form.loading
                break
            case constants.RESET_PASSWORD:
                loading = state.user_reset_password_form.loading
                break
            case constants.PROFILE:
                loading = state.user_profile_form.loading
                break
            default:
                loading = false
        }
        return loading
    },
    getFormMessages: (state) => (caseId) => {
        let messages = null
        switch (caseId) {
            case constants.LOGIN:
                messages = state.user_login_form.messages
                break
            case constants.REGISTER:
                messages = state.user_register_form.messages
                break
            case constants.RESET_PASSWORD:
                messages = state.user_reset_password_form.messages
                break
            case constants.RESET_PASSWORD_CALL_BACK:
                messages = state.user_reset_password_callback_form.messages
                break
            case constants.PROFILE:
                messages = state.user_profile_form.messages
                break
            default:
                messages = false
        }
        return messages
    },
    getLanguage(state){
        return state.user.lang
    },
    getConstants(state){
        return constants
    },
    getPasswordResetValidation(state){
        return state.user_reset_password_form.validate;
    },
    getUser(state){
        return state.user.profile
    },
    getNotifications(state) {
        return state.user_notifications.notifications
    }
}

export default {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}
