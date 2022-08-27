import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import GuessMeme from "./components/GuessMeme";
import Loader from "./components/Loader";

function App() {
  const [memes, setMemes] = useState(null);
  const [memeToShow, setMemeToShow] = useState(Math.floor(Math.random() * 100));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getMemes() {
      const res = await axios.get("https://api.imgflip.com/get_memes");
      setMemes(res.data.data.memes);
      setIsLoading(false);
    }
    getMemes();
  }, []);
  const reloadMeme = () => {
    setMemeToShow(Math.floor(Math.random() * 100));
  };
  let memeNames = [];
  if (memes) {
    memeNames = memes.map((meme) => {
      return meme.name;
    });
  }
  return (
    <>
      {isLoading && <Loader />}
      <div
        className="App w-full h-screen"
        style={{ background: "rgb(18, 19, 19)" }}
      >
        <div className="w-11/12 sm:w-3/4 h-screen m-auto">
          {memes && (
            <GuessMeme
              reloadMeme={reloadMeme}
              meme={memes[memeToShow]}
              memeNames={memeNames}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
