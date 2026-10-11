# Box Diário

Guia diário de F1 em português: próxima corrida com contagem regressiva e onde assistir no Brasil, lendas com homenagem a Ayrton Senna, campeonato, volta do dia com jogo e glossário.

## Rodar no computador

Requer Node.js 22.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para abrir no celular (mesmo Wi-Fi), use o endereço "Network" que aparece no terminal, como `http://192.168.1.8:3000`. O `next.config.ts` já libera esse acesso no modo dev.

Outros comandos:

- `npm run build`: gera a versão de produção (o mesmo que a Netlify roda)
- `npm run typecheck`: confere os tipos do TypeScript

## Publicar na Netlify

1. Suba a pasta para um repositório no GitHub.
2. Na Netlify: **Add new site → Import from Git** e escolha o repositório. O `netlify.toml` já tem o comando de build; o Next.js é detectado sozinho.
3. Opcional: em **Site configuration → Environment variables**, crie `BROADCAST_URL` com a URL raw do `data/broadcast.json` no GitHub. Assim, editar esse arquivo no GitHub atualiza o site sem novo deploy (economiza créditos do plano grátis).

## Onde mexer

| O que | Arquivo |
| --- | --- |
| Lendas (texto, títulos, carros, fotos) | `content/legends.ts` |
| Homenagem a Senna | `content/senna.ts` e `components/SennaTribute.tsx` |
| Fatos da Volta do dia | `content/facts.ts` |
| Glossário | `content/glossary.ts` |
| Corridas que passam na TV aberta | `data/broadcast.json` (veja abaixo) |
| Nome do site | `lib/site.ts` |
| Cores e estilos | `app/globals.css` |
| Calendário, classificação (API) | `lib/jolpica.ts` |

### Fotos das lendas

Cada lenda aceita um campo `photo` opcional. Use só fotos do Wikimedia Commons com licença livre e registre o crédito:

```ts
photo: {
  src: "/img/lendas/ayrton-senna.jpg",
  credit: "Nome do autor",
  license: "CC BY-SA 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:...",
},
```

Coloque o arquivo em `public/img/lendas/`. Sem foto, o card usa a arte com as iniciais (e a bandeira para brasileiros).

## O que é o broadcast.json (e quando mexer)

Ele guarda só uma informação: **quais etapas passam na Globo, na TV aberta**. Todas as outras passam no SporTV 3, no Globoplay e na F1 TV, e isso o site já sabe sozinho.

```json
"openTvRounds": [1, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 20, 21, 23]
```

Cada número é a etapa do calendário (1 = Austrália, 20 = São Paulo...). **Não precisa atualizar todo mês.** Só mexa quando:

1. **Começar uma temporada nova** (uma vez por ano): a Globo divulga a lista de corridas na TV aberta e você troca os números e o campo `season`.
2. **A Globo mudar a grade no meio do ano** (raro): por exemplo, se decidir passar o GP do México na TV aberta, acrescente o `19`.

Calendário, horários, resultados e classificação vêm da API e se atualizam sozinhos.

## Som da largada

O botão "Largada com som" toca os bipes das luzes e um carro passando. O som é gerado no próprio navegador (`lib/sound.ts`, Web Audio API): não tem arquivo, não tem licença e não pesa nada. Ele só toca depois de um clique porque os navegadores bloqueiam som automático ao abrir um site.

## Trocar o nome do site

O nome fica em `lib/site.ts`. Mudou ali, muda no logo, no título das páginas e no calendário.

## Dados

- [Jolpica-F1](https://github.com/jolpica/jolpica-f1): calendário, resultados e classificação. Grátis, sem chave. Cache: 24 h no calendário, 1 h na classificação.
- `data/broadcast.json`: canais de cada corrida no Brasil.
- `/calendario.ics`: feed de calendário com alarme 1 h antes de cada corrida.

"F1" e "Formula 1" são marcas registradas. Este é um site de fã, sem vínculo com a categoria ou com as equipes.
