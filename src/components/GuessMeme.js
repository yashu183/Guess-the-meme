import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  styled,
  Tooltip,
} from "@mui/material";
import Confetti from "react-dom-confetti";

import success from "../images/success.gif";
import failure from "../images/failure.gif";

const MyButton = styled(Button)({
  marginTop: "1rem",
  marginRight: "1rem",
  ":disabled": {
    background: "#3c3c3c",
    opacity: 0.6,
    color: "#767776",
  },
});

const StyledTextField = styled(TextField)`
  color: #1976d1;
  & .MuiInputBase-root.MuiOutlinedInput-root.Mui-disabled {
    background: #3c3c3c;
    opacity: 0.6;
  }
  & .MuiFormLabel-root.Mui-disabled {
    color: #767776;
    opacity: 0.6;
  }
  & .MuiButtonBase-root.Mui-disabled svg {
    color: #767776;
    opcaity: 0.6;
  }
  & .MuiFormLabel-root {
    color: #1976d1;
  }
  & .MuiInputBase-input {
    color: white;
  }

  & label.Mui-focused {
    color: #1976d1;
  }
  & .MuiInput-underline:after {
    border-bottom-color: #1976d1;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #1976d1;
    }
    &:hover fieldset {
      border-color: #1976d1;
    }
    &.Mui-focused fieldset {
      border-color: #1976d1;
    }
    & .MuiSvgIcon-root {
      color: #1976d1;
    }
  }
`;

const MAX_COUNT = 5;
const GuessMeme = ({ meme, memeNames, reloadMeme }) => {
  const config = {
    angle: "180",
    spread: 300,
    startVelocity: "30",
    elementCount: 70,
    dragFriction: 0.12,
    duration: "5000",
    stagger: "2",
    width: "10px",
    height: "10px",
    perspective: "900px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const [memeName, setMemeName] = useState(null);
  const [showConfetti, setShowConfetti] = useState(null);
  const [count, setCount] = useState(0);
  const [showRefresh, setShowRefresh] = useState(false);
  const [showStatus, setShowStatus] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const onChange = (e, newValue) => {
    console.log(e, newValue);
    const guessedMemeName = newValue;
    setMemeName(guessedMemeName);
    console.log(guessedMemeName);
  };

  const onClick = () => {
    setCount(count + 1);
    console.log(count);
    if (count + 1 === MAX_COUNT) {
      setShowRefresh(true);
    }

    if (memeName === meme.name) {
      setShowConfetti(true);
      setShowStatus([...showStatus, true]);
      setShowRefresh(true);
      setIsCorrect(true);
      setTimeout(() => {
        setShowConfetti(null);
      }, 3000);
    } else {
      setShowStatus([...showStatus, false]);
      setIsCorrect(false);
    }
    setMemeName(null);
  };

  return (
    <div className="w-full flex flex-col h-screen p-5">
      <h3
        style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
        className="text-3xl text-white"
      >
        Guess-The-Meme
      </h3>
      {meme && (
        <img
          className="h-2/4 w-auto mx-auto py-6"
          src={meme?.url}
          alt="meme here"
        />
      )}
      {(count !== 0 || showRefresh) && (
        <div className="status mb-3">
          {(() => {
            const statuses = [];
            showStatus.forEach((status) => {
              status
                ? statuses.push(
                    <i className="fa-solid fa-square-check text-green-600 text-4xl mx-2"></i>
                  )
                : statuses.push(
                    <i className="fa-solid fa-square-xmark text-red-600 text-4xl mx-2"></i>
                  );
            });
            return statuses;
          })()}
        </div>
      )}
      {showRefresh && isCorrect && (
        <div
          style={{ fontFamily: "Gloria Hallelujah" }}
          className="w-full mx-auto text-white mb-4 text-2xl"
        >
          {(count === 1 || count === 2) && (
            <p>
              Hurray!!! 🎉 You guessed it in {count} out of {MAX_COUNT} guesses{" "}
              🥳
            </p>
          )}
          {count === 3 && (
            <p>
              Hmmm!!! 🤔💭 Not Bad, You guessed it in {count} out of {MAX_COUNT}{" "}
              guesses{" "}
            </p>
          )}
          {count === 4 && (
            <p>
              That was closeee!!!! 😮 You got it on {count} th guess out of{" "}
              {MAX_COUNT} guesses{" "}
            </p>
          )}
          {count === 5 && <p>Phew!!! 😮‍💨 You got it on the last chance</p>}
        </div>
      )}
      {showRefresh && !isCorrect && (
        <div
          style={{ fontFamily: "Gloria Hallelujah" }}
          className="w-full mx-auto text-white mb-4 text-2xl"
        >
          {count === 5 && (
            <p>It's okay 😓. You are not alone 🤗. Try again!!!!</p>
          )}
        </div>
      )}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        autoSelect={true}
        className="mx-auto"
        options={memeNames}
        sx={{ width: 300 }}
        disabled={showRefresh}
        renderInput={(params) => (
          <StyledTextField {...params} label="Meme Name" />
        )}
        value={memeName}
        onChange={onChange}
      />
      <Confetti
        className="block mx-auto w-fit"
        active={showConfetti}
        config={config}
      />
      <div>
        <MyButton
          color="primary"
          size="medium"
          variant="contained"
          onClick={onClick}
          disabled={showRefresh}
        >
          Submit
        </MyButton>
        {showRefresh && (
          <MyButton
            color="primary"
            size="medium"
            variant="outlined"
            onClick={() => {
              setCount(0);
              reloadMeme();
              setShowStatus([]);
              setShowRefresh(false);
            }}
          >
            Reload
          </MyButton>
        )}
      </div>
      <Tooltip title="You have 5 chances to guess the meme. Submit your guesses in the textfeild below :)">
        <i className="fa-solid fa-circle-info text-xl text-white opacity-80 absolute top-8 right-8 hover:cursor-pointer"></i>
      </Tooltip>
      <div className="w-full my-4 flex justify-center">
        {isCorrect && showRefresh && (
          <img width={120} height={100} src={success} alt="success" />
        )}
        {!isCorrect && showRefresh && (
          <img width={170} height={150} src={failure} alt="failure" />
        )}
      </div>
      <div className="footer w-full flex justify-center mt-auto items-center">
        <p className="text-white text-md">Follow : </p>
        <a
          href="https://twitter.com/14491Yashu"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-twitter text-2xl text-white mx-2.5 mt-auto hover:cursor-pointer opacity-80"></i>
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=100011492925176"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-facebook text-2xl text-white mx-2.5 mt-auto hover:cursor-pointer opacity-80"></i>
        </a>
        <a href="https://github.com/yashu183" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-github text-2xl text-white mx-2.5 mt-auto hover:cursor-pointer opacity-80"></i>
        </a>
      </div>
    </div>
  );
};

export default GuessMeme;
