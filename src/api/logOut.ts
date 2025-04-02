import UseMyStore from "../store/UseMyStore"

function logOut() {
    const state = UseMyStore.getState()
    state.logout()
}

export default logOut