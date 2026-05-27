import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_FILE = path.join(process.cwd(), "data.json");

// Define a basic initial template and we can use this to seed the JSON file
const seedData = {
  profiles: [],
  categories: [],
  locations: [],
  contacts: [],
  articles: []
};

async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // If no file exists, we seed it with empty data but ideally read it from mockData.ts if we could, 
      // but since we don't have direct access here, we just use defaults. We'll populate from frontend on first load if it's empty.
      return seedData;
    }
    throw error;
  }
}

async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

app.get("/api/data", async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read data" });
  }
});

app.post("/api/data", async (req, res) => {
  try {
    // For simplicity, we just expect the whole state to be sent and we replace it
    // In a real app we'd want more granular endpoints
    const newData = req.body;
    await writeData(newData);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to write data" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
