import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LabelDetail = () => {
  const { id } = useParams();
  const [label, setLabel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:1337/api/labels/${id}?populate=Image`)
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

  const baseURL = 'http://localhost:1337';
  const imageUrl = label.attributes.Image && label.attributes.Image.data && label.attributes.Image.data[0]
    ? `${baseURL}${label.attributes.Image.data[0].attributes.url}`
    : 'https://via.placeholder.com/150';

  return (
    <div className="container mx-auto p-4 pt-20 z-10">
      <h1 className="text-3xl font-bold">{label.attributes.Title}</h1>
      <img src={imageUrl} alt={label.attributes.Title} className="w-full mt-4"/>
      <p className="mt-4">{label.attributes.Description}</p>
    </div>
  );
};

export default LabelDetail;