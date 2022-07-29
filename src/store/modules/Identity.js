import {authenticate} from "@/api/Auth.api";
import router from "@/router";
//import router from "@/router"; 

const state = {
    currentUser: {}
}

const actions = {
    async performLogIn({ commit }, logindata) {

        let authRequest = {
            username: logindata.username,
            password: logindata.password
        }

        authenticate("v1", authRequest).then(res => {
            let currentUser = {
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                role: res.data.role,
                userId: res.data.userId,
                token: res.data.token
            }

            commit('updateCurrentUser', currentUser);
            
            switch (currentUser.role.toLowerCase()) {
                case "admin":
                    console.log("admin");
                    break;
                case "registrant":
                    console.log("registrant");
                    break;
                case "guest":
                    console.log("guest");
                    break
                default:
                    console.log("Role not identified");
                    break;
            }   

            router.push("/");
        }).catch((err) => {
            if (err.response) {
                console.log("Server responded with error.");
            } else if (err.request) {
                console.log("No response was returned from the server.");
            } else {
                console.log('Error', err.message);
            }
        }); 
    },
    logout({ commit}){
        commit('doLogout');
        router.push('/login')
        console.log('Log out request.');
    }
}

const mutations = {
    updateCurrentUser: (currentState, userData) => {
        currentState.currentUser = userData;
    },
    doLogout: (currentState) => {
        currentState.currentUser = {}
    }
}

const getters = {
    currentUser: (state) => state.currentUser,
    isLoggedIn: (state) =>  state.currentUser.token != null 
}

export default {state, actions, mutations, getters};
