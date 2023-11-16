import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import fs from "fs";

export default defineConfig({
  server: {
    // https: {
    //   key: fs.readFileSync("cert/localhost-key.pem"),
    //   cert: fs.readFileSync("cert/localhost.pem"),
    // },
    port: 3000,
  },
  plugins: [react()],
});
