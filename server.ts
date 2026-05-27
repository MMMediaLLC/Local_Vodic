import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_FILE = path.join(process.cwd(), "data.json");
const BACKUP_FILE = path.join(process.cwd(), "data.backup.json");

// ---------- Auth ----------
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const validTokens = new Set<string>();

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "").trim();
  if (!token || !validTokens.has(token)) {
    res.status(401).json({ error: "Неовластен пристап. Најавете се во админ панелот." });
    return;
  }
  next();
}

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body || {};
  if (password === ADMIN_PASSWORD) {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    validTokens.add(token);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Погрешна лозинка." });
  }
});

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
  validTokens.delete(token);
  res.json({ success: true });
});

// ---------- Data helpers ----------
const seedData = {
  profiles: [],
  categories: [],
  locations: [],
  contacts: [],
  articles: [],
};

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error: any) {
    if (error.code === "ENOENT") return seedData;
    throw error;
  }
}

async function writeData(data: any) {
  // Прави backup пред секој запис
  try {
    const existing = await fs.readFile(DATA_FILE, "utf-8");
    await fs.writeFile(BACKUP_FILE, existing, "utf-8");
  } catch (_) {
    // Нема постоечки фајл — backup не е потребен
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ---------- GET /api/data — јавно ----------
app.get("/api/data", async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Грешка при читање на податоците." });
  }
});

// ---------- POST /api/data — bulk seed/replace (само admin) ----------
app.post("/api/data", requireAdmin, async (req, res) => {
  try {
    await writeData(req.body);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Грешка при запишување на податоците." });
  }
});

// ---------- Granular Profile endpoints (admin) ----------

// Додај нов профил
app.post("/api/profiles", requireAdmin, async (req, res) => {
  try {
    const data = await readData();
    const profile = { ...req.body, isPending: false };
    data.profiles = [profile, ...(data.profiles || [])];
    await writeData(data);
    res.json({ success: true, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Грешка при додавање на профилот." });
  }
});

// Ажурирај профил
app.put("/api/profiles/:id", requireAdmin, async (req, res) => {
  try {
    const data = await readData();
    const idx = data.profiles.findIndex((p: any) => p.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: "Профилот не е пронајден." });
      return;
    }
    data.profiles[idx] = { ...data.profiles[idx], ...req.body };
    await writeData(data);
    res.json({ success: true, profile: data.profiles[idx] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Грешка при ажурирање на профилот." });
  }
});

// Избриши профил
app.delete("/api/profiles/:id", requireAdmin, async (req, res) => {
  try {
    const data = await readData();
    const before = data.profiles.length;
    data.profiles = data.profiles.filter((p: any) => p.id !== req.params.id);
    if (data.profiles.length === before) {
      res.status(404).json({ error: "Профилот не е пронајден." });
      return;
    }
    await writeData(data);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Грешка при бришење на профилот." });
  }
});

// Одобри pending профил
app.post("/api/profiles/:id/approve", requireAdmin, async (req, res) => {
  try {
    const data = await readData();
    const idx = data.profiles.findIndex((p: any) => p.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: "Профилот не е пронајден." });
      return;
    }
    data.profiles[idx].isPending = false;
    await writeData(data);
    res.json({ success: true, profile: data.profiles[idx] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Грешка при одобрување." });
  }
});

// ---------- POST /api/submissions — јавно (pending) ----------
app.post("/api/submissions", async (req, res) => {
  try {
    const data = await readData();
    const newId = Math.random().toString(36).substring(2, 11);
    const submission = {
      id: newId,
      slug: `pending-${newId}`,
      name: req.body.name || "",
      category: req.body.category || "",
      categorySlug: "",
      location: req.body.location || "",
      shortDescription: req.body.shortDescription || "",
      fullDescription: req.body.fullDescription || "",
      phone: req.body.phone || "",
      email: req.body.email || "",
      address: req.body.address || "",
      website: req.body.website || "",
      facebook: req.body.facebook || "",
      workingHours: req.body.workingHours || "",
      isFeatured: false,
      isVerified: false,
      isPending: true,
      submittedAt: new Date().toISOString(),
    };
    data.profiles = [...(data.profiles || []), submission];
    await writeData(data);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Грешка при поднесување." });
  }
});

// ---------- Vite / Static ----------
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
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
