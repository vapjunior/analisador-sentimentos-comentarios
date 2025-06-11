# 🚀 Instruções de Setup - Analisador de Sentimentos

## ⚠️ Pré-requisitos Importantes

Este projeto requer **Node.js 18.0+** para funcionar corretamente. A versão atual detectada (10.19.0) é muito antiga.

### 📥 Instalação do Node.js Atualizado

#### Ubuntu/Debian:
```bash
# Remover versão antiga (opcional)
sudo apt remove nodejs npm

# Instalar Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version  # Deve mostrar v20.x.x
npm --version   # Deve mostrar 10.x.x
```

#### Via NVM (Recomendado):
```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recarregar terminal
source ~/.bashrc

# Instalar Node.js LTS
nvm install --lts
nvm use --lts

# Verificar
node --version
npm --version
```

## 🏃‍♂️ Passos de Instalação

### 1. Verificar Node.js
```bash
node --version  # Deve ser >= 18.0.0
npm --version   # Deve estar disponível
```

### 2. Instalar Dependências
```bash
cd /analisador-sentimentos-comentarios
npm install
```

### 3. Configurar Variáveis de Ambiente
```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar com sua API key (opcional)
nano .env
```

### 4. Iniciar Desenvolvimento
```bash
npm run dev
```

## 🔧 Resolução de Problemas

### Erro: "npm command not found"
**Solução**: Instalar Node.js atualizado (ver instruções acima)

### Erro: Versão incompatível
**Solução**: 
```bash
nvm install 20
nvm use 20
```

### Erro: Permissões
**Solução**:
```bash
sudo chown -R $(whoami) ~/.npm
```

### Erro: Cache corrompido
**Solução**:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🌐 Configuração da API Google AI

### Obter Chave API:
1. Acesse: https://aistudio.google.com/app/apikey
2. Faça login com conta Google
3. Clique "Create API Key"
4. Copie a chave

### Configurar no projeto:
```bash
# Editar arquivo .env
echo "VITE_GOOGLE_AI_API_KEY=sua_chave_aqui" >> .env
```

## ✅ Verificação da Instalação

Após instalação bem-sucedida, você deve ver:

```bash
npm run dev
# ✓ Local:   http://localhost:3000/
# ✓ Network: use --host to expose
```

## 🚀 Scripts Úteis

```bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Preview build
npm run preview

# Lint código
npm run lint

# Formatar código
npm run format
```

## 📱 Testando a Aplicação

1. **Página inicial**: Deve carregar produto e formulário
2. **Adicionar comentário**: Preencher e enviar
3. **Análise automática**: Badge deve aparecer
4. **Estatísticas**: Gráficos devem atualizar
5. **Persistência**: Dados mantidos ao recarregar

## 🔍 Modo Demonstração

Se não configurar a API do Google AI:
- ✅ Aplicação funciona normalmente
- 🤖 Usa análise mock baseada em palavras-chave
- ⚠️ Exibe aviso sobre modo demonstração
- 📊 Todas as funcionalidades ativas

## 📞 Suporte

Em caso de problemas:
1. Verificar Node.js >= 18.0
2. Limpar cache npm
3. Reinstalar dependências
4. Verificar console do navegador

---

**💡 Dica**: Use o modo demonstração para testar sem API key! 