import React, { Fragment, useState } from 'react';
import IconEyeClose from '../icon/IconEyeClose';
import IconEyeOpen from '../icon/IconEyeOpen';
import Input from './Input';

const InputPasswordToogle = ({control}) => {
    const [tooglePassword, setTooglePassword] = useState(false)
    const hanleTooglePassword = () => {
        setTooglePassword(!tooglePassword)
    }
    if(!control) return null;
    return (
        <Fragment>
            <Input
                placeholder='Enter your password'
                type={tooglePassword ? 'text' : 'password'}
                name='password'
                control={control}
                >
                {tooglePassword ? 
                (<IconEyeOpen onClick={hanleTooglePassword} className='icon-eye'></IconEyeOpen>)
                : 
                (<IconEyeClose onClick={hanleTooglePassword} className='icon-eye'></IconEyeClose>)}
            </Input>            
        </Fragment>
    );
};

export default InputPasswordToogle;