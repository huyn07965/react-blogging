import React from 'react';
import styled from 'styled-components';
import { useDropdown } from './dropdown-context';
const SearchStyles = styled.div`
    .search{
        padding: 16px;
        outline: none;
        width: 100%;
        border: 1px solid ${props => props.theme.grayDark};
        border-radius: 4px;
    }
`
const Search = ({placeholder, props}) => {
    const {onChange} = useDropdown();
    return (
        <SearchStyles>
            <input
                type="text"
                placeholder={placeholder}
                className="search"
                onChange={onChange}
                {...props}
            />
        </SearchStyles>
    );
};

export default Search;