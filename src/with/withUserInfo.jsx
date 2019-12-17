// TODO Delete this file withUserInfo.jsx once no other file is using it

import React from 'react';
import { UserInfoConsumer } from "../data/UserInfoStore";
export function withUserInfo(Component) {
    return function WrapperComponent(props) {
        return (
            <UserInfoConsumer>
                {state => <Component {...props} userInfo={state} />}
            </UserInfoConsumer>
        );
    };
}