self.addEventListener("message", (event) => {
  console.log("message received!");

  const data = event.data;

  const result = biggerLoop(data.number);
  self.postMessage(result);
});

//* Alternate
// self.onmessage = (event) => {
//   const data = event.data;

//   const result = biggerLoop(data.number);
//   self.postMessage(result);
// };
//********************************************** */

function biggerLoop(num: number) {
  let result = 0;
  for (let i = 0; i <= num; i++) {
    result += i;
  }

  return result;
}

//*In the context of web workers, self refers to the worker's global scope, similar to how window is the global scope in the main JavaScript environment.
