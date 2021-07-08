import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

function SliderTemplate(candidate: any) {
  const history = useHistory();
  const handleClick = (politicianId: string) => {
    history.push("/u/" + politicianId);
  };

  return (
    <div className="slider-container-wrapper">
      <div
        className="carousel-el-container"
        onClick={() => handleClick(candidate.id)}
        style={{
          background: "url(" + candidate.display_picture_link + ")",
        }}
      >
        <div className="carousel-el-info-container">
          <span className="candidate-name">{candidate.full_name}</span>
          <span className="candidate-party">{candidate.party_affiliation}</span>
        </div>
      </div>
    </div>
  );
}

export const CandidateCarousel = ({ data }: any) => {
  const history = useHistory();
  const handleClick = (politicianId: string) => {
    history.push("/u/" + politicianId);
  };
  return (
    <div className="candidate-carousel-container">
      <div className="candidate-carousel">
        {data.map((candidate: any, index: number) => (
          <div
            key={index}
            className="carousel-el-container"
            onClick={() => handleClick(candidate.id)}
            style={{
              background: "url(" + candidate.display_picture_link + ")",
            }}
          >
            <div className="carousel-el-info-container">
              <span className="candidate-name">{candidate.full_name}</span>
              <span className="candidate-party">
                {candidate.party_affiliation}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
