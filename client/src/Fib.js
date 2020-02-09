import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    const fetchValues = async () => {
      const values = await axios.get('/api/values/current');
      console.log(values);
      setValues(values.data);
    };

    const fetchIndexes = async () => {
      const indexes = await axios.get('/api/values/all');
      console.log(indexes);
      setSeenIndexes(indexes.data);
    };

    fetchValues();
    fetchIndexes();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    await axios.post('api/values', { index });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Enter Index</label>
        <input
          type="text"
          value={index}
          onChange={event => setIndex(event.target.value)}
        />
        <button type="submit">Calculate Fib</button>
      </form>

      <h3>Indexes I have Seen:</h3>
      {seenIndexes.map((index, i) => {
        return <div key={i}>{index.number}</div>;
      })}

      <h3>Calculated Values:</h3>
      {Object.entries(values).map((value, i) => {
        return (
          <div key={i}>
            {value[0]}: {value[1]}
          </div>
        );
      })}
    </div>
  );
};
