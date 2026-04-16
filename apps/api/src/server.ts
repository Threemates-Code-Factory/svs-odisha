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
const port = Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort < 65536
  ? parsedPort
  : 4000;

if (rawPort && port === 4000 && rawPort !== "4000") {
  console.warn(`Invalid PORT '${rawPort}', falling back to 4000`);
}

app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
