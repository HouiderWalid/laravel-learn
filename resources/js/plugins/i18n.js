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
        reset_password: 'reset password',

        // reset password message
        reset_message_header: 'Reset Password',
        reset_message_body_1: 'Your password verification email has been sent to',
        reset_message_body_2: 'Please check your email to reset your password.',
        reset_message_footer_1: 'return to login page',
        reset_message_footer_2: 'here',

        // profile
        first_name: 'first name',
        last_name: 'last name',
        change: 'change',
        function: 'function',
        phone: 'phone',
        save: 'save'
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
        reset_password: 'réinitializer le mot de passe',

        // reset password message
        reset_message_header: 'Réinitialization de mot de passe',
        reset_message_body_1: 'Votre mot de passe a été envoyer à',
        reset_message_body_2: 'Vérifier s\'il vous plaîs votre boite email pour le changer',
        reset_message_footer_1: 'Retourner à la page de connection',
        reset_message_footer_2: 'ici',

        // profile
        first_name: 'prénom',
        last_name: 'nom',
        change: 'changer',
        function: 'fonction',
        phone: 'tèlèphone',
        save: 'sauvgarder'
    }
};

const i18n = new VueI18n({
    locale: store.getters.getLanguage ? store.getters.getLanguage.lang : navigator.language.split('-')[0],
    fallbackLocale: 'en',
    messages,
});

export default i18n
