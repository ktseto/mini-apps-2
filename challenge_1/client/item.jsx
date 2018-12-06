import React from 'react';

export default ({ data }) => (
  <div style={{ border: '1px solid black' }}>
    <div>Date: {data.date}</div>
    <div>Description: {data.description}</div>
    <div>Language: {data.lang}</div>
    <div>Category 1: {data.category1}</div>
    <div>Category 2: {data.category2}</div>
    <div>Granularity: {data.granularity}</div>
  </div>
);
