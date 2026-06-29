const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const NodeCache = require('node-cache');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const cache = new NodeCache({ stdTTL: 3600 });

// Middlewares
app.use(express.json());
app.use(cors());

// Limite de Requisições
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 15
});

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota da API
app.get('/api/preview', limiter, async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) return res.status(400).json({ error: 'URL necessária' });

    const cachedData = cache.get(targetUrl);
    if (cachedData) return res.status(200).json(cachedData);

    try {
        const response = await axios.get(targetUrl, {
            timeout: 5000,
            headers: { 'User-Agent': 'facebookexternalhit/1.1' }
        });

        const $ = cheerio.load(response.data);
        
        const previewData = {
            title: $('meta[property="og:title"]').attr('content') || $('title').text(),
            description: $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || $('p').first().text().substring(0, 150),
            image: $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content'),
            site_name: $('meta[property="og:site_name"]').attr('content'),
            original_url: targetUrl
        };

        cache.set(targetUrl, previewData);
        return res.status(200).json(previewData);

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao processar URL' });
    }
});

// Rota para servir o index.html na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ESSENCIAL PARA VERCEL: Exportar o app, NÃO usar app.listen
module.exports = app;