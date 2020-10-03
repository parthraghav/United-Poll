import React from "react";
import "./styles.css";

export const CandidateCarousel = ({ data }: any) => {
  return (
    <div className="candidate-carousel">
      {data.map((candidate: any, index: number) => (
        <div key={index} className="carousel-el-container">
          <img src={candidate.imageLink} className="carousel-el-img" />
          <div className="carousel-el-info-container">
            <span className="candidate-name">{candidate.name}</span>
            <span className="candidate-party">{candidate.party}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
