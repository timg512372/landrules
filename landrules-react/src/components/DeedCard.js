import React from 'react';
import { Button } from 'antd';

const DeedCard = (props) => {
  const { admin, deed, onClick, onConfirm, onDeny } = props;

  return (
    <div
      key={deed.deedId}
      style={{
        width: '60vw',
        height: '4vw',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '1.5vw',
        borderRadius: '4vw',
        padding: '0 2vw 0 2vw',
      }}
      onClick={onClick}
    >
      <div>{deed.deedId}</div>
      <div>{deed.name}</div>
      <div>{deed.coordinates}</div>
      {admin ? (
        <div>
          <Button onClick={onConfirm} disabled={deed.status != 'P'}>
            {deed.status == 'P' ? 'Confirm' : 'Confirmed'}
          </Button>
          <Button onClick={onDeny} disabled={deed.status != 'P'}>
            Deny
          </Button>
        </div>
      ) : (
        <div> {statusWord[deed.status]} </div>
      )}
    </div>
  );
};

const statusWord = {
  P: 'Pending',
  C: 'Confirmed',
  D: 'Disputed',
  R: 'Rejected',
};

export default DeedCard;
