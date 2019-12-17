// TODO Delete this file withItems.jsx once no other file is using it

import React from 'react';
import { ItemsConsumer } from "../data/ItemsStore";
export function withItems(Component) {
    return function WrapperComponent(props) {
        return (
            <ItemsConsumer>
                {state => <Component {...props} items={state} />}
            </ItemsConsumer>
        );
    };
}