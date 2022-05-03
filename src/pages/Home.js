import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Home() {
  return (
    <>
      <section className="section home_section">
        <div className="welcome_screen">
          <h1>Hunting Coder</h1>
          <p>
            Let's{" "}
            {
              <Typewriter
                loop
                cursor
                cursorStyle="$"
                typeSpeed={50}
                deleteSpeed={70}
                delaySpeed={1500}
                words={["code", "blog", "eat", "repeat"]}
              />
            }
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
