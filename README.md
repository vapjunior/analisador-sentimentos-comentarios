# 🛍️ Analisador de Sentimentos em Comentários de Produto

![Vue.js](https://img.shields.io/badge/Vue.js-3.4.0-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![Google AI](https://img.shields.io/badge/Google_AI-Studio-4285F4?style=flat&logo=google&logoColor=white)

**Projeto desenvolvido para o minicurso "Build With A.I." - Unimar & Google**

Uma aplicação web moderna (SPA) que demonstra a integração de **IA generativa** com práticas de **desenvolvimento web**, permitindo análise automática de sentimentos em comentários de produtos usando Vue.js 3 e Google AI Studio.

## ✨ Demonstração

![Preview da Aplicação](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Preview+da+Aplicação)

## 🎯 Funcionalidades Principais

- **📝 Comentários Interativos**: Interface intuitiva para adicionar comentários sobre produtos
- **🤖 Análise de Sentimento Automática**: Integração com Google AI Studio (Gemini) para classificação em tempo real
- **📊 Visualização de Dados**: Estatísticas visuais dos sentimentos analisados
- **💾 Persistência Local**: Dados salvos no localStorage do navegador
- **🎨 Interface Moderna**: Design responsivo com Tailwind CSS
- **⚡ Performance Otimizada**: Carregamento rápido com Vite

### 🧠 Tipos de Análise

- **😊 Positivo**: Elogios, satisfação, recomendações
- **😞 Negativo**: Críticas, insatisfação, problemas relatados
- **😐 Neutro**: Comentários informativos ou sem opinião clara

## 🏗️ Arquitetura da Aplicação

### 📁 Estrutura de Pastas

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

### 🎯 Padrões de Desenvolvimento

- **⚛️ Composition API**: Uso da Composition API do Vue 3
- **🔄 Reatividade**: Sistema reativo para atualizações em tempo real
- **🧩 Modularização**: Componentes desacoplados e reutilizáveis
- **📦 Gestão de Estado**: Centralizada com Pinia
- **🎨 Design System**: Componentes padronizados com Tailwind

## 🚀 Tecnologias Utilizadas

### Frontend
- **Vue.js 3** - Framework progressivo
- **Vite** - Ferramenta de build ultrarrápida
- **Vue Router** - Roteamento oficial do Vue
- **Pinia** - Gerenciamento de estado moderno
- **Tailwind CSS** - Framework CSS utilitário

### IA e APIs
- **Google AI Studio** - Análise de sentimento com Gemini
- **@google/generative-ai** - SDK oficial do Google AI

### Desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Compatibilidade CSS

## 📋 Pré-requisitos

- **Node.js** 18.0+ e npm/yarn
- **Chave da API Google AI Studio** (opcional - funciona com mock)
- **Navegador moderno** com suporte a ES6+

## ⚙️ Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd analisador-sentimentos-comentarios
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

Copie o arquivo de exemplo e configure:

```bash
cp env.example .env
```

Edite o arquivo `.env` e adicione sua chave da API:

```env
# Google AI Studio API Key (opcional)
VITE_GOOGLE_AI_API_KEY=sua_chave_aqui
```

### 4. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

## 🔑 Configuração da API Google AI Studio

### Obtendo a Chave da API

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada
5. Cole no arquivo `.env`

### Modo de Fallback

Se a API não estiver configurada, a aplicação automaticamente:
- Usa análise mock baseada em palavras-chave
- Exibe aviso sobre o modo demonstração
- Mantém todas as funcionalidades ativas

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção
npm run preview      # Visualiza build localmente

# Qualidade de Código
npm run lint         # Executa ESLint
npm run format       # Formata código com Prettier
```

## 📊 Fluxo de Funcionamento

### 1. **Interação do Usuário**
- Usuário visualiza detalhes do produto
- Preenche formulário de comentário
- Submete o comentário

### 2. **Processamento**
- Validação dos dados no frontend
- Criação do objeto comentário
- Chamada para análise de sentimento

### 3. **Análise de IA**
- Envio do texto para Google AI Studio
- Processamento com modelo Gemini
- Retorno da classificação (positivo/negativo/neutro)

### 4. **Persistência e Exibição**
- Armazenamento no localStorage
- Atualização da interface em tempo real
- Exibição de estatísticas visuais

## 🎨 Personalização

### Modificando Cores e Temas

Edite o arquivo `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#sua-cor-primaria',
        // ...
      }
    }
  }
}
```

### Adicionando Novos Componentes

1. Crie o arquivo na pasta `src/components/`
2. Use a Composition API
3. Importe e use nos componentes pais

## 🔧 Estrutura dos Dados

### Objeto Comentário

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

### Resultado da Análise

```javascript
{
  sentimento: "positivo",
  confianca: 0.92,
  justificativa: "Comentário expressa satisfação e recomendação",
  timestamp: "2024-01-15T10:30:01.000Z",
  mock: false // true se usando análise mock
}
```

## 📈 Diagramas de Arquitetura

### Diagrama de Arquitetura
- 📄 **Arquivo**: `docs/architecture-diagram.xml`
- 🔧 **Formato**: Draw.io XML
- 📋 **Conteúdo**: Estrutura em camadas da aplicação

### Diagrama de Sequência
- 📄 **Arquivo**: `docs/sequence-diagram.xml`
- 🔧 **Formato**: Draw.io XML
- 📋 **Conteúdo**: Fluxo de adição de comentário

Para visualizar:
1. Acesse [Draw.io](https://app.diagrams.net/)
2. Importe os arquivos XML
3. Visualize e edite conforme necessário

## 🚀 Deploy em Produção

### Build de Produção

```bash
npm run build
```

### Opções de Deploy

1. **Vercel** (Recomendado)
```bash
npm install -g vercel
vercel
```

2. **Netlify**
- Faça upload da pasta `dist/`
- Configure redirecionamentos SPA

3. **GitHub Pages**
```bash
npm run build
# Deploy da pasta dist/
```

### Variáveis de Ambiente em Produção

Configure `VITE_GOOGLE_AI_API_KEY` na plataforma de deploy.

## 🐛 Solução de Problemas

### Erro de CORS
- Verifique se a API key está correta
- Confirme se o domínio está autorizado

### Análise não funciona
- Verifique a conexão com internet
- Confirme se a API key é válida
- Use o modo mock para testes

### Build falha
- Limpe `node_modules/` e reinstale
- Verifique compatibilidade do Node.js

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autores

- **Build With A.I.** - Minicurso Unimar & Google
- **Desenvolvimento**: Demonstração educacional

## 🎓 Contexto Educacional

Este projeto foi desenvolvido como material didático para o evento **"Build With A.I."**, uma parceria entre **Unimar** e **Google**, com o objetivo de demonstrar:

- Integração de IA generativa em aplicações web
- Boas práticas de desenvolvimento com Vue.js 3
- Arquitetura moderna de SPAs
- Uso prático de APIs de IA

## 📞 Suporte

Para dúvidas sobre o projeto:
- 📧 Email: suporte@builwithai.com
- 💬 Discord: Build With A.I. Community
- 📚 Documentação: [docs.buildwithai.com](https://docs.buildwithai.com)

## 🔮 Próximas Funcionalidades

- [ ] Sistema de autenticação
- [ ] Comentários aninhados (respostas)
- [ ] Análise de múltiplos idiomas
- [ ] Dashboard administrativo
- [ ] API backend completa
- [ ] Integração com banco de dados
- [ ] Notificações em tempo real
- [ ] Exportação de relatórios

---

**💡 Desenvolvido com ❤️ para demonstrar o poder da IA Generativa no desenvolvimento web moderno.** 