import { createRoot } from "react-dom/client";
import "@/styles/reset.scss";
import "antd/dist/antd.css";
import App from "@/App";

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
