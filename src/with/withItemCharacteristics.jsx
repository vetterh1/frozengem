// TODO Delete this file withItemCharacteristics.jsx once no other file is using it

import React from 'react';
import { ItemCharacteristicsConsumer } from "../data/ItemCharacteristicsStore";
export function withItemCharacteristics(Component) {
    return function WrapperComponent(props) {
        return (
            <ItemCharacteristicsConsumer>
                {state => <Component {...props} itemCharacteristics={state} />}
            </ItemCharacteristicsConsumer>
        );
    };
}