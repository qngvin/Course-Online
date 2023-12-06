import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ProfileDetail() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer);
  const backgroundImageUrl = 'data:image/jpeg;base64,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';

  const profileStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  useEffect(() => {
  }, [dispatch]);
  if (!profile) {
    return null;
  }

  return (
    <>
      <div className="w-full mb-4 bg-white py-5 px-5 flex flex-col items-center rounded-[10px]" style={profileStyle}>
        <img
          className="rounded-full w-[150px] h-[150px] mt-7 mb-4 mx-auto"
          src={profile.image}
          alt="Avatar"
        />
        <h1 className="font-bold text-xl mt-3">
          {profile.lastName + ' ' + profile.firstName}
        </h1>
      </div >

      <div className="w-full bg-white py-5 px-5 rounded-[10px] ">
        <div className='mx-4'>  <div>
          <p className=" text-text_color_2 font-medium">Email</p>
          <p className='text-blue-600'>{profile.email}</p>
        </div>
          <div className="mt-5">
            <p className=" text-text_color_2 font-medium">Phone</p>
            <p className='text-blue-600'>{profile.phoneNumber}</p>
          </div>
          <div className="mt-5">
            <p className=" text-text_color_2 font-medium">Address</p>
            <p className='text-blue-600'>{profile.address}</p>
          </div></div>
      </div>
    </>
  );
}

export default ProfileDetail;
