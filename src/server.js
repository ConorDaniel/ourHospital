import { createServer } from "./server-instance.js";

async function init() {
  const server = await createServer();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

init();
