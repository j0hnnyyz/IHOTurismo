# Setup IHO Turismo

## 📋 Próximos Passos

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar o Projeto

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 🎨 Implementado

### Estrutura Base
- ✅ React 18 com TypeScript
- ✅ Material-UI (MUI) configurado
- ✅ ThemeProvider com cores personalizadas
- ✅ Estrutura de pastas seguindo padrões do CRM

### Cores Configuradas
- **Primária:** `#692176` (roxo)
- **Secundária:** `#C91448` (rosa/magenta)

### Componentes
- ✅ Header com:
  - Logo IHO Turismo
  - Box transparente com bordas arredondadas
  - Ícone de busca
  - Links de navegação (Login, Pacotes, Sobre nós, Contato)
  
### Background
- ✅ Background fixo usando a imagem `IHObg.png`
- ✅ Layout responsivo

## 📁 Estrutura

```
IHO/
├── public/              # Arquivos públicos
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   └── Header/     # Componente de header
│   ├── contexts/       # Contextos React
│   │   └── ThemeModeContext.tsx
│   ├── providers/      # Providers
│   │   └── ThemeProvider.tsx
│   ├── imgs/          # Imagens e assets
│   │   ├── IHObg.png   # Background
│   │   └── LogoIHO.png # Logo
│   ├── App.tsx        # Componente principal
│   └── index.tsx      # Entry point
├── package.json
└── tsconfig.json
```

## 🎯 Próximas Features

- [ ] Sistema de rotas
- [ ] Páginas de navegação
- [ ] Formulários
- [ ] Integração com backend (quando necessário)

