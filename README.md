# Analisador de Sentimentos em Comentários de Produto

Este projeto é uma aplicação web desenvolvida para o minicurso "Build With A.I." (Unimar & Google). O objetivo é demonstrar a integração de IA generativa com práticas modernas de desenvolvimento web, permitindo análise automática de sentimentos em comentários de produtos utilizando Vue.js 3 e Google AI Studio.

## Funcionalidades

- Comentários interativos: interface para adicionar comentários sobre produtos
- Análise de sentimento automática: integração com Google AI Studio (Gemini) para classificação em tempo real
- Visualização de dados: estatísticas dos sentimentos analisados
- Persistência local: dados salvos no localStorage do navegador
- Interface responsiva com Tailwind CSS
- Performance otimizada com Vite

## Tipos de Análise

- Positivo: elogios, satisfação, recomendações
- Negativo: críticas, insatisfação, problemas relatados
- Neutro: comentários informativos ou sem opinião clara

## Estrutura da Aplicação

```
src/
├── assets/          # Recursos estáticos (CSS, imagens)
│   └── styles/      
│       └── main.css # Estilos principais com Tailwind
├── components/      # Componentes reutilizáveis
│   ├── ProductCard.vue      # Card de exibição do produto
│   ├── CommentForm.vue      # Formulário de comentários
│   ├── CommentList.vue      # Lista de comentários
│   └── SentimentBadge.vue   # Badge de sentimento
├── composables/     # Funções reutilizáveis
│   └── useSentimentAnalysis.js # Lógica de análise
├── router/          # Configuração de rotas
│   └── index.js     # Definição das rotas
├── store/           # Gerenciamento de estado (Pinia)
│   └── commentStore.js # Store dos comentários
├── services/        # Integração com APIs
│   └── sentimentService.js # Serviço Google AI
├── views/           # Páginas da aplicação
│   └── ProductView.vue # Página principal
├── App.vue          # Componente raiz
└── main.js          # Bootstrap da aplicação
```

## Padrões de Desenvolvimento

- Uso da Composition API do Vue 3
- Sistema reativo para atualizações em tempo real
- Componentes desacoplados e reutilizáveis
- Gerenciamento de estado centralizado com Pinia
- Componentes padronizados com Tailwind

## Tecnologias Utilizadas

### Frontend
- Vue.js 3
- Vite
- Vue Router
- Pinia
- Tailwind CSS

### IA e APIs
- Google AI Studio (Gemini)
- @google/generative-ai (SDK oficial)

### Desenvolvimento
- ESLint
- Prettier
- PostCSS
- Autoprefixer

## Pré-requisitos

- Node.js 18.0+ e npm ou yarn
- Chave da API Google AI Studio (opcional, funciona com mock)
- Navegador moderno com suporte a ES6+

## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd analisador-sentimentos-comentarios
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   ```bash
   cp env.example .env
   ```
   Edite o arquivo `.env` e adicione sua chave da API:
   
   ```env
   VITE_GOOGLE_AI_API_KEY=sua_chave_aqui
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```
   A aplicação estará disponível em: http://localhost:3000

## Configuração da API Google AI Studio

1. Acesse https://aistudio.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada
5. Cole no arquivo `.env`

Se a API não estiver configurada, a aplicação utiliza análise mock baseada em palavras-chave, exibe aviso sobre o modo demonstração e mantém todas as funcionalidades ativas.

## Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run preview      # Visualiza build localmente
npm run lint         # Executa ESLint
npm run format       # Formata código com Prettier
```

## Fluxo de Funcionamento

1. O usuário visualiza detalhes do produto e preenche o formulário de comentário
2. Os dados são validados no frontend e o objeto comentário é criado
3. O texto é enviado para análise de sentimento (Google AI Studio ou mock)
4. O resultado é armazenado no localStorage e a interface é atualizada em tempo real

## Personalização

Para modificar cores e temas, edite o arquivo `tailwind.config.js`.

Para adicionar novos componentes, crie o arquivo na pasta `src/components/`, utilize a Composition API e importe nos componentes pais.

## Estrutura dos Dados

Exemplo de objeto comentário:

```javascript
{
  id: "timestamp_unique_id",
  autor: "Nome do usuário",
  texto: "Conteúdo do comentário",
  timestamp: "2024-01-15T10:30:00.000Z",
  analise: {
    sentimento: "positivo|negativo|neutro",
    confianca: 0.85,
    justificativa: "Explicação da análise",
    timestamp: "2024-01-15T10:30:01.000Z"
  }
}
```

Exemplo de resultado da análise:

```javascript
{
  sentimento: "positivo",
  confianca: 0.92,
  justificativa: "Comentário expressa satisfação e recomendação",
  timestamp: "2024-01-15T10:30:01.000Z",
  mock: false // true se usando análise mock
}
```

## Diagramas de Arquitetura

Os diagramas estão disponíveis na pasta `docs/` nos arquivos `architecture-diagram.xml` e `sequence-diagram.xml` (formato Draw.io XML). Para visualizar, acesse https://app.diagrams.net/ e importe os arquivos.



## Solução de Problemas

- Erro de CORS: verifique se a API key está correta e se o domínio está autorizado
- Análise não funciona: verifique conexão com internet, validade da API key ou utilize o modo mock
- Build falha: limpe `node_modules/` e reinstale, verifique compatibilidade do Node.js

## Contribuição

1. Faça fork do repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.



## Contexto Educacional

Este projeto foi desenvolvido como material didático para o evento "Build With A.I.", uma parceria entre Unimar e Google, com o objetivo de demonstrar integração de IA generativa em aplicações web, boas práticas de desenvolvimento com Vue.js 3 e arquitetura moderna de SPAs.

Desenvolvido para demonstrar o uso de IA generativa no desenvolvimento web moderno.