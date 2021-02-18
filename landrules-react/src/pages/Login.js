import React, { useState, useEffect } from 'react';
import { Button, Link, Input } from 'antd';
import Web3 from 'web3';
import axios from 'axios';
import Register from './Register.js'
import LoginBack from '../components/LoginBack.js'
import ApproveRequests from './notary/ApproveRequests.js'
import Form from './Form.js'

const TypingDNA = window.TypingDNA

let web3 = undefined; // Will hold the web3 instance
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Login(props) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [goToReg, setGoToReg] = useState(false);
    const [typingPatt, setTypingPattern] = useState('')
    const [authState, setAuthState] = useState(false);
	const [isNotary, setIsNotary] = useState(false);

	useEffect (()  => {
		setAuthState(false);
	}, [])

    function handleIsNotary(isNotary, role) {
		console.log("checking if it is regulator")
		if (role == "Official") {
			setIsNotary({role})
			console.log(authState)
		} 
	}

	function handleLoggedIn(auth) {
		console.log("handleLoggedIn")
		setAuthState({auth});
	};

    function handleAuthenticate(publicAddress, signature) {
        console.log("Handling auth")
        if (goToReg) {
            console.log("going to registration")
        } else {
            fetch(process.env.REACT_APP_SERVER_URL + `/api/auth`, {
                //change
                body: JSON.stringify({ publicAddress, signature }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            }).then((response) => response.json());
        }
    }

    async function handleLogin() {

        console.log('handling login');
        // Check if MetaMask is installed
        if (!window.ethereum) {
            // what is window
            console.log('checking for metamask');
            window.alert('Please install MetaMask first.');
            return;
        }

        if (!web3) {
            try {
                // Request account access if needed
                await window.ethereum.enable();

                // We don't know window.web3 version, so we use our own instance of Web3
                // with the injected provider given by MetaMask
                web3 = new Web3(window.ethereum);
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
        console.log(publicAddress);
        setLoading(true);
        console.log(process.env.REACT_APP_SERVER_URL)

        // Look if user with current publicAddress is already present on backend
        const {data} = await axios.get(process.env.REACT_APP_SERVER_URL +`/api/auth/users?publicAddress=${publicAddress}`, {
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(data.user)
        if (!data.user[0]) {
            setGoToReg(true)
        } else {
            const verifyTyping = await axios({
                method: 'post',
                url: process.env.REACT_APP_SERVER_URL + `/api/auth/users/typing`,
                data: {
                    tp: typingPatt,
                    publicAddress: publicAddress
                }
            })
            console.log("front end typing: " +JSON.stringify(verifyTyping.data))
            const typingResult = verifyTyping.data
            if (typingResult.result == 1) {
                window.alert('Typing pattern matched.')
                const message = await handleSignMessage(data.user[0].publicAddress, data.user[0].nonce)
                if (message != null) {
                    await handleAuthenticate(message.publicAddress, message.signature)
                    try {
                        //console.log(onLoggedIn)
                        await handleLoggedIn(authState)
                        //console.log(data.user[0])
                        await handleIsNotary(isNotary, data.user[0].role)
                        
                    } catch (err) {
                        await setLoading(false)
                        console.log(err)
                    }
                } 
                
            } else {
                window.alert('Typing pattern did not match.')
            }

            
            
        }
    }

    async function initialValidation() {
        return name.length > 0 && address.length > 0 && password.length > 0;
    }

    async function handleSignMessage(
		publicAddress,
		nonce,
	) {
        console.log(goToReg)
        console.log(publicAddress)
        console.log(nonce)
        if (goToReg || !publicAddress || !nonce) {
            console.log("going to registration")
        } else {
            try {
                console.log(publicAddress)
                console.log(nonce)
                const signature = await web3.eth.personal.sign(
                    `I am signing my one-time nonce: ${nonce}`,
                    publicAddress,
                    '' // MetaMask will ignore the password argument here
                );
                console.log(publicAddress)
        console.log(signature)
                return { publicAddress, signature };
            } catch (err) {
                console.log(err)
            }
        }
	};

    
    function handleSignUp(publicAddress) {
        console.log(publicAddress)
		return fetch(process.env.REACT_APP_SERVER_URL +`/api/auth/users`, {
			body: JSON.stringify({ publicAddress }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json());
	};

    function typingPattern() {
        console.log(TypingDNA)
        var tdna = new TypingDNA();
        var typingPattern = tdna.getTypingPattern({type:0});
        console.log(typingPattern)
        setTypingPattern(typingPattern)

    }
    

    //change the UI
    return ( <>
    {
        goToReg === true ? (
            <Register />
        ) : ( 

            authState ? (
					
                isNotary ? (
                    <ApproveRequests />
                ) : (
                    <Form />
                )
            
            
        ) : (

            <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        
            }}
        >
            <div
                    style = {{
                       
                       

                        position: 'absolute',
                        zIndex:'0'
                        
                        
                    }}>
                    
                        <LoginBack />
                        
                        
                    </div>

            
                <div
                    className="LogIn"
                    style={{
                        display: 'flex',
                        zIndex: '1',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: '15vh'
                    }}
                >

            
                    <h1
                        style={{
                            fontWeight:'700'
                        }}
                    >
                        Sign in with Metamask
                    </h1>
                    
                        <div>
                            <div style={{ fontSize: "15px", fontWeight:'500' }}>
                            Type: I am logging in with Metamask
                            </div>
                            <Input onChange={(event) => typingPattern()} /> 
                        </div>
                    
                    <Button
                    className="button button--secondary"
                        variant="primary"
                        type="submit"
                        onClick={handleLogin}
                        style={{
                           marginTop: '3vh'
                            
                            
                        }}
                    >
                        Continue
                    </Button>

                    
                    
                </div>
            
        </div>
        )
        )
    } </>
       
    );
}

export default Login;
