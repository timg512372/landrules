import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from '@reach/router';
import WhiteBackground from '../components/WhiteBackground.js'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Deed(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      console.log(`${process.env.REACT_APP_SERVER_URL}/api/deed/getDeedById?deedId=${params.id}`);
      let { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/deed/getDeedById?deedId=${params.id}`
      );
      console.log('setting data');
      setData(data.deed);
      setLoading(false);
    };

    getData();
  });

  const coordinates = [];
  for(var i = 0; i < data.coordinates.length; i+=2) {
    const coordinate = [data.coordinates[i], data.coordinates[i + 1]]
    coordinates.push(coordinate)
  }

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        height: '100vh',
        width: '100vw',
        padding: '5vw',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {loading ? <h1> Loading</h1> : 
      <div>

        <WhiteBackground />

        <div
          style={{
            position: 'absolute',
            margin: 'auto',
            zIndex: '1',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <h1>{data.name}</h1>
          <h4>{data.deedId}</h4>
          <div>
            <h2>Grantee: </h2> {data.deedID}
          </div>
          <div>
            <h2>Property coordinates: </h2> {data.coordinates}
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
                  {coordinates.map(function(coordinate, i){
                    return <Marker position={coordinate} key={i} />;
                  })}
                </MapContainer>
              </div>

          <div>
            <h2>Property description: </h2> {data.comments}
          </div>
          <div>
            <h2>Status: </h2> {data.status}
          </div>

        </div>
        
      
      </div>
      }
    </div>
  );
}

export default Deed;
