"use server";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function testServerAction(){
  console.log("OK");
  await sleep(2000); 
}