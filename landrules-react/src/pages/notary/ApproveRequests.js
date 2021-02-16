import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DeedCard from '../../components/DeedCard';
import { navigate } from '@reach/router';

function ApproveRequests() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [approved, setApproved] = useState([]);
  // const [approvedID, setApprovedID] = useState(0);
  useEffect(() => {
    const getData = async () => {
      console.log('getting data');
      let { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/deed/`);
      console.log('got data');
      setData(data.deeds);
      setLoading(false);
    };
    getData();
  });

  const setStatus = async (status, deedId) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/deed/setStatus`, {
      status,
      deedId,
    });
  };

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
          <h1>Submission Status</h1>
          {loading ? (
            <div> Loading </div>
          ) : (
            data.map((deed, index) => (
              <DeedCard
                admin
                deed={deed}
                onClick={() => navigate(`/deed/${index}`)}
                onConfirm={() => setStatus('C', deed.deedId)}
                onDeny={() => setStatus('R', deed.deedId)}
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
  //     {
  //         title: 'Action',
  //         key: 'action',
  //         render: (text, record) => (
  //             <Space size="middle">
  //                 <a
  //                     onClick={(event) =>
  //                         approveFunc(
  //                             record.FormID,
  //                             record.PublicAddress,
  //                             record.Coordinates,
  //                             record.Date,
  //                             record._id
  //                         )
  //                     }
  //                     style={{ color: 'green' }}
  //                 >
  //                     APPROVE
  //                 </a>
  //                 <a
  //                     onClick={(event) =>
  //                         denyFunc(
  //                             record.FormID,
  //                             record.PublicAddress,
  //                             record.Coordinates,
  //                             record.Date,
  //                             record._id
  //                         )
  //                     }
  //                     style={{ color: 'red' }}
  //                 >
  //                     DENY
  //                 </a>
  //                 {/* <a onClick={} style={{color: 'orange'}}>Message</a> */}
  //             </Space>
  //         ),
  //     },
  // ];
}

export default ApproveRequests;
