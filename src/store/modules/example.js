const example = {
    state: {
        text: ''
    },
    getters: {
        getText: state => state.text
    },
    actions: {
        ubahText({commit}, newtext) {
            commit('setText', newtext)
        }
    },
    mutations: {
        setText: (state, text) => (state.text = text)
    }
};

export default example;