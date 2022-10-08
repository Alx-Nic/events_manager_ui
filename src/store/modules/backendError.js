const state = {
    backendError:{
        hasError:false,
        statusCode:"",
        errorMessage:""
    }
};

const mutations ={
    updateBackendError: (currentState , backendError) =>{
        currentState.backendError = backendError,
        currentState.backendError.hasError = true
    },
    clearBackendError: (currentState) =>{
        currentState.backendError.hasError = false;
        currentState.backendError.statusCode = ""
        currentState.backendError.errorMessage = ""
    }
}

const getters ={
    backendError: (state) => state.backendError
}

export default {state, mutations, getters}