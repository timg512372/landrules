import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from '@reach/router';

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
      {loading ? <h1> Loading</h1> : <h1>{data.name}</h1>}
    </div>
  );
}

export default Deed;
