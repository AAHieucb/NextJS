"use client"

import { testServerAction } from "./serveraction";

const Test = () => {
  return (
    <>
      <button onClick={() => testServerAction()}>Test Server Action</button>
      <button onClick={() => testServerAction()}>Test Server Action</button>
    </>
  )
}

export default Test;