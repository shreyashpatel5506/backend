import React from 'react';

const ProfileCard = ({ username, name}) => {
    return (
        <div className="card" style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{name}</h6>
                
            </div>
        </div>
    );
};

export default ProfileCard;
