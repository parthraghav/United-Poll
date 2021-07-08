import React, { useEffect, useRef, useState } from "react";
import logoUrl from "../logo.png";
import { TimelineLite, TweenMax } from "gsap";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { validateEmail } from "../core/utils";
import { PrimaryInput } from "./primary_input";
import { PrimaryButton } from "./primary_button";

export const PrimaryDialog = () => {
  const primaryDialogRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLDivElement>(null);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [status, setStatus] = useState(0);

  const tl = new TimelineLite({ paused: true });

  useEffect(() => {
    const primaryDialog = primaryDialogRef.current;
    const slogan = sloganRef.current;
    const logo = logoRef.current;
    const input = inputRef.current;

    if (primaryDialog) {
      primaryDialog.style.display = "block";
      tl.fromTo(
        primaryDialog,
        {
          clipPath: "inset(25% 50% 25% 50%)",
          webkitClipPath: "inset(25% 50% 25% 50%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          webkitClipPath: "inset(0% 0% 0% 0%)",
        }
      );
    }

    if (slogan) {
      const l1 = slogan.children[0] as HTMLDivElement;
      const l2 = slogan.children[1] as HTMLDivElement;
      const l3 = slogan.children[2] as HTMLDivElement;

      l1.style.display = "block";
      l2.style.display = "block";
      l3.style.display = "block";

      tl.fromTo(
        l1,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          webkitClipPath: "inset(0% 0% 100% 0%)",
          height: "0px",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          webkitClipPath: "inset(0% 0% 0% 0%)",
          height: l1.offsetHeight,
        }
      )
        .delay(2)
        .fromTo(
          l2,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            webkitClipPath: "inset(0% 0% 100% 0%)",
            height: "0px",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            webkitClipPath: "inset(0% 0% 0% 0%)",
            height: l2.offsetHeight,
          }
        )
        .delay(2)
        .fromTo(
          l3,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            webkitClipPath: "inset(0% 0% 100% 0%)",
            height: "0px",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            webkitClipPath: "inset(0% 0% 0% 0%)",
            height: l3.offsetHeight,
          }
        );
    }

    if (logo) {
      logo.style.display = "block";
      tl.fromTo(
        logo,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          webkitClipPath: "inset(0% 0% 100% 0%)",
          height: "0px",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          webkitClipPath: "inset(0% 0% 0% 0%)",
          height: "115px",
        }
      );
    }

    if (input) {
      input.style.display = "block";
      tl.fromTo(
        input,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          webkitClipPath: "inset(0% 0% 100% 0%)",
          height: "0px",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          webkitClipPath: "inset(0% 0% 0% 0%)",
          height: "61px",
        }
      );
    }

    tl.play();
  }, []);

  const hideInput = () => {
    const input = inputRef.current;
    console.log(input);
    if (input) {
      input.style.display = "block";
      TweenMax.fromTo(
        input,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          webkitClipPath: "inset(0% 0% 0% 0%)",
          height: "61px",
        },

        {
          clipPath: "inset(0% 0% 100% 0%)",
          webkitClipPath: "inset(0% 0% 100% 0%)",
          height: "0px",
        }
      );
    }
  };

  const showSubmitButton = () => {
    const submitButton = submitButtonRef.current;
    if (!submitButton) return;
    submitButton.style.display = "block";
    TweenMax.fromTo(
      submitButton,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        webkitClipPath: "inset(0% 0% 100% 0%)",
        height: "0px",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        webkitClipPath: "inset(0% 0% 0% 0%)",
        height: "61px",
      }
    );
  };

  const hideSubmitButton = () => {
    const submitButton = submitButtonRef.current;
    if (!submitButton) return;
    TweenMax.fromTo(
      submitButton,
      {
        clipPath: "inset(0% 0% 0% 0%)",
        webkitClipPath: "inset(0% 0% 0% 0%)",
        height: "61px",
      },
      {
        clipPath: "inset(0% 0% 100% 0%)",
        webkitClipPath: "inset(0% 0% 100% 0%)",
        height: "0px",
      }
    );
  };

  const handleEmailInput = (evt: any) => {
    const _isValidEmail = validateEmail(evt.target.value);
    setCurrentEmail(evt.target.value);
    if (_isValidEmail == isValidEmail) return;
    if (_isValidEmail) {
      showSubmitButton();
    } else {
      hideSubmitButton();
    }
    setIsValidEmail(_isValidEmail);
  };

  const submitEmail = async (evt: any) => {
    evt.preventDefault();
    if (status > 0) return;
    setStatus(1);
    // const isSuccess = await addToWaitlist(currentEmail);
    const isSuccess = true;
    if (isSuccess) {
      hideInput();
      setStatus(3);
    } else setStatus(2);
  };

  let submitButtonLabel;
  switch (status) {
    case 0:
      submitButtonLabel = "Request Invite";
      break;
    case 1:
      submitButtonLabel = "Please wait...";
      break;
    case 2:
      submitButtonLabel = "You're already in queue";
      break;
    case 3:
      submitButtonLabel = "You're now on the waitlist";
      break;
  }

  return (
    <div className="primary-dialog-container">
      <div
        ref={primaryDialogRef}
        className="primary-dialog"
        style={{ display: "none" }}
      >
        <div ref={logoRef} style={{ display: "none" }}>
          <img src={logoUrl} />
        </div>
        <div ref={sloganRef} className="slogan-container">
          <span style={{ display: "none" }}>All Politicians.</span>
          <span style={{ display: "none" }}>On Your Fingertips.</span>
          <span style={{ display: "none" }}>{/* In <Countdown />. */}</span>
        </div>
        <div ref={inputRef} style={{ display: "none" }}>
          <PrimaryInput
            placeholder="Type your email here."
            onInput={handleEmailInput}
          />
        </div>

        <div ref={submitButtonRef} style={{ display: "none" }}>
          <PrimaryButton
            label={submitButtonLabel}
            icon={faArrowRight}
            onClick={submitEmail}
          />
        </div>
      </div>
    </div>
  );
};
