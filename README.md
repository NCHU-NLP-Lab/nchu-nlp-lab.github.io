# UDIC Website

實驗室的網站

## Install & Run

```bash
docker build --tag udic-website .
docker run --name "udic-website" --publish "5000:5000" udic-website
```
## Development  

```bash
npm install
npm run dev
```