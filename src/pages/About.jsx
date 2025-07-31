import React from 'react';
import './About.css';
import aboutIllustration from '/images/BgImage.jpg'; // put your image here

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-content">
        <h1>About TestNexus</h1>
        <p className="tagline">Test with confidence. Automate with intelligence.</p>
        <p>
          TestNexus is a unified platform for managing automated test suites,
          user roles, machine allocations, and execution insights. Built to
          integrate seamlessly with CI/CD pipelines and enhanced with intelligent
          reporting, it gives teams the visibility and control needed to ship
          high-quality software faster.
        </p>
        <ul className="features">
          <li>Role-based user & admin management</li>
          <li>Suite & function-area driven test control</li>
          <li>Live execution tracking (in-queue, in-progress, pass, fail)</li>
          <li>Machine allocation & environment awareness</li>
          <li>Integration-ready for CI/CD and automation workflows</li>
        </ul>
        <button className="learn-more">Learn More</button>
      </div>
      <div className="about-image">
        <img src={aboutIllustration} alt="About TestNexus" />
      </div>
    </div>
  );
};

export default About;
