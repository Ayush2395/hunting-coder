import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export default function AppState({ children }) {
  //  message alert state
  const [message, setMessage] = useState({ error: false, msg: "" });

  // blog id
  const [blogId, setBlogId] = useState("");

  function getBlogId(id) {
    setBlogId(id);
  }

  return (
    <>
      <AppContext.Provider
        value={{ message, setMessage, blogId, setBlogId, getBlogId }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
