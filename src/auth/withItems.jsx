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