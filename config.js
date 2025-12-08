const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "ARSLAN-MD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUZTS2lrcTNvalFZeE1rTVltUVh1cmVtTStJSUo4WU9JUjZOSExTdjJscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYnA4OUkwamJMNk9LRVJYbXFFR2pqMzVYM3YwU1AwRS9sQzRJMDVBWWpCaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtTDJPZXRXTlV1S1pjMlIyOUltc0VISUFvRDRVVTRPRzAvdDNxaURFYm5rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzRFRKdXZLUzlrc05TalhEVjlmTWo1RGFrMExBOWN5WTg0ZkxjU3RoM1ZrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJKaTZOSDFXYTNCUVJuM1Y5UVN2OGNYNGlmL3FUaVFJZGR3OGtzaHdwMTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkgwMUY3dk1mSnYwN3oxWk1SRjdyNHVYTFY3cGFuSmdweXpYMi9EdkJyaVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUJHdm1pdFYzRWtBM2lsYjlMaXB2cU1RK3Qvd2RsanBOdGJIRmQ3TlNYUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1gxcTA1MXlHZUlHT09rUHFyTW5MWXR0dlpwNjF3VVVjZTVPQXlKaDVrdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5hYUc1ajJHZC9hdncxZGFQb0xZT1VUUldma0xHS0t5dEdVc0VjQnpQRjl4ZTN2M0VYd1NCU2YvZHN5UUJWdlpZd1ZoMkNZQ0NPbnBhNmExVHZOdUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODUsImFkdlNlY3JldEtleSI6IjV5Z2JPRXROdWE0c3J6aDgwYm16ZTR6bi9vQ3NnK3JOWE9Eb1VVSnFvSm89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTM3NjYxMDA4NjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTU3OEVFMzhGMzEwNjYzOEVEQTYyMEY2RTQwOUUwNjUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc2NDA5MTMxNH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiWnRTTmtUOEdTbmlYVU5UNzRYblp3USIsInBob25lSWQiOiI2Y2Y2YzExYi1mZmJkLTRkNTItYjk5Yy02MDNjNWVjNjgxZGYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUhIaHJkMVJVKzhOSGt2akY2TGZpVm9ZcmpJPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdXZ3IrNkdYOFNrMkxXQzAwQ3A5NngzczFHOD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJROVdNQzlOUSIsIm1lIjp7ImlkIjoiOTM3NjYxMDA4NjM6MThAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoibG9zZXJtZDY3IiwibGlkIjoiMjE5NDI2MzIyNDAzMzgwOjE4QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSXY2bWRzRUVLTExsOGtHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQkt2aWEzT3VBai9qNmRIVytRNEMrL25jV1lOcmNBQnBwNGUwY3loTGhEOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNStlOEFhWEJhc3V1bERJMDN5aFJQc1haMTRTOWFKc1AzeHBDanVRdExUbEdvYjZyaXg5aDRhcit4T3FORWxQdTFVUnFLWXN0T3Vud0dqT0wwekg0Q2c9PSIsImRldmljZVNpZ25hdHVyZSI6IjRKMW9laTRxbmVDUXJndmxKenRnMDlwR0ZJUVR0aDA5bzcxZERxOGlOK1lqZWt1UGJSTmZtYjdXTTBTSnN0d2dtYjBvSnIwRmc1aUFvSTNNNnlmcURnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTM3NjYxMDA4NjM6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUVNyNG10enJnSS80K25SMXZrT0F2djUzRm1EYTNBQWFhZUh0SE1vUzRRLyJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnZ0kifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzY0MDkxMzEyLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBXWCJ9",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY * 𝆺𝅥𝆊𝆬᰻᰻𝁘͢ϝʌ𝛊᷍ᴢ𝛌ɳ͓ 𝐌ᴅ 𝁒᰻᰻𝆺𝅥𝆊𝆬 🤍*",
// set the auto reply massage on status reply  
ANTI_DELETE: process.env.ANTI_DELETE || "true",
// set true false for anti delete     
ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox", 
// change it to 'same' if you want to resend deleted message in same chat     
WELCOME: process.env.WELCOME || "true",
// true if want welcome and goodbye msg in groups    
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group
ANTI_LINK: process.env.ANTI_LINK || "true",
// make anti link true,false for groups 
MENTION_REPLY: process.env.MENTION_REPLY || "false",
// make true if want auto voice reply if someone menetion you 
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "",
// add custom menu and mention reply image url
PREFIX: process.env.PREFIX || ".",
// add your prifix for bot   
BOT_NAME: process.env.BOT_NAME || "* 𝆺𝅥𝆊𝆬᰻᰻𝁘͢ϝʌ𝛊᷍ᴢ𝛌ɳ͓ 𝐌ᴅ 𝁒᰻᰻𝆺𝅥𝆊𝆬",
// add bot namw here for menu
STICKER_NAME: process.env.STICKER_NAME || "* 𝆺𝅥𝆊𝆬᰻᰻𝁘͢ϝʌ𝛊᷍ᴢ𝛌ɳ͓ 𝐌ᴅ 𝁒᰻᰻𝆺𝅥𝆊𝆬",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "true",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "923222818553",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "** 𝆺𝅥𝆊𝆬᰻᰻𝁘͢ϝʌ𝛊᷍ᴢ𝛌ɳ͓ 𝐌ᴅ 𝁒᰻᰻𝆺𝅥𝆊𝆬*",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ * 𝆺𝅥𝆊𝆬᰻᰻𝁘͢ϝʌ𝛊᷍ᴢ𝛌ɳ͓ 𝐌ᴅ 𝁒᰻᰻𝆺𝅥𝆊𝆬 Official ❣️*",
// add bot owner name    
ALIVE_IMG: process.env.ALIVE_IMG || "https://image2url.com/images/1765179852563-98dac8d0-99cd-4f42-b768-69f20b25ed3d.jpg",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "> Zinda Hun Yar ⚡",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "false",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "true",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "false",
// false or true for anti bad words  
MODE: process.env.MODE || "public",
// make bot public-private-inbox-group 
ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "false",
// make anti link true,false for groups 
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_REPLY: process.env.AUTO_REPLY || "false",
// make true or false automatic text reply 
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
// maks true for always online 
PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "false",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "false",
// true if want mark commands as read 
DEV: process.env.DEV || "923222818553",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "true",
// true for anti once view 
AUTO_RECORDING: process.env.AUTO_RECORDING || "false"
// make it true for auto recoding 
};
