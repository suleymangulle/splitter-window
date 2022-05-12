import React from 'react';
import { HeaderModel } from './header-model';

const Header = (props: HeaderModel) => {
    return <div className="page-header">
        <div className='header-title'>
            {props.Title}
        </div>
        <div className='header-profile-text'>
            {props.ProfileText}
        </div>
    </div>
}

export default Header;