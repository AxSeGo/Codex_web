import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LabelDetail = () => {
  const { id } = useParams();
  const [label, setLabel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:1337/api/labels/${id}`)
      .then(response => {
        setLabel(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching label details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!label) return <div>Label not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{label.attributes.Title}</h1>
      <img src={`http://localhost:1337${label.attributes.Image}`} alt={label.attributes.Title} className="w-full"/>
      <p className="mt-4">{label.attributes.Description}</p>
    </div>
  );
};

export default LabelDetail;