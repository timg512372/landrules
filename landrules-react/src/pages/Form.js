import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Tabs, Input, Upload, message } from 'antd';
import Login from './Login.js'

function Form() {
    
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
                  <div style={{ fontSize: '20px', marginTop: '2vh' }}>Deed Name</div>
                      <Input onChange={(event) => setName(event.target.value)} />

                      <div style={{ fontSize: '20px', marginTop: '2vh' }}>Legal First Name</div>
                      <Input onChange={(event) => setRole(event.target.value)} />

                      <div style={{ fontSize: '20px', marginTop: '2vh' }}>Legal Last Name</div>
                      <Input onChange={(event) => setRole(event.target.value)} />

                      <div style={{ fontSize: '20px', marginTop: '2vh' }}>Property Description</div>
                      <Input onChange={(event) => setMetamaskAddress(event.target.value)} />

                      <div style={{ fontSize: '20px', marginTop: '2vh' }}>Property Address</div>
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
                      APPLY
                  </Button>
                  
              </div>
          </div>
      </div>
      )
  } </>

      
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