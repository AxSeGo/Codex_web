import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircleBackground from '../components/CircleBackground/CircleBackground';
import Hero from '../components/Main/Hero';
import UpcomingEvents from '../components/Main/UpcomingEvents';
import WhoWeAre from '../components/Main/WhoWeAre';
import Newsletter from '../components/Main/Newsletter';
import LatestReleases from '../components/Main/LatestReleases';

const Main = () => {
  const [events, setEvents] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/events?populate=flyer')
      .then(response => {
        setEvents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    axios.get('http://localhost:1337/api/labels?populate=Image') // Fetch labels with images
      .then(response => {
        setLabels(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching labels:', error);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative bg-black text-white">
      <CircleBackground />
      <Hero />
      <UpcomingEvents events={events} />
      <WhoWeAre />
      <LatestReleases labels={labels} />
      <Newsletter />
    </div>
  );
};

export default Main;