import React, { useState } from 'react';
import { Button, Tabs, Input, Upload, message } from 'antd';
import Login from './Login.js'
//import Web3 from 'web3';
//import axios from 'axios';

//import { Auth } from '../types';

let web3 = undefined; // Will hold the web3 instance
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Register() {
    
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [metamaskAddress, setMetamaskAddress] = useState('');
    const [toLogin, setToLogin] = useState(false);
    const [role, setRole] = useState('')

    function handleSubmit() {
        setToLogin(true)
        console.log('hi')
        fetch(`http://localhost:4000/api/auth/users`, {
                body: JSON.stringify(
                    { 
                        "companyName": name,
                        "publicAddress": metamaskAddress,
                        "address": address,
                        "role": role
                    }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            }).then((response) => response.json());
        
    }
    //maybe also add helpful links to get people to make metamask acct
    
    return ( <> {
        toLogin === true? (
            <Login />
        ) : (
            <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#E9FFFA',

                position: 'absolute',
            }}
        >
            <Center />

            <div
                style={{
                    fontSize: 30,
                    
                    position: 'absolute',
                    zIndex: '0',
                    margin: 'auto',
                    top: '50%',
                    left: '50%',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div
                    className="LogIn"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: 'column',
                    }}
                >
                    <div style={{ fontSize: '20px', marginTop: '2vh' }}>Company Name</div>
                        <Input onChange={(event) => setName(event.target.value)} />

                        <div style={{ fontSize: '20px', marginTop: '2vh' }}>Supplychain Role</div>
                        <Input onChange={(event) => setRole(event.target.value)} />

                        <div style={{ fontSize: '20px', marginTop: '2vh' }}>Metamask Address</div>
                        <Input onChange={(event) => setMetamaskAddress(event.target.value)} />

                        <div style={{ fontSize: '20px', marginTop: '2vh' }}>Location</div>
                        <Input onChange={(event) => setAddress(event.target.value)} />
                    <Button
                        variant="primary"
                        type="submit"
                        onClick= {handleSubmit}
                        style={{
                            color: 'white',
                            backgroundColor: '#FB8027',
                            width: '200px',
                            height: '45px',
                            fontSize: '25px',
                            marginTop: '20px',
                        
                        }}
                    >
                        REGISTER
                    </Button>
                    
                </div>
            </div>
        </div>
        )
    } </>

        
    );
  
}

export default Register;