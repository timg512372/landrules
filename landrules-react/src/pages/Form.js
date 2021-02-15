import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Tabs, Input, Upload, message } from 'antd';
import Login from './Login.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import MapPicker from '../components/MapPicker';

function Form() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [metamaskAddress, setMetamaskAddress] = useState('');
    const [toLogin, setToLogin] = useState(false);
    const [role, setRole] = useState('');
    const [points, setPoints] = useState([]);

    function handleSubmit() {
        // setToLogin(true);
        console.log(process.env.REACT_APP_SERVER_URL);
        axios.post(`${process.env.SERVER_UR}/api/deed/`, {});
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
                        height: '100vh',
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
                            alignItems: 'space-between',
                            width: '94vw',
                            height: '75vh',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                width: '45vw',
                                height: '100%',
                                padding: '0 5vw 0 5vw',
                            }}
                        >
                            <div style={{ fontSize: '20px', marginTop: '2vh' }}>Deed Name</div>
                            <Input onChange={(event) => setName(event.target.value)} />
                            <div style={{ fontSize: '20px', marginTop: '2vh' }}>
                                Legal First Name
                            </div>
                            <Input onChange={(event) => setRole(event.target.value)} />
                            <div style={{ fontSize: '20px', marginTop: '2vh' }}>
                                Legal Last Name
                            </div>
                            <Input onChange={(event) => setRole(event.target.value)} multiple />
                            <div style={{ fontSize: '20px', marginTop: '2vh' }}>
                                Property Description
                            </div>
                            <Input onChange={(event) => setMetamaskAddress(event.target.value)} />
                        </div>
                        <div
                            style={{
                                width: '45vw',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '',
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
                            marginTop: '20px',
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
