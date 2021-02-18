import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from '@reach/router';
import WhiteBackground from '../components/WhiteBackground.js';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';

function Deed(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const args = ['a'];
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      let { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/deed/getDeedById?deedId=${params.id}`
      );
      setData(data.deed);
      setLoading(false);
    };

    getData();
  }, [...args]);

  console.log(data);

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
      {loading ? (
        <h1> Loading</h1>
      ) : (
        <div>
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
            <h1>{data.name}</h1>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <div
                style={{
                  display: 'flex',
                  width: '30vw',
                  flexDirection: 'column',
                  marginRight: '5vw',
                }}
              >
                <div>
                  <h2>Deed ID: {params.id} </h2>
                </div>

                <div>
                  <h2>Property description: </h2> {data.comments}
                </div>
                <div>
                  <h2>Status: </h2>
                  {statusWord[data.status]}
                </div>
              </div>
              <div
                style={{
                  width: '40vw',
                  height: '32vw',
                }}
              >
                <MapContainer
                  center={data.coordinates[0]}
                  zoom={17}
                  scrollWheelZoom={false}
                  style={{ width: '40vw', height: '30vw' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {data.coordinates.length >= 3 ? <Polygon positions={data.coordinates} /> : null}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const statusWord = {
  P: 'Pending',
  C: 'Confirmed',
  D: 'Disputed',
  R: 'Rejected',
};

export default Deed;
