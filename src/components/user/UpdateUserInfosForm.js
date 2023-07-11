import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL, getConfig } from '../../helpers/config';
import { checkIfUserDataIsValid, setCurrentUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Spinner from '../../components/spinner/Spinner';

export default function UpdateUserInfosForm({ user, updating, token}) {
    const [userInfos, setUserInfos] = useState({
        phone_number: user.phone_number || '',
        email: user.email || '',
        country: user.country || '',
        state: user.state || '',
        city: user.city || '',
        zip_code: user.zip_code || '',
        first_address: user.first_address || '',
        second_address: user.second_address || '',
    });
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const saveUserInfos = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}/user/update/${user.id}`, 
                userInfos, getConfig(token));
            dispatch(setCurrentUser(response.data.user));
            dispatch(checkIfUserDataIsValid());
            setLoading(false);
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <div className='col-md-8 mx-auto'>
            <form onSubmit={(e) => saveUserInfos(e)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-2">
                            <input type="text" 
                                value={userInfos.phone_number}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, phone_number: e.target.value
                                })}
                                required
                                maxLength={255}
                                className="form-control" 
                                placeholder='Phone number'
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-2">
                            <input type="text" 
                                value={userInfos.email}
                                readOnly
                                className="form-control" 
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-2">
                            <input type="text" 
                                value={userInfos.first_address}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, first_address: e.target.value
                                })}
                                required
                                maxLength={255}
                                className="form-control" 
                                placeholder='Address 1'
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-2">
                            <input type="text" 
                                value={userInfos.second_address}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, second_address: e.target.value
                                })}
                                maxLength={255}
                                className="form-control" 
                                placeholder='Address 2'
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-2">
                            <input type="text" 
                                value={userInfos.zip_code}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, zip_code: e.target.value
                                })}
                                required
                                maxLength={255}
                                className="form-control" 
                                placeholder='Zip code'
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-2">
                            <input type="text" 
                                value={userInfos.city}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, city: e.target.value
                                })}
                                required
                                maxLength={255}
                                className="form-control" 
                                placeholder='City'
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-2">
                            <input type="text" 
                                value={userInfos.state}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, state: e.target.value
                                })}
                                maxLength={255}
                                className="form-control" 
                                placeholder='State'
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-2">
                            <input type="text" 
                                value={userInfos.country}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, country: e.target.value
                                })}
                                required
                                maxLength={255}
                                className="form-control" 
                                placeholder='Country'
                            />
                        </div>
                    </div>
                </div>
                {
                    loading ? <Spinner />
                    :
                    updating && <button type='submit' 
                        className="btn btn-sm btn-primary">
                        Update
                    </button>
                }
            </form>
        </div>
    )
}
