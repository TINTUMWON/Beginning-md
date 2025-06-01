const config = require('../settings');
const { malvin } = require('../𝚐𝚘𝚓𝚘');
const axios = require('axios');

malvin({
  on: "body"
}, async (conn, m, { isGroup }) => {
  try {
    if (config.MENTION_REPLY !== 'true' || !isGroup) return;
    if (!m.mentionedJid || m.mentionedJid.length === 0) return;

    const voiceClips = [
      "https://files.catbox.moe/3ffme6.mp4",
      "https://files.catbox.moe/a91j85.mp4",
      "https://files.catbox.moe/js5dpv.mp4",
      "https://files.catbox.moe/7ck37q.mp4",
      "https://files.catbox.moe/wtref1.mp4",
      "https://files.catbox.moe/l3vk3d.mp4",
      "https://files.catbox.moe/orezkx.mp4",
      "https://files.catbox.moe/0xmqj6.mp4",
      "https://files.catbox.moe/hqh290.mp4",
      "https://files.catbox.moe/wigfi3.mp4"
    ];

    const randomClip = voiceClips[Math.floor(Math.random() * voiceClips.length)];
    const botNumber = conn.user.id.split(":")[0] + '@s.whatsapp.net';

    if (m.mentionedJid.includes(botNumber)) {
      const thumbnailRes = await axios.get(config.MENU_IMAGE_URL || "https://files.catbox.moe/mn47ve", {
        responseType: 'arraybuffer'
      });
      const thumbnailBuffer = Buffer.from(thumbnailRes.data, 'binary');

      await conn.sendMessage(m.chat, {
        audio: { url: randomClip },
        mimetype: 'audio/mp4',
        ptt: true,
        waveform: [99, 0, 99, 0, 99],
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: config.BOT_NAME || "ɢᴏᴊᴏ-XD",
            body: config.DESCRIPTION || "POWERED BY ꜱᴀᴛᴏʀᴜ ɢᴏᴊᴏ",
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnail: thumbnailBuffer,
            mediaUrl: "https://files.catbox.moe/ngwka3.jpg", // Static image URL
            sourceUrl: "https://wa.me/919961492108",
            showAdAttribution: true
          }
        }
      }, { quoted: m });
    }
  } catch (e) {
    console.error(e);
    const ownerJid = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(ownerJid, {
      text: `* Error in Mention Handler:*\n${e.message}`
    });
  }
});
