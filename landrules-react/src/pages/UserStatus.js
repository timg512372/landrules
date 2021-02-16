import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar.js';
import { Button, Tabs, Input, Upload, message } from 'antd';
import { Table, Tag, Space } from 'antd';
import axios from 'axios';
import web3 from 'web3';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//eventually use user address and map things to that address

function UserStatus() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    //not sure if we want to store public address as global var or have it like this 
    async function checkPubAddress() {
        if (!window.ethereum) {
            // what is window
            console.log('checking for metamask');
            window.alert('Please install MetaMask first.');
            return;
        }
    
        if (!web3) {
            try {
                // Request account access if needed
                window.ethereum.enable();
    
                // We don't know window.web3 version, so we use our own instance of Web3
                // with the injected provider given by MetaMask
                web3 = new web3(window.ethereum);
            } catch (error) {
                window.alert('You need to allow MetaMask.');
                return;
            }
        }
        const coinbase = await web3.eth.getCoinbase();
        if (!coinbase) {
            window.alert('Please activate MetaMask first.');
            return;
        }
    
        const publicAddress = coinbase.toLowerCase();
        return publicAddress
    }
    let publicAddress = checkPubAddress();
    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:4000/api/request/getRequestsByOwner?publicAddress=${publicAddress}`)
                .then(res=>setData(res.data.requests));
            console.log(data);
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
    ];


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
           
            <div style={{ display:'flex', justifyContent:'center' }}>
                
                <div
                    style={{
                        width: '80vw',
                        height: '90vh',
                        backgroundColor: 'rgba(255, 240, 219, 1)',
                        borderTopLeftRadius: '2vw',
                        borderTopRightRadius: '2vw',
                        padding: '6vh 5vw 3vh 5vw',
                        marginTop: '10vh'
                        
                    }}  
                >
                    <h1
                    style={{
                        fontWeight:'750'
                    }}>Submission Status</h1>
                    <Table columns={columns} dataSource={data} size="middle"/>
                </div>
            </div>
            </div>
        </>
    );  
}

export default UserStatus;