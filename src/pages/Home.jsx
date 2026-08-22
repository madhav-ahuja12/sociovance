import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';

import Team from '../components/Team';
import CTABanner from '../components/CTABanner';


const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Process />
      <Testimonials />

      <Team />
      <CTABanner />

    </>
  );
};

export default Home;
