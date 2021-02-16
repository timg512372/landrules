import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Tabs, Input, Upload, message} from 'antd';
import Login from './Login.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import MapPicker from '../components/MapPicker';

const { TextArea } = Input;

function Form() {
    const [date, setDate] = useState('')
    const [deedName, setDeedName] = useState('')
    const [granteeName, setGranteeName] = useState('')
    const [address, setAddress] = useState('')
    const [granteePhone, setGranteePhone] = useState('')
    const [propertyDescription, setPropertyDescription] = useState('')
    const [metamaskAddress, setMetamaskAddress] = useState('');
    const [toLogin, setToLogin] = useState(false);
    const [points, setPoints] = useState([]);

    function handleSubmit() {
        // setToLogin(true);
        let json = {
            date: date,
            deedName: deedName,
            granteeName: granteeName,
            granteePhone: granteePhone,
            address: address,
            propertyDescription: propertyDescription,

            
        }
        console.log(process.env.REACT_APP_SERVER_URL);
        fetch(`${process.env.SERVER_UR}/api/deed/newDeed`, {
        body: JSON.stringify({
            name: deedName,
            comments: propertyDescription,
            coordinates: points,
            address: address,
            json: json,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        }).then((response) => response.json());
    }

    return (
        <>
            {' '}
            {toLogin === true ? (
                <Login />
            ) : (
                <div
                    style={{
                        width: '100vw',
                        height: '105vh',
                        backgroundColor: '#E9FFFA',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '3%',
                    }}
                >
                    <div style={{ fontSize: '40px', marginBottom: '2vh' }}>Create a Deed</div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            
                            width: '100vw',
                            height: '75vh',
                        }}
                    >
                        <div
                        style={{
                            
                            zIndex: '0',
                            display: 'flex',
                            justifyContent: 'center'
                        
                        }}>

                        
                        <div
                            style={{
                                position: 'absolute',
                                zIndex: '-1',
                                top:'7%',
                                left:'7%'
                            
                            }}
                        >
                            <svg width="480" height="750" viewBox="0 0 702 709" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_bd)">
                            <rect x="4.58215" y="0.589722" width="693.418" height="766.41" rx="51" fill="white"/>
                            </g>
                            <defs>
                            <filter id="filter0_bd" x="0.582153" y="-3.41028" width="701.418" height="778.41" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
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
                                
                                zIndex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                width: '30vw',
                                height: '100%',
                                padding: '0 5vw 0 5vw',
                                
                              
                            }}
                        >
                            <div style={{ fontSize: '20px', marginTop: '2vh' }}>Date</div>
                            <Input style= {{borderRadius: '1vw'}} onChange={(event) => setDate(event.target.value)} />

                            <div style={{ fontSize: '20px', marginTop: '2vh' }}>Deed Name</div>
                            <Input style= {{borderRadius: '1vw'}}  onChange={(event) => setDeedName(event.target.value)} />

                            <div style={{ fontSize: '20px', marginTop: '2vh' }}>
                                Grantee Full name
                            </div>
                            <Input style= {{borderRadius: '1vw'}}  onChange={(event) => setGranteeName(event.target.value)} multiple />

                            <div style={{ fontSize: '20px', marginTop: '2vh' }}>
                                Grantee Phone Number
                            </div>
                            <Input style= {{borderRadius: '1vw'}}  onChange={(event) => setGranteePhone(event.target.value)} />
                            
                            <div style={{ fontSize: '20px', marginTop: '2vh' }}>
                                Address
                            </div>
                            <Input style= {{borderRadius: '1vw'}} onChange={(event) => setAddress(event.target.value)} />

                            <div style={{ fontSize: '20px', marginTop: '2vh' }}>
                                Property Description
                            </div>
                            <TextArea style= {{borderRadius: '1vw'}}  onChange={(event) => setPropertyDescription(event.target.value)} />

                            
                        </div>
                        </div>
                        <div
                            style={{
                                width: '45vw',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '',
                                marginTop:'3vh',
                                marginRight:'-10%'
                            }}
                        >
                            <div style={{ fontSize: '20px', marginBottom: '1vh' }}>
                                Plot the points of your deed below!
                            </div>
                            <div
                                style={{
                                    width: '40vw',
                                    height: '32vw',
                                }}
                            >
                                <MapContainer
                                    center={[51.505, -0.09]}
                                    zoom={17}
                                    scrollWheelZoom={false}
                                    style={{ width: '40vw', height: '30vw' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <MapPicker points={points} setCoords={setPoints} />
                                </MapContainer>
                            </div>
                            <div
                                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
                            >
                                {points.map((point) => {
                                    return (
                                        <div style={{ border: ' 2px solid black', margin: '1vw' }}>
                                            Latitude: {point.lat} <br />
                                            Longitude: {point.lng} <br />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                        style={{
                            color: 'white',
                            backgroundColor: '#FB8027',
                            width: '200px',
                            height: '45px',
                            fontSize: '25px',
                          
                        }}
                    >
                        APPLY
                    </Button>
                </div>
            )}
        </>
    );
}

export default Form;

/**deed name
 * legal name 
 * user comments about the deed
 * coordinates in json format (look into mapping library)
 * [
        [
            1,
            2
        ],
        [
            1,
            3
        ],
        [
            2,
            2
        ],
        [
            2,
            3
        ]
  JSON.stringify(your json)
 */
