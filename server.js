import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/",
  createProxyMiddleware({
    target: "https://garageburger.ee",
    changeOrigin: true,
    ws: true,
    selfHandleResponse: false,
    onProxyRes(proxyRes) {
      delete proxyRes.headers["x-frame-options"];
      delete proxyRes.headers["content-security-policy"];
    }
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Proxy running on port", PORT);
});
