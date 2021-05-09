declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: number;
      HOST: string;

      SERVERS_PATHLOG: string;
      SERVERS_LOGFILE_PREFIX: string;

      MONGO_PORT: number;
      MONGO_HOST: string;
      MONGO_USER: string;
      MONGO_PASSWORD: string;
      MONGO_DATABASE: string;
      MONGO_URI: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
