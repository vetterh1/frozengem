import React from "react";
import * as log from 'loglevel';
import stringifyOnce from '../utils/stringifyOnce.js'

const logUserInfoStore = log.getLogger('logUserInfoStore');
// loglevelServerSend(logUserInfoStore); // a setLevel() MUST be run AFTER this!
logUserInfoStore.setLevel('debug');
logUserInfoStore.debug('--> entering UserInfoStore.jsx');




// (!) Should arrive localized from server (!)

const defaultUserInfo = {
    version: 1,    
    language: "en"
};

export const UserInfoContext = React.createContext();



export class UserInfoStore extends React.Component {
    state = {
        load: () => this.load(),
        save: () => this.save(),
        switchToFR: () => {this.setState({language: "fr"}, () => this.save())},
        switchToEN: () => {this.setState({language: "en"}, () => this.save())},
        getLanguage: () => {return this.state.language},
    };

    componentDidMount() {
        this.state.load();
    }
    
    load() {
        // Get from local storage first
        const rawFromCache = localStorage.getItem('UserInfo');
        let needLocalSave = false;
        let userInfo = null;
        if(rawFromCache) {
            userInfo = JSON.parse(rawFromCache);
        }
        
        // if no local storage or older than default values, use default
        if(!rawFromCache || !userInfo || userInfo.version < defaultUserInfo.version) {
            // if no local storage: use default values
            userInfo = {...defaultUserInfo};
            // and save them in local storage for next time
            needLocalSave = true;
        }

        // Server query to get the latest
        // should check if version is higher 

        if(needLocalSave) {
            localStorage.setItem('UserInfo', JSON.stringify(userInfo));
        }

        this.setState(userInfo);

        console.log('UserInfoStore: userInfo', stringifyOnce(userInfo));
    }

    save() {
        localStorage.setItem('UserInfo', JSON.stringify(this.state));
    }

    render() {
        const { state, props: { children } } = this;
        return <UserInfoContext.Provider value={state}>{children}</UserInfoContext.Provider>;
     }
}

export const UserInfoConsumer = UserInfoContext.Consumer;
