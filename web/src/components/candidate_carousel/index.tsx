import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

export const CandidateCarousel = ({ data }: any) => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/u/15983");
  };
  return (
    <div className="candidate-carousel-container">
      <div className="candidate-carousel">
        {data.map((candidate: any, index: number) => (
          <div
            key={index}
            className="carousel-el-container"
            onClick={handleClick}
          >
            <img src={candidate.imageLink} className="carousel-el-img" />
            <div className="carousel-el-info-container">
              <span className="candidate-name">{candidate.name}</span>
              <span className="candidate-party">{candidate.party}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
