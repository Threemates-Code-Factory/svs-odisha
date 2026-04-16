import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "dotenv";
import app from "./app";

const envPaths = [
  resolve(process.cwd(), ".env"),
  resolve(process.cwd(), "../../.env")
];

for (const envPath of envPaths) {
  if (existsSync(envPath)) {
    config({ path: envPath });
    break;
  }
}

const rawPort = process.env.PORT;
const parsedPort = rawPort ? Number.parseInt(rawPort, 10) : 4000;
const startPort = Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort < 65536
  ? parsedPort
  : 4000;
const maxRetries = Number(process.env.PORT_RETRY_COUNT || 20);

if (rawPort && startPort === 4000 && rawPort !== "4000") {
  console.warn(`Invalid PORT '${rawPort}', falling back to 4000`);
}

function startServer(port: number, retriesLeft: number): void {
  const server = app.listen(port, () => {
    console.log(`API listening on ${port}`);
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE" && retriesLeft > 0) {
      const nextPort = port + 1;
      console.warn(`Port ${port} is in use, retrying on ${nextPort}...`);
      startServer(nextPort, retriesLeft - 1);
      return;
    }

    console.error("Failed to start API server:", error);
    process.exit(1);
  });
}

startServer(startPort, maxRetries);
