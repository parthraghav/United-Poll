import React, { useState } from "react";
import { ProfilePhoto } from "..";
import "./styles.css";
import YouTube from "react-youtube";

const ReviewOverlay = () => {
  return (
    <div className="video-player-review-overlay">
      <div className="video-player-review-prompt">
        <h1>Was the question answered properly?</h1>
        <div>
          <span className="primary-btn">No</span>
          <span className="primary-btn">Yes</span>
        </div>
      </div>
    </div>
  );
};

const Annotation = ({ data }: any) => {
  return (
    <div className="video-player-annotation-wrapper">
      <div className="annotation-type-label">
        <span>{data.type}</span>
      </div>
      <div className="annotation-description-label">
        <span>{data.description}</span>
      </div>
      <div className="annotation-report-label">
        <span>Reported by {data.support_count} people</span>
      </div>
    </div>
  );
};

export const VideoPlayer = ({ data }: any) => {
  const [playerTime, setPlayerTime] = useState(0);
  const [player, setPlayer] = useState<any>();
  const [ticker, setTicker] = useState<any>();
  let candidateInfo, annotations, start, end, videoId;

  if (data) {
    candidateInfo = data.politician;
    annotations = data.video.annotations;
    start = data.video.start;
    end = data.video.end;
    videoId = data.video.ytid;
  }

  const handlePlayerProgress = (time: number) => {
    console.log(time);
    setPlayerTime(time);
  };

  const initialiseTicker = (_player: any) => {
    const updateTime = () => {
      let oldTime = playerTime,
        newTime;
      if (_player && _player.getCurrentTime) {
        newTime = Math.round(_player.getCurrentTime());
        if (newTime != oldTime) handlePlayerProgress(newTime);
      }
    };
    setTicker(setInterval(updateTime, 100));
  };

  const handlePlayerReady = (evt: any) => {
    const _player = evt.target;
    setPlayer(_player);
    _player.playVideo();
    initialiseTicker(_player);
  };
  const handlePlayerStateChange = (evt: any) => {
    if (
      evt.data == YouTube.PlayerState.BUFFERING ||
      evt.data == YouTube.PlayerState.PAUSED ||
      evt.data == YouTube.PlayerState.ENDED
    ) {
      clearInterval(ticker);
    }
    if (
      evt.data == YouTube.PlayerState.PLAYING ||
      evt.data == YouTube.PlayerState.UNSTARTED
    ) {
      initialiseTicker(player);
    }
  };

  return (
    <div className="video-player-container">
      <div className="video-player">
        <div className="video-top-bar">
          <div className="video-info-bar">
            <div className="video-profile-photo-container">
              <ProfilePhoto
                src={candidateInfo.imageLink}
                width="2em"
                height="2em"
              />
            </div>
            <div className="video-profile-info">
              <div>
                <span className="video-candidate-name">
                  {candidateInfo.name}
                </span>
              </div>
              <div>
                <span className="video-candidate-party">
                  {candidateInfo.party}
                </span>
              </div>
            </div>
          </div>
          <div className="video-player-menu">
            <a href="">1</a>
            <a href="">2</a>
            <a href="">3</a>
          </div>
        </div>
        <div className="video-player-embed-area">
          <div className="video-player-embed">
            <YouTube
              videoId={videoId}
              onReady={handlePlayerReady}
              onStateChange={handlePlayerStateChange}
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  start: start,
                  end: end,
                  modestbranding: 1,
                },
              }}
            />
          </div>
          <div className="video-player-annotation-container">
            {annotations.map((annotation: any, index: number) => {
              return (
                playerTime == annotation.timestamp && (
                  <Annotation data={annotation} key={index} />
                )
              );
            })}
          </div>
          {playerTime == end && <ReviewOverlay />}
        </div>
      </div>
    </div>
  );
};
