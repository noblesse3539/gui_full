import Fastify, { FastifyServerOptions, FastifyInstance } from "fastify";
import prismaPlugin from "./plugins/prisma";
import routes from "./routes";
import cors from "fastify-cors";
import qs from "qs";

export function createServer(opts: FastifyServerOptions): FastifyInstance {
  const server = Fastify(opts);
  server.register(cors, {
    origin: "*",
  });
  server.register(prismaPlugin);
  server.register(routes);

  return server;
}
export async function startServer() {
  const server = createServer({
    logger: {
      level: "info",
    },
    querystringParser: (str) => {
      return qs.parse(str);
    },
    disableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== "true",
  });

  try {
    const port = process.env.PORT ?? 3000;
    await server.listen(port, "0.0.0.0");
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
