import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeedCard from '../components/DeedCard';
import { navigate } from '@reach/router';

function UserStatus() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //end
  const publicAddress = '0xB1766787e2241578C9df8793b7874d3F3d32acd1'; // Dummy value for now
  useEffect(() => {
    const getData = async () => {
      let { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/deed/getDeedByOwner?address=${publicAddress}`
      );
      setData(data.deeds);
      setLoading(false);
    };
    getData();
  });

  return (
    <>
      <div style={{ padding: '5vw', backgroundColor: '#FFFFFF' }}>
        <div
          style={{
            width: '90vw',
            height: '100vh',
            backgroundColor: 'rgba(73, 194, 104, 0.42)',
            borderTopLeftRadius: '2vw',
            borderTopRightRadius: '2vw',
            padding: '3vh 5vw 3vh 5vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1>Your Deeds</h1>
          {loading ? (
            <div> Loading </div>
          ) : (
            data.map((deed, index) => (
              <DeedCard
                deed={deed}
                onClick={() => console.log('Navigate them to the deed page')}
                onClick={() => navigate(`/deed/${index}`)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );

  // const columns = [
  //     {
  //         title: 'FormID',
  //         dataIndex: 'FormID',
  //         key: 'FormID',
  //         // render: (text) => <a>{text}</a>,
  //     },
  //     {
  //         title: 'Public Address',
  //         dataIndex: 'PublicAddress',
  //         key: 'PublicAddress',
  //         // render: (text) => <a>{text}</a>,
  //     },
  //     {
  //         title: 'Coordinates',
  //         dataIndex: 'Coordinates',
  //         key: 'Coordinates',
  //         // render: (text) => <a>{text}</a>,
  //     },
  //     {
  //         title: 'Date',
  //         dataIndex: 'Date',
  //         key: 'Date',
  //     },

  //     {
  //         title: 'Tag',
  //         key: 'Tag',
  //         dataIndex: 'Tag',
  //         render: (tags) => (
  //             <>
  //                 {tags.map((tag) => {
  //                     let color = 'yellow';
  //                     if (tag === 'APPROVED') {
  //                         color = 'green';
  //                     } else if (tag === 'REJECTED') {
  //                         color = 'red';
  //                     }
  //                     return (
  //                         <Tag color={color} key={tag}>
  //                             {tag.toUpperCase()}
  //                         </Tag>
  //                     );
  //                 })}
  //             </>
  //         ),
  //     },
  // ];
}

export default UserStatus;
