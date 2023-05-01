import React, { Fragment } from 'react';
import { useDropdown } from './dropdown-context';

const List = ({children}) => {
    const {show} = useDropdown()
    return (
        <Fragment>
            {show && (
                <div className="dropdown-item">
                    {children}
                </div>
            )}
        </Fragment>
    );
};

export default List;