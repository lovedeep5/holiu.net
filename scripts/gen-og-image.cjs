const sharp = require("sharp");

const W = 1200, H = 630;

const bgSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf0ea"/>
      <stop offset="55%" stop-color="#fee5db"/>
      <stop offset="100%" stop-color="#fdc8b1"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
</svg>
`;

const textSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="50%" y="530" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="54" fill="#2c2520">Discover the Treasure Inside of You</text>
  <text x="50%" y="575" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="2" fill="#a38d51">MEDITATION  •  CHAKRA BALANCING  •  SPIRITUAL COACHING</text>
</svg>
`;

(async () => {
  const logo = await sharp("public/images/logo-dark.png")
    .resize(280, 280, { fit: "contain" })
    .toBuffer();

  const out = process.argv[2] || "scratch-og-image.jpg";

  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: logo, top: 90, left: Math.round((W - 280) / 2) },
      { input: Buffer.from(textSvg), top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile(out);

  console.log("done ->", out);
})();
