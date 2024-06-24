function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Test = () => {
  const function1InTest = async () => {
    "use server"
    console.log("OK");
    await sleep(2000); 
    return "OK";
  }

  return (
    <>
      <form>
        <h1>Test</h1>
        <button formAction={function1InTest}>Test server actions</button>
      </form>
    </>
  )
}

export default Test;