# IBMEC Jr. Solucoes — Site Institucional

Site institucional da IBMEC Jr. Solucoes, construido com **React + TypeScript + Vite**.

---

## Desenvolvimento Local

```bash
cd site
npm install
npm run dev
```

O site estara disponivel em `http://localhost:5173`.

---

## Deploy na HostGator (Servidor Compartilhado)

### Pre-requisitos

- Acesso ao **cPanel** da HostGator
- Cliente FTP (FileZilla recomendado) ou acesso ao **Gerenciador de Arquivos** do cPanel
- Node.js instalado **na sua maquina local** (nao no servidor)

### Passo 1 — Build do projeto

Na sua maquina local, gere os arquivos estaticos:

```bash
cd site
npm run build
```

Isso cria a pasta `dist/` com todos os arquivos otimizados (HTML, CSS, JS, imagens).

### Passo 2 — Criar o .htaccess

O site usa rotas do React Router (ex: `/servicos`, `/sobre`, `/contato`). Sem o `.htaccess`, essas rotas dao erro 404 no Apache.

Crie o arquivo `dist/.htaccess` com o conteudo abaixo:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Se o arquivo ou diretorio existe, serve normalmente
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Caso contrario, redireciona tudo para index.html (SPA)
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Cache de assets estaticos (1 ano)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Compressao GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>
```

### Passo 3 — Upload via FTP

1. Abra o **FileZilla** (ou outro cliente FTP)
2. Conecte com as credenciais da HostGator:
   - **Host:** ftp.seudominio.com.br
   - **Usuario:** seu usuario do cPanel
   - **Senha:** sua senha do cPanel
   - **Porta:** 21
3. Navegue ate a pasta `public_html/` no servidor
4. **Delete** todos os arquivos antigos dentro de `public_html/` (exceto `.htaccess` se ja existir)
5. Faca upload de **todo o conteudo** da pasta `dist/` para dentro de `public_html/`

> **Importante:** Suba o *conteudo* de `dist/`, nao a pasta `dist/` em si. O `index.html` deve ficar diretamente em `public_html/index.html`.

### Passo 4 (alternativa) — Upload pelo cPanel

1. Acesse o **cPanel** da HostGator
2. Va em **Gerenciador de Arquivos**
3. Navegue ate `public_html/`
4. Clique em **Upload** e suba um `.zip` com o conteudo de `dist/`
5. Apos o upload, clique com botao direito no `.zip` e selecione **Extract**
6. Mova os arquivos extraidos para `public_html/` se ficaram em subpasta

### Passo 5 — Verificar

Acesse seu dominio no navegador. O site deve carregar normalmente, incluindo as rotas `/servicos`, `/sobre` e `/contato`.

---

## Deploy Automatizado com GitHub Actions (opcional)

Para automatizar o deploy via FTP sempre que fizer push na branch `main`:

1. No repositorio GitHub, va em **Settings > Secrets and variables > Actions**
2. Adicione os secrets:
   - `FTP_SERVER` — ex: `ftp.ibmecjr.com.br`
   - `FTP_USERNAME` — usuario FTP do cPanel
   - `FTP_PASSWORD` — senha FTP

3. Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to HostGator

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: site/package-lock.json

      - name: Install & Build
        run: |
          cd site
          npm ci
          npm run build

      - name: Create .htaccess
        run: |
          cat > site/dist/.htaccess << 'EOF'
          <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteBase /
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule ^ index.html [QSA,L]
          </IfModule>
          EOF

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: site/dist/
          server-dir: public_html/
```

---

## Estrutura do Projeto

```
siteibmecjr/
├── docs/                    # PDFs e documentos de referencia
├── site/
│   ├── public/
│   │   ├── assets/          # Videos, imagens de fundo
│   │   ├── logo/            # Logos dos clientes
│   │   └── ...              # Favicons, fotos
│   ├── src/
│   │   ├── assets/          # Imagens importadas (logo, mascotes)
│   │   ├── components/      # Componentes reutilizaveis
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Paginas (Servicos, SobreNos, Contato)
│   │   ├── styles/          # CSS global, variaveis, animacoes
│   │   ├── App.tsx          # Rotas e layout principal
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
└── .git/
```

---

## Troubleshooting

| Problema | Solucao |
|----------|---------|
| Rotas dao 404 ao recarregar | Verifique se o `.htaccess` esta em `public_html/` |
| CSS/JS nao carrega | Confira se o `index.html` esta na raiz de `public_html/`, nao em subpasta |
| Imagens/videos nao aparecem | Verifique se a pasta `assets/` e `logo/` foram enviadas corretamente |
| Leadster nao aparece | O script do Leadster esta no `index.html` — funciona em qualquer hospedagem |
| Pagina em branco | Abra o console do navegador (F12) e veja se ha erros de caminho |
