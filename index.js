const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const express = require('express');
const path = require('path'); // Adicione esta linha
app.use(express.static('public'));
app.use(cors());

app.get('/api/preview', async (req, res) => {
    const targetUrl = req.query.url;
    
    try {
        // Tenta primeiro com Axios (mais rápido)
        let html;
        try {
            const response = await axios.get(targetUrl, { timeout: 3000 });
            html = response.data;
        } catch (err) {
            // Se falhar (bloqueio ou erro), tenta com Puppeteer
            console.log('Axios falhou, tentando via Puppeteer...');
        }

        const $ = cheerio.load(html);
        
        // Extração dos dados (mesma lógica de antes)
        const title = $('meta[property="og:title"]').attr('content') || $('title').text();
        const image = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content');
        const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || $('p').first().text();
        const siteName = $('meta[property="og:site_name"]').attr('content');
        const themeColor = $('meta[name="theme-color"]').attr('content') || null;

        return res.status(200).json({ title, image, description, site_name: siteName, theme_color: themeColor, original_url: targetUrl });

    } catch (error) {
        return res.status(500).json({ error: 'Falha ao processar o site, mesmo com Puppeteer.' });
    }
});

// Adicione isso logo após os middlewares
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});