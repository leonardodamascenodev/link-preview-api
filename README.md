# 🔗 LinkPreview API

Uma API serverless de alta performance construída em Node.js para extrair metadados (**título, descrição, imagem, favicon, cor do tema e nome do site**) de qualquer URL na web.

Desenvolvida para ser leve, rápida e fácil de integrar em sistemas de chat, feeds, comentários ou qualquer aplicação que precise gerar automaticamente um preview de links compartilhados.

🚀 **Demonstração:** https://link-preview-api-chi.vercel.app/

---

## ✨ Funcionalidades

<<<<<<< HEAD
1. Clone este repositório:
   ```bash
   git clone [https://github.com/leonardodamascenodev/link-preview-api.git](https://github.com/leonardodamascenodev/link-preview-api.git)
=======
- ⚡ **Alta Performance (Cache In-Memory)**
  - Requisições repetidas para a mesma URL são respondidas em milissegundos utilizando cache em memória (`node-cache`).

- 🛡️ **Proteção contra SSRF**
  - Bloqueia automaticamente URLs inseguras como:
    - `localhost`
    - `127.0.0.1`
    - Redes privadas
    - Protocolos inválidos

- 🚦 **Rate Limiting**
  - Proteção contra abuso e ataques DoS limitando o número de requisições por IP.

- 🔄 **Sistema de Fallbacks**
  - Caso o site não possua Meta Tags Open Graph, a API tenta encontrar:
    - Descrição através de `<p>`
    - Imagens alternativas (Twitter Cards)
    - Outros metadados disponíveis

- 🌍 **CORS habilitado**
  - Pode ser consumida diretamente por aplicações React, Vue, Angular, Next.js ou JavaScript puro.

- 📦 **100% Open Source**

---

# 📡 API Reference

## Endpoint

```http
GET https://link-preview-api-chi.vercel.app/api/preview
```

## Parâmetros

| Nome | Tipo | Obrigatório | Descrição |
|------|------|------------|-----------|
| url | string | ✅ Sim | URL completa do site (incluindo `https://`) |

---

## Exemplo

```http
GET https://link-preview-api-chi.vercel.app/api/preview?url=https://github.com
```

ou

```bash
curl "https://link-preview-api-chi.vercel.app/api/preview?url=https://github.com"
```

---

# ✅ Resposta de sucesso

Status:

```
200 OK
```

Exemplo:

```json
{
  "title": "GitHub: Let’s build from here · GitHub",
  "description": "GitHub is where over 100 million developers shape the future of software...",
  "image": "https://github.githubassets.com/images/modules/site/social-cards/campaign-social.png",
  "favicon": "https://github.com/favicon.ico",
  "theme_color": "#0d1117",
  "site_name": "GitHub",
  "original_url": "https://github.com"
}
```

---

# ❌ Respostas de erro

| Status | Descrição |
|---------|-----------|
| **400** | Parâmetro `url` não enviado |
| **403** | URL bloqueada por segurança (SSRF) |
| **429** | Limite de requisições excedido |
| **500** | Erro interno ao processar a página |

---

# 💻 Exemplos de integração

## JavaScript / TypeScript

```javascript
const urlParaBuscar = "https://github.com";

fetch(
    `https://link-preview-api-chi.vercel.app/api/preview?url=${encodeURIComponent(urlParaBuscar)}`
)
.then(response => {
    if (!response.ok) {
        throw new Error("Erro na requisição");
    }

    return response.json();
})
.then(data => {
    console.log(data.title);
    console.log(data.description);
    console.log(data.image);
    console.log(data.favicon);
    console.log(data.theme_color);
})
.catch(console.error);
```

---

## Python

```python
import requests

response = requests.get(
    "https://link-preview-api-chi.vercel.app/api/preview",
    params={
        "url": "https://github.com"
    }
)

if response.status_code == 200:
    dados = response.json()

    print(dados["title"])
    print(dados["description"])
    print(dados["image"])

else:
    print(response.text)
```

---

## Node.js (Axios)

```javascript
import axios from "axios";

const { data } = await axios.get(
    "https://link-preview-api-chi.vercel.app/api/preview",
    {
        params: {
            url: "https://github.com"
        }
    }
);

console.log(data);
```

---

# 📦 Campos retornados

| Campo | Tipo | Descrição |
|---------|------|-----------|
| title | string | Título da página |
| description | string | Descrição encontrada |
| image | string | Imagem Open Graph |
| favicon | string | Ícone do site |
| theme_color | string | Cor principal do site |
| site_name | string | Nome do site |
| original_url | string | URL analisada |

---

# 🏗️ Arquitetura

```
Cliente
    │
    ▼
GET /api/preview
    │
    ▼
Validação da URL
    │
    ▼
Proteção SSRF
    │
    ▼
Cache
    │
    ├── Cache Hit
    │      │
    │      ▼
    │   Retorna resposta
    │
    ▼
Download do HTML
    │
    ▼
Extração das Meta Tags
    │
    ▼
Fallbacks
    │
    ▼
JSON
```

---

# 🛠️ Engenharia

## Web Scraping otimizado

Ao invés de utilizar navegadores completos como Puppeteer ou Playwright, esta API utiliza uma abordagem extremamente leve baseada em:

- Axios
- Cheerio

Isso reduz drasticamente:

- consumo de memória;
- tempo de resposta;
- custo de hospedagem.

A API é totalmente compatível com ambientes Serverless como:

- Vercel
- Netlify Functions
- AWS Lambda

---

## Headers inteligentes

Alguns sites bloqueiam User Agents comuns.

Para aumentar a compatibilidade, a API envia cabeçalhos semelhantes aos utilizados pelos indexadores oficiais de plataformas como:

- Facebook Messenger
- Discord
- Slack
- WhatsApp

Isso aumenta significativamente a taxa de sucesso na extração dos metadados.

---

## Limitações conhecidas

Sites protegidos por:

- Cloudflare
- Amazon
- CAPTCHAs
- Firewalls corporativos
- Sistemas AntiBot

podem retornar erros como:

- 403
- 429
- 503

Essa limitação é esperada e faz parte da escolha por uma arquitetura extremamente rápida e compatível com hospedagem gratuita.

---

# 🚀 Executando localmente

Clone o projeto

```bash
git clone https://github.com/SEU_USUARIO/link-preview-api.git
```

Entre na pasta

```bash
cd link-preview-api
```

Instale as dependências

```bash
npm install
```

Execute

```bash
npm start
```

ou

```bash
node index.js
```

Depois abra:

```
http://localhost:3000
```

---

# 🧰 Tecnologias

- Node.js
- JavaScript
- Axios
- Cheerio
- Node Cache
- Express
- Vercel Functions

---

# 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Faça um Fork
2. Crie uma Branch

```bash
git checkout -b minha-feature
```

3. Faça o commit

```bash
git commit -m "Minha feature"
```

4. Faça o Push

```bash
git push origin minha-feature
```

5. Abra um Pull Request

---

# 📄 Licença

Este projeto é distribuído sob a licença **MIT**.

Você pode utilizar, modificar e distribuir livremente.

---

# ⭐ Gostou do projeto?

Se este projeto foi útil para você, considere deixar uma ⭐ no repositório.

Isso ajuda outras pessoas a encontrarem o projeto e incentiva novas funcionalidades.
>>>>>>> 6a4f8c7 (feat: reformulando readme.md)
