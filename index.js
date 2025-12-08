// FAIZAN-F-MD — index.js (CommonJS) — Render-ready

const express = require("express");
const makeWASocket = require("@whiskeysockets/baileys").default;
const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");
const Pino = require("pino");
const qrcode = require("qrcode-terminal");

const config = require("./config"); // your config.js
const { getBuffer, getGroupAdmins } = require("./lib/functions"); // adapt if necessary
// other libs in /lib will be used by plugins themselves

// EXPRESS (Render requires 0.0.0.0)
const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("FAIZAN-F-MD BOT IS RUNNING ✔");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`HTTP Server Running on PORT ${PORT}`);
});

// SESSION support: either provide SESSION_ID (base64 of creds.json) or create creds by scanning QR locally
const SESSION_ID = process.env.SESSION_ID || "";

function loadSessionFromEnv() {
  if (!SESSION_ID || SESSION_ID.length < 20) return;
  try {
    if (!fs.existsSync("./sessions")) fs.mkdirSync("./sessions", { recursive: true });
    const decoded = Buffer.from(SESSION_ID, "base64").toString("utf8");
    fs.writeFileSync(path.join(__dirname, "sessions", "creds.json"), decoded);
    console.log("✔ SESSION_ID loaded into /sessions/creds.json");
  } catch (err) {
    console.error("Failed to load SESSION_ID:", err);
  }
}

loadSessionFromEnv();

// PLUGIN LOADER (CommonJS plugins expected: module.exports = function(sock, msg, text){...})
const plugins = [];
const PLUGIN_DIR = path.join(process.cwd(), "plugins");
if (fs.existsSync(PLUGIN_DIR)) {
  const files = fs.readdirSync(PLUGIN_DIR).filter(f => f.endsWith(".js"));
  console.log(`📦 Loading ${files.length} plugins...`);
  for (const file of files) {
    try {
      const plugin = require(path.join(PLUGIN_DIR, file));
      if (typeof plugin === "function") {
        plugins.push(plugin);
        console.log(`✔ Loaded plugin: ${file}`);
      } else {
        console.log(`⚠ Plugin ${file} did not export a function, skipping.`);
      }
    } catch (e) {
      console.error(`❌ Plugin Error (${file}):`, e);
    }
  }
} else {
  console.log("⚠ plugins folder missing: /plugins");
}

// Helper to export session id base64 when creds update
function exportSessionIfPresent() {
  try {
    const authFile = path.join(__dirname, "sessions", "creds.json");
    if (fs.existsSync(authFile)) {
      const data = fs.readFileSync(authFile);
      const base64 = Buffer.from(data).toString("base64");
      console.log("\n===============================");
      console.log("⭐ SESSION_ID (base64):");
      console.log(base64);
      console.log("===============================\n");
    }
  } catch (err) {
    console.error("SESSION EXPORT ERROR:", err);
  }
}

// MAIN
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, "sessions"));
  const { version } = await fetchLatestBaileysVersion();
  console.log("⏳ Connecting to WhatsApp...");

  const sock = makeWASocket({
    printQRInTerminal: SESSION_ID.length < 20,
    logger: Pino({ level: "silent" }),
    auth: state,
    version
  });

  // Print QR to terminal if provided by Baileys (useful when running locally)
  sock.ev.on("connection.update", (update) => {
    const { qr, connection, lastDisconnect } = update;
    if (qr) {
      qrcode.generate(qr, { small: true });
      console.log("Scan this QR in your WhatsApp to generate a session.");
    }

    if (connection === "open") {
      console.log("✅ WhatsApp Connected Successfully!");
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log("♻ Reconnecting...");
        startBot();
      } else {
        console.log("❌ Logged Out. Remove sessions/ and re-login.");
      }
    }
  });

  sock.ev.on("creds.update", async () => {
    await saveCreds();
    exportSessionIfPresent();
  });

  // messages handler — call each plugin with (sock, message, text)
  sock.ev.on("messages.upsert", async (mUp) => {
    try {
      const m = mUp.messages && mUp.messages[0];
      if (!m || !m.message || m.key.fromMe) return;

      const text =
        m.message.conversation ||
        m.message.extendedTextMessage?.text ||
        "";

      for (const plugin of plugins) {
        try {
          await plugin(sock, m, text);
        } catch (err) {
          console.log("Plugin Error:", err);
        }
      }
    } catch (err) {
      console.log("Message Handler Error:", err);
    }
  });
}

startBot().catch(err => {
  console.error("Bot failed to start:", err);
});
