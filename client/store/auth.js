import { setItem, getItem } from "~/helpers/persistanceStorage"

export const state = ()=>{
    return{
        user:{},
        token: '',
        isLoggedIn: ''
    }
}
export const actions = {
    logIn({commit}, user){
        return new Promise((resolve, reject)=>{
            this.$axios.post('/auth', user).then((res)=>{
                let data = res.data
                if(data.status ==='error'){
                    commit('logout')
                    return reject(data.info)
                }  
                if(data.status ==='ok') {
                    commit('setUser', data.data)
                    return resolve(data.data)
                }
              }
            )
        })
    },
    register({commit}, user){
        return new Promise((resolve, reject)=>{
            this.$axios.post('/register', user).then((res)=>{
                let data = res.data
                if(data.status ==='error') return reject(data.info)
                if(data.status ==='ok') {
                    return resolve(data)
                }
              }
            )
        })
    },
}

export const mutations = {
    setUser(state, user){
        state.isLoggedIn = true
        setItem('user', user)
        state.user = user
    },
    logout(state){
        state.user = {}
        state.isLoggedIn = false
        getItem('user')
        setItem('user', null)
    }
}