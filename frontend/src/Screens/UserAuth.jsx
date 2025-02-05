import React, { useState, useEffect, useContext } from 'react';
import { ColorRing } from 'react-loader-spinner';
// import { UserContext } from './context/user.context';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';

function UserAuth({ children }) {
  const [loading, setLoading] = useState(true); // Default loading state is true until we know the user state
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || !user) {
      navigate('/login'); // If no token or user, redirect to login page
    } else {
      setLoading(false); // If there is a user, stop the loading state
    }
  }, [user, token, navigate]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default UserAuth;
