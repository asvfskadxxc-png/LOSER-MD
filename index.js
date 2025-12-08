// ===============================
//     LOSER-MD — INDEX.JS
//     (Render Ready / CommonJS)
// ===============================

const express = require("express");
const Pino = require("pino");
const fs = require("fs");
const path = require("path");

const {
    default: makeWASocket,
    fetchLatestBaileysVersion,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const config = require("./config");

// -------------------------------
//   EXPRESS SERVER (Render Keepalive)  
// -------------------------------
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
    res.send("LOSER-MD BOT IS RUNNING ✔");
});

app.listen(PORT, "0.0.0.0", () =>
    console.log(`HTTP Server Running on PORT ${PORT}`)
);

// -------------------------------
//   SESSION ID SYSTEM (ENV)
// -------------------------------

const SESSION_ID = process.env.SESSION_ID || "";

function loadSessionID() {
    if (!SESSION_ID) return;

    console.log("🔐 Loading SESSION_ID...");

    if (!fs.existsSync("./sessions"))
        fs.mkdirSync("./sessions", { recursive: true });

    const json = Buffer.from(SESSION_ID, "base64").toString("utf-8");

    fs.writeFileSync("./sessions/creds.json", json);

    console.log("✔ SESSION_ID Loaded into /sessions/creds.json");
}

loadSessionID();


// -------------------------------
//     AUTO PLUGIN LOADER
// -------------------------------
function loadPlugins(sock) {
    const PLUGINS_DIR = path.join(__dirname, "plugins");

    if (!fs.existsSync(PLUGINS_DIR)) {
        console.log("⚠ No plugins folder found!");
        return;
    }

    const files = fs.readdirSync(PLUGINS_DIR).filter(f => f.endsWith(".js"));

    console.log(`🔌 Loading ${files.length} plugins...\n`);

    files.forEach(file => {
        try {
            const pluginPath = path.join(PLUGINS_DIR, file);
            const plugin = require(pluginPath);

            if (typeof plugin === "function") {
                console.log(`✔ Plugin loaded: ${file}`);
            } else {
                console.log(`⚠ Skipped (not a function): ${file}`);
            }
        } catch (err) {
            console.error(`❌ Plugin error (${file}):`, err.message);
        }
    });
}


// -------------------------------
//     START BOT FUNCTION
// -------------------------------
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./sessions");

    const { version } = await fetchLatestBaileysVersion();

    console.log("📞 Connecting to WhatsApp...");

    const sock = makeWASocket({
        logger: Pino({ level: "silent" }),
        printQRInTerminal: !SESSION_ID,
        auth: state,
        version
    });

    // Save updated session
    sock.ev.on("creds.update", saveCreds);

    // Handle Connection
    sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
        if (qr) console.log("📌 Scan QR to connect.");

        if (connection === "open") {
            console.log("💚 WhatsApp Connected Successfully!");
        }

        if (connection === "close") {
            let reason = lastDisconnect?.error?.output?.statusCode;

            if (reason !== DisconnectReason.loggedOut) {
                console.log("♻ Reconnecting...");
                startBot();
            } else {
                console.log("❌ Logged out. Delete /sessions folder to login again.");
            }
        }
    });

    // Load plugins
    loadPlugins(sock);

    // Message Handler
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];

        if (!msg.message || msg.key.fromMe) return;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        try {
            const files = fs
                .readdirSync("./plugins")
                .filter(f => f.endsWith(".js"));

            for (let file of files) {
                try {
                    const plugin = require(`./plugins/${file}`);
                    if (typeof plugin === "function") {
                        await plugin(sock, msg, text);
                    }
                } catch (err) {
                    console.log(`Plugin error (${file}):`, err.message);
                }
            }
        } catch (err) {
            console.log("Message handler error:", err.message);
        }
    });
}

// Start the bot
startBot();
