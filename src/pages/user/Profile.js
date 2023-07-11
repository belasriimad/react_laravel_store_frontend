import React, { useEffect } from 'react';
import ProfileSidebar from '../../components/user/ProfileSidebar';
import { useSelector } from 'react-redux';
import UpdateUserInfosForm from '../../components/user/UpdateUserInfosForm';
import Spinner from '../../components/spinner/Spinner';
import useTitle from '../../helpers/useTitle';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, token, isLoggedIn } = useSelector(state => state.user);
    const navigate = useNavigate();
    
    //set page title
    useTitle('Profile');

    useEffect(() => {
        if(!isLoggedIn) navigate('/login');
    }, [isLoggedIn, navigate]);

    const renderUserInfos = () => (
        user && <>
            <ProfileSidebar user={user} token={token} />
            <UpdateUserInfosForm user={user} token={token} updating={true} />
        </>
    )

    return (
        <div className='container'>
            <div className="row mt-5 pb-5">
                { 
                    !user ? 
                        <Spinner /> 
                    : 
                    renderUserInfos()
                }
            </div>
        </div>
    )
}
