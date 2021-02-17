import React, { useState, useEffect } from 'react';
import { Button, Link, Input } from 'antd';
import Web3 from 'web3';
import axios from 'axios';
import Register from './Register.js'
import '../typingdna.js'
//import { Auth } from '../types';

const TypingDNA = window.TypingDNA

let web3 = undefined; // Will hold the web3 instance
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Login(props) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [goToReg, setGoToReg] = useState(false);

    function handleAuthenticate(publicAddress, signature) {
        console.log("Handling auth")
        if (goToReg) {
            console.log("going to registration")
        } else {
            fetch(`http://localhost:4000/api/auth`, {
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
        console.log(props)
        const { onLoggedIn, auth, onIsNotary, isNotary} = props;
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

        // Look if user with current publicAddress is already present on backend
        const {data} = await axios.get(`http://localhost:4000/api/auth/users?publicAddress=${publicAddress}`, {
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(data)
        if (!data[0]) {
            setGoToReg(true)
        } else {
            const message = await handleSignMessage(data[0].publicAddress, data[0].nonce)
            await handleAuthenticate(message.publicAddress, message.signature)
            try {
                console.log(onLoggedIn)
                await onLoggedIn(auth)
                console.log(data[0])
                await onIsNotary(isNotary, data[0].role)
                
            } catch (err) {
                await setLoading(false)
                console.log(err)
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
		return fetch(`http://localhost:4000/api/auth/users`, {
			body: JSON.stringify({ publicAddress }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json());
	};

    function typingPattern() {
        console.log(TypingDNA)
        //var tdna = new TypingDNA();
        //var typingPattern = tdna.getTypingPattern({type:0});
        //console.log(typingPattern)
        

    }
    

    //change the UI
    return ( <>
    {
        goToReg === true ? (
            <Register />
        ) : (
            <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#E9FFFA',

                position: 'absolute',
            }}
        >
            <div
                    style = {{
                        position: 'absolute',
                        zIndex: '0',
                        margin: 'auto',
                        top: '50%',
                        left: '50%',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)' ,
                        
                    }}>
                        <svg width="800" height="400" viewBox="0 0 901 525" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_bd)">
                        <path d="M4 140C4 117.909 21.9086 100 44 100H857C879.091 100 897 117.909 897 140V477C897 499.091 879.091 517 857 517H44C21.9086 517 4 499.091 4 477V140Z" fill="white"/>
                        </g>
                        <path d="M451 200C506.228 200 551 155.228 551 100C551 44.7715 506.228 0 451 0C395.772 0 351 44.7715 351 100C351 155.228 395.772 200 451 200Z" fill="#233447"/>
                        <path d="M505.907 46.7651L459.254 80.9891L467.928 60.8203L505.907 46.7651Z" fill="#E17726" stroke="#E17726" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M398.297 46.7651L444.535 81.3095L436.276 60.8203L398.297 46.7651ZM489.114 126.123L476.699 144.922L503.28 152.177L510.892 126.532L489.114 126.123ZM393.359 126.532L400.925 152.177L427.46 144.922L415.095 126.12L393.359 126.532Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M426.024 94.3601L418.646 105.401L444.95 106.587L444.073 78.5195L426.024 94.3601ZM478.169 94.3601L459.851 78.2061L459.251 106.591L485.554 105.404L478.169 94.3601ZM427.456 144.921L443.376 137.3L429.672 126.714L427.456 144.921ZM460.821 137.3L476.695 144.921L474.528 126.714L460.821 137.3Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M476.699 144.922L460.821 137.301L462.117 147.525L461.975 151.856L476.699 144.922ZM427.459 144.922L442.225 151.86L442.133 147.525L443.38 137.301L427.459 144.922Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M442.499 119.961L429.303 116.129L438.624 111.885L442.499 119.961ZM461.698 119.961L465.57 111.885L474.94 116.129L461.698 119.961Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M427.459 144.922L429.768 126.124L415.094 126.532L427.459 144.922ZM474.436 126.124L476.698 144.922L489.109 126.532L474.436 126.124ZM485.561 105.402L459.254 106.592L461.701 119.961L465.573 111.885L474.943 116.129L485.561 105.402ZM429.306 116.129L438.627 111.885L442.502 119.961L444.949 106.592L418.646 105.405L429.306 116.129Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M418.646 105.402L429.676 126.715L429.306 116.129L418.646 105.402ZM474.944 116.129L474.529 126.715L485.558 105.405L474.944 116.129ZM444.95 106.592L442.502 119.961L445.593 135.752L446.289 114.939L444.95 106.592ZM459.254 106.592L457.961 114.896L458.608 135.752L461.698 119.961L459.254 106.592Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M461.698 119.962L458.608 135.753L460.821 137.302L474.525 126.716L474.94 116.13L461.698 119.962ZM429.303 116.13L429.672 126.716L443.376 137.302L445.593 135.753L442.502 119.962L429.303 116.13Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M461.975 151.86L462.117 147.524L460.916 146.521H443.287L442.133 147.524L442.225 151.856L427.459 144.922L432.627 149.12L443.106 156.286H461.055L471.576 149.12L476.699 144.922L461.975 151.86Z" fill="#C0AC9D" stroke="#C0AC9D" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M460.823 137.3L458.606 135.75H445.598L443.382 137.3L442.139 147.523L443.29 146.519H460.919L462.119 147.523L460.823 137.3Z" fill="#161616" stroke="#161616" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M507.893 83.2253L511.811 64.3384L505.907 46.7651L460.824 79.848L478.176 94.3574L502.679 101.436L508.078 95.1815L505.723 93.4911L509.463 90.1173L506.6 87.9268L510.337 85.0954L507.893 83.2253ZM392.389 64.3349L396.356 83.2253L393.82 85.0989L397.603 87.9268L394.744 90.1173L398.481 93.4946L396.125 95.185L401.525 101.433L426.031 94.361L443.379 79.8515L398.296 46.7651L392.389 64.3349Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M502.677 101.434L478.175 94.362L485.556 105.406L474.527 126.716L489.112 126.533H510.89L502.677 101.434ZM426.026 94.362L401.523 101.434L393.354 126.533H415.093L429.674 126.716L418.645 105.406L426.026 94.362ZM459.253 106.593L460.823 79.8491L467.927 60.8213H436.274L443.378 79.8491L444.948 106.593L445.548 114.989L445.595 135.753H458.606L458.652 114.989L459.253 106.593Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <defs>
                        <filter id="filter0_bd" x="0" y="96" width="901" height="429" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImage" stdDeviation="2"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="effect1_backgroundBlur" result="effect2_dropShadow"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
                        </filter>
                        </defs>
                        </svg>
                    </div>

            <div
                style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    position: 'absolute',
                    zIndex: '0',
                    margin: 'auto',
                    top: '45%',
                    left: '34%',
                    
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

            
                    <h3
                        style={{
                            fontSize: '40px',
                            color: '#620E0E',
                            fontWeight: '800',
                            
                        }}
                    >
                        Sign in with Metamask
                    </h3>
                    
                        <div>
                            <div style={{ fontSize: "15px", fontWeight:'500' }}>
                            Type: I am logging in with Metamask
                            </div>
                            <Input onChange={(event) => typingPattern()} /> 
                        </div>
                    
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleLogin}
                        style={{
                            marginTop: '20px',
                            color: 'white',
                            backgroundColor: '#FB8027',
                            width: '100px',
                            height: '30px',
                            fontSize: '10px',
                            
                        }}
                    >
                        Continue
                    </Button>

                    
                    
                </div>
            </div>
        </div>
        )
    } </>
       
    );
}

export default Login;
