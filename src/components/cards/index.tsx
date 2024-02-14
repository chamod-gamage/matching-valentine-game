import { useState, useEffect } from "react";
import { SimpleGrid, Box, useTheme, Text } from "@chakra-ui/react";
import ReactCardFlip from "react-card-flip";
import yam from "yam.json";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const Cards: React.FC = () => {
  const [flipped, setFlipped] = useState(new Set());
  const [data, setData] = useState([]);
  const [hot, setHot] = useState("");
  const [hotIdx, setHotIdx] = useState(null);
  const [done, setDone] = useState([]);
  const [wait, setWait] = useState(false);
  const [reasons, setReasons] = useState(false);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(localStorage.getItem("score"));
  const theme = useTheme();

  useEffect(() => {
    setFlipped(new Set());
    setDone([]);
    let poko = JSON.parse(JSON.stringify(yam.data));
    const len = poko.length > 10 ? 0 : poko.length;
    for (let i = 0; i < len; i++) {
      poko.push(poko[i]);
    }
    shuffleArray(poko);
    setData(poko);
  }, []);

  useEffect(() => {
    // console.log('useeffect');
    if (done.length >= 10) {
      let newScore = Math.floor(20000 / count);
      // console.log(newScore);
      if ((score === null || newScore > parseInt(score)) && count !== 0) {
        setScore(newScore.toString());
        setCount(0);
        localStorage.setItem("score", newScore.toString());
      }
    }
  }, [done.length]);

  // useEffect(() => {
  //   if (!reasons) {
  //     setCount(0);
  //   }
  // }, [reasons]);

  const handleFlipped = (gif, i) => {
    flipped.add(i);
    console.log(count);
    // setCount(count + 1);
    // console.log(flipped);
    // console.log(gif, i);
    setCount(count + 1);
    if (hot === "") {
      setHot(gif);
      setHotIdx(i);
    } else if (hot === gif) {
      setHot("");
      setHotIdx(null);
      let newDone = done;
      newDone.push(gif);
      setDone(newDone);
    } else {
      setHot("");
      setHotIdx(null);
      setWait(true);
      setTimeout(function () {
        flipped.delete(i);
        flipped.delete(hotIdx);
        setWait(false);
      }, 1000);
    }
    // console.log(flipped);
    // console.log(gif, i);
    console.log(done);
  };

  const Reasons = () => (
    <div className="reasons">
      <h1>20 Reasons Why:</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <img src="https://media1.tenor.com/images/49ab0e73f6ce9dc8c616f378899a083d/tenor.gif?itemid=12870822" />
      </div>
      <div>
        {yam.data.map((url, i) => (
          <SimpleGrid columns={2} spacing={0}>
            {i % 2 === 0 && (
              <Couple
                idx={i}
                reasons={[yam.love[2 * i], yam.love[2 * i + 1]]}
              />
            )}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                border: "6px solid pink",
                borderRadius: 10,
              }}
            >
              <img src={url} />
              {/* {i} */}
            </div>
            {i % 2 === 1 && (
              <Couple
                idx={i}
                reasons={[yam.love[2 * i], yam.love[2 * i + 1]]}
              />
            )}
          </SimpleGrid>
        ))}
        <button
          onClick={() => {
            setCount(0);
            setReasons(!reasons);
          }}
          className="glow-on-hover"
          type="button"
        >
          {reasons ? "Back to puzzle!" : "Reasons why I love you!"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Box textAlign="center" justifyContent="center">
        <div>{score !== null && `High Score: ${score}`}</div>
        <div>
          {done.length >= 10 && (
            <button
              onClick={() => {
                setCount(0);
                setReasons(!reasons);
              }}
              className="glow-on-hover"
              type="button"
            >
              {reasons ? "Back to puzzle!" : "Reasons why I love you!"}
            </button>
          )}
        </div>
        {reasons ? (
          <Reasons />
        ) : (
          <SimpleGrid
            // minChildWidth={150}
            columns={5}
            spacing={10}
            px={20}
            py={10}
          >
            {(data ?? []).map((gif, i) => {
              const isFlipped = flipped.has(i);
              return (
                <ReactCardFlip isFlipped={isFlipped}>
                  <Box
                    height={185}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    boxShadow="2xl"
                    bg="main.100"
                    cursor="pointer"
                    borderRadius={10}
                    onClick={() => {
                      if (!done.includes(gif) && !wait) {
                        handleFlipped(gif, i);
                      }
                    }}
                  >
                    <Text fontSize={140} margin={0}>
                      {"POKO!"[i % 5]}
                    </Text>
                  </Box>
                  <Box
                    height={185}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    boxShadow="2xl"
                    bg="main.100"
                    borderRadius={10}
                    overflow="hidden"
                    onClick={() => {
                      // handleFlipped(gif, i);
                    }}
                  >
                    <Box padding={5}>
                      <img src={gif} />
                    </Box>
                  </Box>
                </ReactCardFlip>
              );
            })}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
};

const Couple = ({ reasons, idx }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      fontSize: 30,
      border: "6px solid pink",
      borderRadius: 10,
    }}
  >
    <div>
      <h2>
        {2 * idx + 1}. {reasons[0]}
      </h2>
    </div>
    <div>
      <h2>
        {2 * (idx + 1)}. {reasons[1]}
      </h2>
    </div>
  </div>
);
