# 🔗 LinkPreview API

Uma API de alta performance construída para extrair metadados (título, descrição, imagem e favicon) de qualquer URL da web. Projetada para ser rápida, segura e fácil de integrar.

## 🚀 O Projeto
Esta API resolve a dor de cabeça de desenvolvedores front-end que precisam exibir prévias de links em chats, feeds ou sistemas de comentários sem reinventar a roda. Desenvolvida para ser "Serverless-ready", ideal para deploy em plataformas como Vercel.

## ✨ Funcionalidades Principais
- **Extração Inteligente:** Captura OpenGraph tags (`og:title`, `og:description`, etc) com fallback para tags HTML padrão.
- **Segurança SSRF:** Bloqueio nativo contra tentativas de acesso a IPs internos ou redes locais.
- **Performance (Cache):** Sistema de cache em memória para requisições repetidas, reduzindo o tempo de resposta para milissegundos.
- **Anti-Spam:** Rate Limiting configurado para proteger o servidor contra abuso.
- **Resiliência:** Tratamento de erros e timeout para sites lentos ou indisponíveis.

## 🛠️ Tecnologias
- **Node.js**
- **Express.js**
- **Axios** (Requisições HTTP)
- **Cheerio** (Parsing de HTML)
- **Node-Cache** (Gerenciamento de Cache)
- **Express-Rate-Limit** (Proteção)

## 📋 Como rodar localmente

1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/link-preview-api.git](https://github.com/SEU_USUARIO/link-preview-api.git)
