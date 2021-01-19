import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '../store'
import languages from "./languages";

Vue.use(VueI18n);

const messages = {
    'en': {
        // login
        employee_login: "employee login",
        login: "login",
        username: "username",
        password: "password",
        remember_me: "remember me",
        forgot_password: "forgot your password",
        sign_up: "signup",

        // registration
        employee_register: "create employee account",
        register: "register",
        email: "email",
        password_confirmation: "password confirmation",

        // dashboard
        dashboard: "dashboard",
        profile: "profile",

        // reset password
        reset_password_title: 'reset your password',
        reset_password: 'reset password'
    },
    'fr': {
        // login
        employee_login: "connection d'employer",
        login: "se connecter",
        username: "nom d'utilisateur",
        password: "mot de passe",
        remember_me: "se souvenir de moi",
        forgot_password: "vous avez oublier votre mot de passe",
        sign_up: "s'enregistrer",

        // registration
        employee_register: "créer un compte employée",
        register: "s'enregistrer",
        email: "email",
        password_confirmation: "confirmation de mot de passe",

        // dashboard
        dashboard: "tableau de bord",
        profile: "profil",

        // reset password
        reset_password_title: 'réinitializer votre mot de passe',
        reset_password: 'réinitializer le mot de passe'
    }
};

const i18n = new VueI18n({
    locale: store.getters.getLanguage ? store.getters.getLanguage.lang : navigator.language.split('-')[0],
    fallbackLocale: 'en',
    messages,
});

export default i18n
