<template>
    <v-card>
        <v-card-title class="primary--text">
            Войти в аккаунт
        </v-card-title>
        <v-card-text>
            <v-text-field 
                v-model="user.username"
                :error-messages="usernameErrors"
                required
                @input="$v.user.username.$touch()"
                @blur="$v.user.username.$touch()"
                label="Имя пользователя"
                outlined></v-text-field>
            <v-text-field 
                v-model="user.password"
                :error-messages="passwordErrors"
                required
                @input="$v.user.password.$touch()"
                @blur="$v.user.password.$touch()"
                label="Пароль" 
                outlined 
                type="password"></v-text-field>
            <v-alert
                v-if="error"
                prominent
                type="error"
            >
                {{error}}
            </v-alert>
            <div class="d-flex">
                <v-spacer></v-spacer>
                <a class="w-100 text-right text-decoration-underline" @click="$router.push('/register')">Регистрация</a>
            </div>
        </v-card-text>
        <v-card-actions class="pt-0 pr-4">
            <v-spacer></v-spacer>
            <v-btn @click="clear">
                Очистить
            </v-btn>
            <v-btn @click="submit" color="primary">
                Войти
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    props: {
        error: {
            type: [String, Boolean],
            default: false
        }
    },
    validations: {
        user:{
            username: { required },
            password: { required },
        }
    },
    data(){
        return{
            user:{
                username: '',
                password: ''
            }
        }
    },
    methods:{
        clear(){
            this.$v.$reset()
            this.user = {}
        },
        submit(){
            this.$v.$touch()
            if (this.$v.user.$anyError) return
            this.$emit('submit', this.user)
        }

    },
    computed:{
        usernameErrors () {
            const errors = []
            if (!this.$v.user.username.$dirty) return errors
            !this.$v.user.username.required && errors.push('Введите имя пользователя')
            return errors
        },
        passwordErrors () {
            const errors = []
            if (!this.$v.user.password.$dirty) return errors
            !this.$v.user.password.required && errors.push('Введите пароль')
            return errors
        },
    }
    
}
</script>
