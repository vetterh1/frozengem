const setStateAsync = (that, state) => {
    return new Promise(resolve => {
        that.setState(state, resolve);
    });
}

export default setStateAsync;
