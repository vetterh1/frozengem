//
// Create Size icon array
//

import Person from "@material-ui/icons/Person";
import PersonOutline from "@material-ui/icons/PersonOutline";

const SizeInIcons = (size) => {
    const sizeInIcons = [];
    if (size) {
        for (let i = 0; i < size; i++) {
            sizeInIcons.push(
                <Person style={{ fontSize: 20 }} key={i.toString()} />
            );
        }
        if (size > 1)
            sizeInIcons.push(
                <PersonOutline style={{ fontSize: 20 }} key={size.toString()} />
            );
    }
    return sizeInIcons;
};

export default SizeInIcons;