import React, { useState } from "react";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";
const times = require("lodash/times");

const prefix =
  "https://firebasestorage.googleapis.com/v0/b/united-poll.appspot.com/o/waitlist%2Fstatic%2F";

const urls: String[] = [
  "0fbfd789dce0b44400965155a0f7a817.png",
  "1cf6255c47a99c90d669dbfa382d3ba1.png",
  "2fb849b835d682f94fb719b70f981f3b.png",
  "3d2fa95716820f2a6eee2e22165a82c6.png",
  "9d40969b55a9595218bc73a11a239dba.png",
  "16fe6001a3421bd05667cd9e2169d2f8.png",
  "28be2e41b5a9d02cb94ac48ec9f4d680.png",
  "438b1f4b3f4589ed2f004612276d77d3.png",
  "439abff2914d908bad8a3c2886c1aa01.png",
  "544ced162f1049cc32fc8372de73dd25.png",
  "619f576b767ee35dc3ae0d8427ed68b4.png",
  "1870bd1bedf0f8a9c30b202522732f36.png",
  "6627aafac902cb897d93c7324171ebb3.png",
  "8547e91eb88b70d12031235efc88536d.png",
  "278446ee5a35ac54f0fc7625a18ad957.png",
  "529886f7f6793552744b3065325e8ec8.png",
  "997840dc4add104d2a7c322f561c1eb7.png",
  "1710297e16ed937fae22a96d33987972.png",
  "5154749adf85a38955ba87aef043755f.png",
  "490488127df1ff334b493ac8017e6dde.png",
  "a0fcf1fee8a3b0b33cc700c9e61cdda0.png",
  "aa27cc27522163570080817c4c1a5801.png",
  "bd6efd7bcfc5529badc02fae81daf300.png",
  "bdeb954367e896e8688badf0028cdcf1.png",
  "c71f2ede45b099329375f2ed5b3cb2a7.png",
  "c648aaa15e9f70dfc614eafce07adfb1.png",
  "cb8df76470c8b42e62544913895c6c0f.png",
  "cfd51096343ee2db37b26b2ac33f6d2d.png",
  "d04a1effa373d33045687cf53c187037.png",
  "d8553620bb9537b7db548f8de9bdd2c2.png",
  "f3d06207b1901860184dcc711882c5e8.png",
  "f146d57d5e5decb1efba0842e86a217c.png",
  "fd376654288d509a45350ce032061d5c.png",
  "551bca738fc7c02d18b163902fab8949.png",
  "fa97ceac94cd7ca7baff9ff5755a0cbf.png",
  "1961136c9a41b31dbd8be4627a4b0fde.png",
];

export const BackgroundAnimation = () => {
  const [interpolationVar, setInterpolationVar] = useState(0);

  const subSpeedVec = times(4, () => randomIntFromInterval(10, 30));
  const supSpeedVec = times(4, () => randomIntFromInterval(500, 600));

  const handleMouseMove = (evt: any) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const x = evt.clientX;
    const y = evt.clientY;

    const dx = Math.abs(w / 2 - x);
    const dy = Math.abs(h / 2 - y);

    const dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    const R = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2));

    setInterpolationVar(dr / R);

    console.log(dr / R, evt.clientX, evt.clientY);
  };

  return (
    <div>
      <div className="background-animation-container">
        {times(4, Number).map((i: any) => (
          <div>
            <Marquee
              velocity={
                subSpeedVec[i] +
                interpolationVar * (supSpeedVec[i] - subSpeedVec[i])
              }
              resetAfterTries={200}
              scatterRandomly={false}
              direction={"ltr"}
              onInit={() => {}}
              onFinish={() => {}}
            >
              {times(9, Number).map((j: any) => {
                return (
                  <div
                    className="photo-container"
                    style={{
                      backgroundImage:
                        "url(" + prefix + urls[9 * i + j] + "?alt=media)",
                    }}
                  ></div>
                );
              })}
            </Marquee>
          </div>
        ))}
      </div>
      <div className="background-animation-overlay"></div>
    </div>
  );
};
