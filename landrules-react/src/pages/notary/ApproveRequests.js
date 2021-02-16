import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import { Layout } from 'antd';
import { Table, Tag, Space } from 'antd';
import Navbar from '../../components/Navbar.js';
import { Header } from 'antd/lib/layout/layout';
import mintFromApproved from './mintApprove';

function ApproveRequests() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    // const [approved, setApproved] = useState([]);
    // const [approvedID, setApprovedID] = useState(0);
    useEffect(() => {
        //in the future will only be getting tags that are pending
        const getData = async () => {
            await axios.get('http://localhost:4000/api/request/getAllPending')
                .then(res=>setData(res.data.requests));
            // console.log(data);
            // setLoading(false);
        };
        getData();
    });
    const columns = [
        {
            title: 'FormID',
            dataIndex: 'FormID',
            key: 'FormID',
            // render: (text) => <a>{text}</a>,
        },{
            title: 'Public Address',
            dataIndex: 'PublicAddress',
            key: 'PublicAddress',
            // render: (text) => <a>{text}</a>,
        },{
            title: 'Coordinates',
            dataIndex: 'Coordinates',
            key: 'Coordinates',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
        },
        {
            title: 'Tag',
            key: 'Tag',
            dataIndex: 'Tag',
            render: (tags) => (
                <>
                    {tags.map((tag) => {
                        let color = 'yellow';
                        if (tag === 'APPROVED') {
                            color = 'green';
                        } else if (tag === 'REJECTED') {
                            color = 'red';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={(event) => approveFunc(record.FormID, record.PublicAddress, record.Coordinates, record.Date, record._id)} 
                                style={{color: 'green'}}>APPROVE</a>
                    <a onClick={(event) => denyFunc(record.FormID, record.PublicAddress, record.Coordinates, record.Date, record._id)} style={{color: 'red'}}>DENY</a>
                    {/* <a onClick={} style={{color: 'orange'}}>Message</a> */}
                </Space>
            ),
        },
    ];

    function approveFunc(id, shipment, date, order, quant, client, serverID) {
        //pass the parameters ^ to minting function
        console.log(serverID);
        appRequest(serverID).then((res) => console.log(res));
        //repost request with approved tag
        let res = await axios.get('http://localhost:4000/api/deed/setStatus')
    }

    function denyFunc(id, publicAddress, coordinates, date, serverID) {
        console.log(serverID);
        rejRequest(serverID).then((res) => console.log(res));
    }

    const appRequest = async (id) => {
        let res = await axios.patch('http://localhost:4000/api/request/approve', { 
            _id : id,
        });
        return res;
    };

    const rejRequest = async (id) => {
        let res = await axios.patch('http://localhost:4000/api/request/reject', { 
            _id : id,
        });
        return res;
    };

    //dummy data for now will get data from server in the future
    const dummy = [{
        ShipmentID: "shipID",
        Date: "date",
        Order: "orderID",
        Quantity: 0,
        Client: "user",
        Tag: ["APPROVED"],
    }];

    return (
        <>
        <div style={{ width: '100vw', height: '100vh', backgroundColor: '#E9FFFA' }}>
            <Navbar/>
            <div style={{ margin: '5vw' }}>
                <div style={{
                    width: '90vw',
                    height: '70vh',
                    backgroundColor: 'rgba(255,255,255, 1)',
                    borderLeft: '2vw',
                    borderBottomLeftRadius: '2vw',
                    borderBottomRightRadius: '2vw',
                    padding: '3vh 5vw 3vh 5vw',
                    }}> 
                    <h1>Request Status</h1>
                    <Table columns={columns} dataSource={data} size="small"/>
                </div>
            </div>
        </div>
        </>
    );  
}