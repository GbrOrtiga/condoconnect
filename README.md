# CondoConnect

**Marketplace acadêmico de serviços para condomínios**

Um projeto educacional que demonstra o desenvolvimento de uma plataforma de conexão entre moradores e prestadores de serviços dentro de condomínios, usando HTML5, CSS3 e JavaScript puro.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias](#tecnologias)
3. [Como Executar](#como-executar)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Funcionalidades Implementadas](#funcionalidades-implementadas)
6. [Dados e Armazenamento](#dados-e-armazenamento)
7. [Limitações da Versão Atual](#limitações-da-versão-atual)
8. [Contas de Demonstração](#contas-de-demonstração)
9. [Histórico de Versões](#histórico-de-versões)
10. [Planejamento Futuro](#planejamento-futuro)

---

## 🎯 Visão Geral

### Objetivo

CondoConnect é um projeto acadêmico que simula um marketplace de serviços para condomínios. O sistema permite que moradores procurem, filtrem e solicitem serviços de prestadores que também residem nos mesmos condomínios, criando um ambiente de confiança e proximidade.

### Público-Alvo

- **Estudantes de desenvolvimento web** que desejam aprender a criar aplicações com arquitetura modular.
- **Instituições educacionais** que ensinam HTML5, CSS3 e JavaScript es6+ em ambiente browser.
- **Pesquisadores** interessados em prototipagem rápida de interfaces responsivas.

### Escopo Acadêmico

Este projeto demonstra:

- Separação clara entre dados, lógica de negócio e apresentação (MVC-like)
- Uso de módulos ES6 para organizar código JavaScript
- Roteamento de página com SPA (Single Page Application) baseado em atributos HTML
- Persistência de dados com localStorage
- Design responsivo com CSS Grid e Flexbox
- Simulação de autenticação (não segura; apenas para protótipo)
- Manipulação de arquivos e conversão de imagens em data URLs

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Responsabilidade |
|---|---|---|
| **HTML5** | Nativa | Estrutura semântica e marcação de componentes |
| **CSS3** | Nativa | Styling visual, variáveis CSS, responsive design, flexbox e grid |
| **JavaScript ES6+** | Nativa | Lógica de aplicação, manipulação de DOM, módulos, localStorage |
| **localStorage API** | Nativa | Persistência de dados no navegador (prototipagem) |

### Não Utiliza

- ❌ React, Vue, Angular ou outros frameworks JavaScript
- ❌ Node.js, npm ou build tools
- ❌ Banco de dados (SQL, MongoDB, etc.)
- ❌ API REST (dados são simulados)
- ❌ Autenticação segura (senha armazenada em plain text; apenas protótipo)
- ❌ Back-end (servidor Python, Java, etc.)

---

## 🚀 Como Executar

### Requisito Geral

O projeto deve ser servido via **HTTP** (não via `file://`) porque utiliza módulos JavaScript ES6, que exigem contexto HTTP para funcionar corretamente.

### Opção 1: Live Server (Recomendado)

**Live Server** é uma extensão do VS Code que serve a pasta localmente e recarrega o navegador automaticamente ao salvar arquivos.

#### Passo a passo:

1. **Abra a pasta do projeto no VS Code**

   ```bash
   code caminho/para/condoconnect
   ```

2. **Instale a extensão Live Server** (se não estiver instalada)
   - Vá para a aba **Extensions** (Ctrl+Shift+X / Cmd+Shift+X)
   - Procure por "Live Server" (de Ritwick Dey)
   - Clique em **Install**

3. **Abra `index.html` com Live Server**
   - Clique com o botão direito no arquivo `index.html` na árvore de arquivos
   - Selecione **"Open with Live Server"**

4. **Acesse a URL exibida**
   - Uma abra do navegador abrirá automaticamente, algo como:
     ```
     http://127.0.0.1:5500/index.html
     ```

### Opção 2: Python http.server

Se Python 3 estiver instalado no seu computador, use o servidor HTTP nativo:

#### Passo a passo:

1. **Abra o terminal na pasta do projeto**

   ```bash
   cd caminho/para/condoconnect
   ```

2. **Inicie o servidor**

   ```bash
   python -m http.server 8000
   ```

   (No Windows, pode ser `python3 -m http.server 8000`)

3. **Acesse a URL no navegador**

   ```
   http://localhost:8000
   ```

4. **Para parar o servidor**, pressione `Ctrl+C` no terminal.

### Opção 3: Outro servidor HTTP

Qualquer servidor HTTP local funciona (Node.js `http-server`, Ruby WEBrick, etc.). O importante é que os módulos JavaScript sejam servidos com tipo MIME `application/javascript`.

---

## 📁 Estrutura do Projeto

```
condoconnect/
├── index.html              # Página principal (home)
├── login.html              # Página de login
├── cadastro.html           # Página de cadastro de novos usuários
├── dashboard.html          # Dashboard pessoal após login
├── servicos.html           # Catálogo de serviços
├── perfil.html             # Perfil do usuário logado
├── prestador.html          # Perfil público do prestador
├── meus-servicos.html      # Área "Meus Serviços" para prestadores
│
├── css/
│   ├── style.css           # Estilos principais (tema azul, branco, cinza)
│   └── responsive.css      # Media queries para mobile, tablet e desktop
│
├── js/
│   ├── app.js              # Orquestrador principal (roteamento, renderização)
│   ├── data.js             # Dados simulados (usuários, provedores, serviços, reviews)
│   ├── users.js            # Funções de autenticação e gerenciamento de usuários
│   ├── services.js         # Funções de busca, filtro e gestão de serviços
│   ├── bookings.js         # Funções de solicitação de visita (agendamento)
│   └── utils.js            # Funções utilitárias (formatação, DOM, imagens)
│
├── components/
│   ├── header.html         # Componente cabeçalho (marca e navegação)
│   ├── navbar.html         # Componente barra de navegação responsiva
│   └── footer.html         # Componente rodapé (links institucionais)
│
└── assets/
    ├── icons/              # Ícones da aplicação
    └── img/                # Imagens de exemplo
```

### Descrição de Arquivos Principais

#### **Páginas HTML**

- **`index.html`**: Página inicial com busca de serviços, categorias, destaques e herói visual.
- **`login.html`**: Formulário de entrada para usuários registrados.
- **`cadastro.html`**: Formulário para criar nova conta (morador ou prestador).
- **`dashboard.html`**: Tela personalizada após login, com resumo de informações.
- **`servicos.html`**: Catálogo completo de serviços com filtros (categoria, preço, avaliação) e busca textual.
- **`perfil.html`**: Página do perfil do usuário logado, com opção de editar foto e alterar dados residenciais/profissionais.
- **`prestador.html`**: Visualização pública do perfil de um prestador (nome, bio, avaliações, serviços).
- **`meus-servicos.html`**: Área exclusiva para prestadores gerenciarem suas solicitações de visita e calendário.

#### **Módulos JavaScript (`js/`)**

| Arquivo | Responsabilidade |
|---|---|
| **`app.js`** | Orquestração geral: roteamento de página, renderização dinâmica de componentes, manipulação de eventos, integração de módulos |
| **`data.js`** | Dados simulados: categorias, usuários (moradores + prestadores), provedores, serviços, avaliações (reviews) |
| **`users.js`** | Autenticação simples, gerenciamento de contas, armazenamento de perfil e sessão no localStorage |
| **`services.js`** | Busca, filtro e recuperação de serviços; relação com prestadores |
| **`bookings.js`** | Gestão de solicitações de visita (agendamento) no calendário do prestador |
| **`utils.js`** | Utilitários: formatação de moeda, seleção de elementos DOM, conversão de imagens, leitura de parâmetros de URL |

#### **Componentes HTML Reutilizáveis (`components/`)**

Placeholders para cabeçalho, navegação e rodapé injetados dinamicamente pelo `app.js`.

#### **Estilos (`css/`)**

- **`style.css`**: Paleta de cores (azul `#1769aa`, branco, cinza), tipografia, componentes (botões, cards, formulários), animações.
- **`responsive.css`**: Breakpoints para dispositivos (mobile, tablet, desktop) usando media queries.

---

## ✨ Funcionalidades Implementadas

### Home e Navegação Responsiva

- Página inicial com busca por palavra-chave
- Navegação dinâmica entre páginas (sem recarregar; SPA)
- Menu responsivo: desktop horizontal, mobile hamburger
- Links ancorados para seções da home (#categorias, #destaques, etc.)

### Cadastro de Moradores e Prestadores

- Formulário único com campo condicional (tipo de usuário)
- **Morador**: Dados residenciais (endereço, número de casa ou bloco/apartamento)
- **Prestador**: Dados profissionais (serviço oferecido, bio, telefone)
- Validação básica de campos
- Armazenamento seguro de senha em localStorage (protótipo)

### Dados Residenciais

- **Morador**: Casa (com número) ou Apartamento (com bloco e número)
- Campo condicional (mostra/oculta conforme tipo escolhido)
- Armazenado na propriedade do usuário

### Dados Profissionais do Prestador

- **Nome do Serviço**: ex. "Passeador de cães", "Suporte técnico"
- **Categoria**: Associação com categoria (pets, limpeza, jardinagem, etc.)
- **Bio**: Descrição profissional
- **Telefone**: Contato direto
- **Foto de Perfil**: Upload e armazenamento como data URL (até 1,5 MB)

### Login Simulado e Menu Dinâmico

- Autenticação por email e senha (plain text; apenas protótipo)
- Sessão armazenada em `localStorage` com chave `"usuarioLogado"`
- Menu navbar muda de acordo com status:
  - **Não autenticado**: botões "Entrar" e "Cadastrar"
  - **Autenticado (Morador)**: nome + foto, "Meus Dados", "Sair"
  - **Autenticado (Prestador)**: nome + foto, "Meus Serviços", "Sair"

### Catálogo, Busca e Filtros

- **Catálogo**: Grid de 12 serviços (provedores) com foto, nome, rating, preço, badge verificado
- **Busca**: Busca textual por nome de serviço, prestador, categoria ou descrição
- **Filtros**:
  - **Categoria**: Todos, Pets, Limpeza, Jardinagem, Tecnologia, Automotivo, Manutenção, Educação, Alimentação, Beleza
  - **Preço**: Até R$ 30, R$ 30–50, R$ 50–100, Acima de R$ 100
  - **Avaliação**: Todas, 4+ estrelas, 4.5+ estrelas
- Filtros podem ser combinados
- Resultados atualizam em tempo real

### Perfil Público do Prestador

- Página dedicada com informações completas do prestador
- Foto, nome, serviço, categoria, preço, avaliação geral, número de reviews
- Badge "Verificado" (se aplicável)
- Seção de avaliações simuladas com citações, autores e ratings
- Botão "Solicitar Visita" (se logado como morador)

### Avaliações Simuladas

- 6 reviews pré-carregados no `data.js`
- Cada review contém: autor, papel, foto (iniciais), rating (1–5 ⭐), texto
- Exibidas no perfil público do prestador

### Perfil do Usuário e Alteração de Foto

- Página `/perfil` (desktop) ou via menu (mobile)
- Exibe dados pessoais do usuário logado
- Upload de foto: converte para data URL e armazena no localStorage
- Foto é exibida no navbar após upload
- Validação: apenas imagens, máx. 1,5 MB
- Para moradores: exibe dados residenciais
- Para prestadores: exibe dados profissionais (bio, serviço, categoria)

### Área "Meus Serviços"

- Exclusiva para prestadores autenticados
- Exibe **calendário mensal** com datas de solicitações
- Mostra **lista de solicitações** recebidas (nome do morador, data, status)
- Status possíveis: "solicitada" (pendente)
- Permite visualizar detalhes de cada solicitação

### Calendário Mensal

- Componente visual mostrando o mês atual
- Datas com solicitações destacadas
- Navegação entre meses (anterior/próximo)
- Click em data mostra solicitações daquele dia
- Integrado com `bookings.js`

### Solicitações de Visita

- Morador: No perfil do prestador, clica em "Solicitar Visita"
- Morador escolhe uma data no calendário do prestador
- Sistema verifica se a data já está ocupada (uma solicitação por dia)
- Se aprovado: solicitação é armazenada e status é "solicitada"
- Prestador vê a solicitação em "Meus Serviços" com dados do morador

---

## 💾 Dados e Armazenamento

### localStorage: Chaves e Estrutura

O projeto usa `localStorage` para simular um banco de dados. As chaves são:

| Chave | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `"usuarioLogado"` | JSON | Usuário autenticado atualmente | `{ id, name, email, type, ... }` |
| `"condoConnectUsers"` | JSON (array) | Contas criadas após cadastro | `[{ id, name, email, ... }]` |
| `"condoConnectProfiles"` | JSON (objeto) | Dados atualizados de perfil (foto, bio) | `{ "1": { photo, bio, ... } }` |
| `"condoConnectServices"` | JSON (array) | Serviços registrados por prestadores | `[{ id, name, providerId, ... }]` |
| `"condoConnectBookings"` | JSON (array) | Solicitações de visita (agendamentos) | `[{ id, providerId, date, resident, ... }]` |

### Dados Iniciais (data.js)

O arquivo `js/data.js` contém dados fictícios pré-carregados:

- **`categories`**: 10 categorias de serviço (Pets, Limpeza, Jardinagem, etc.)
- **`users`**: 5 usuários de exemplo (2 moradores, 3 prestadores)
- **`providers`**: 12 provedores com nome, serviço, rating, reviews, preço
- **`reviews`**: 6 avaliações simuladas

Esses dados **não são modificáveis** pelo usuário; servem como base inicial.

### Relação entre Dados

```
Usuário (user)
  ├─ type: "morador" | "prestador"
  ├─ id: número único
  └─ providerId: (apenas prestadores) → aponta para Provider

Provider (provedor)
  ├─ id: número único
  ├─ name: nome do prestador
  ├─ serviceName: serviço oferecido
  ├─ category: categoria do serviço
  ├─ rating: avaliação média (1–5)
  └─ (possui Service e Reviews associados)

Service (serviço)
  ├─ id: mesmo que Provider.id
  ├─ name: nome do serviço
  ├─ category: categoria
  ├─ providerId: relação com Provider
  └─ price: preço

Review (avaliação)
  ├─ id: número único
  ├─ providerId: relaciona com Provider
  └─ (autor, rating, texto)

Booking (solicitação de visita)
  ├─ id: único
  ├─ providerId: qual prestador
  ├─ serviceId: qual serviço
  ├─ date: data solicitada (YYYY-MM-DD)
  ├─ residentId: qual morador
  └─ status: "solicitada"
```

### Fluxo de Persistência

1. **Cadastro**: Novo usuário é salvo em `condoConnectUsers`
2. **Login**: Usuário é carregado e armazenado em `usuarioLogado`
3. **Foto de Perfil**: Convertida em data URL e salva em `condoConnectProfiles`
4. **Serviço Registrado**: Prestador cria serviço → salvo em `condoConnectServices`
5. **Solicitação de Visita**: Morador clica em data → salvo em `condoConnectBookings`
6. **Logout**: `usuarioLogado` é removido de `localStorage`

---

## ⚠️ Limitações da Versão Atual

### Persistência Limitada

- ✋ Dados existem **apenas no navegador e dispositivo** em que foram criados
- ✋ Não há sincronização entre abas, janelas ou dispositivos diferentes
- ✋ Limpar cache/cookies do navegador **apaga todos os dados**

### Autenticação Simulada

- ✋ Senhas são armazenadas em **plain text** no localStorage (não seguro)
- ✋ Qualquer pessoa com acesso ao console do navegador pode ver as senhas
- ✋ Não há criptografia, tokens JWT, ou sessões seguras
- ✋ Login é apenas uma comparação de email + senha em memória

### Sem Compartilhamento de Dados

- ✋ Dois navegadores/dispositivos diferentes não compartilham contas ou dados
- ✋ Cada usuário é isolado em seu localStorage local
- ✋ Não é um serviço real; é um protótipo single-device

### Sem API ou Back-end

- ✋ Não há servidor processando requisições
- ✋ Não há banco de dados persistente
- ✋ Todos os dados são hardcoded ou armazenados localmente

### Funcionalidades Incompletas

- ⏳ Aceitação/rejeição de solicitações é apenas visual
- ⏳ Avaliações não podem ser criadas pelo usuário (apenas simuladas)
- ⏳ Sem notificações em tempo real
- ⏳ Sem upload real de imagens (apenas conversão em data URL até 1,5 MB)
- ⏳ Sem histórico de transações ou relatórios

---

## 👥 Contas de Demonstração

As contas abaixo são pré-carregadas em `js/data.js` e podem ser usadas imediatamente:

### Moradores

| Nome | Email | Senha | Condomínio |
|---|---|---|---|
| Gabriel Ortiga | gabriel@email.com | 123456 | Residencial Aurora |
| Marina Costa | marina@email.com | 123456 | Parque das Flores |

### Prestadores

| Nome | Email | Senha | Serviço | Condomínio |
|---|---|---|---|---|
| João Silva | joao@email.com | 123456 | Passeador de cães | Residencial Aurora |
| Lucas Mendes | lucas@email.com | 123456 | Suporte técnico | Residencial Aurora |
| Bianca Alves | bianca@email.com | 123456 | Cuidados com pets | Parque das Flores |

**Nota**: Estas são contas fictícias de exemplo apenas para explorar a aplicação. Não representam usuários reais.

---

## 📦 Histórico de Versões

### v1.0.0 — Versão Inicial

**Lançamento**: Primeira versão acadêmica do CondoConnect

**Funcionalidades**:
- Home com categorias e busca
- Cadastro de moradores e prestadores
- Login e autenticação simulada
- Catálogo de serviços com filtros
- Perfil público de prestadores
- Avaliações simuladas

### v1.1.0 — Versão Atual

**Melhorias**:
- ✅ Upload e exibição de foto de perfil
- ✅ Bio profissional para prestadores
- ✅ Calendário mensal para gerenciar solicitações
- ✅ Sistema de solicitação de visita (agendamento)
- ✅ Área "Meus Serviços" para prestadores
- ✅ Validação e feedback visual melhorado

---

## 🔮 Planejamento Futuro

> ⚠️ **Importante**: Esta seção descreve **possibilidades planejadas**, não funcionalidades já implementadas. As decisões tecnológicas ainda não foram definidas.

### Evolução Arquitetural

A separação atual entre dados (`data.js`), lógica (`services.js`, `users.js`, `bookings.js`) e interface (`app.js`) foi projetada para facilitar futuras extensões.

### Possibilidades Tecnológicas Futuras

#### 1. **Substituição de Dados Locais por API REST**

- Migrar `data.js` para respostas de um servidor
- Endpoints possíveis:
  - `GET /api/services` — listar serviços
  - `GET /api/users/:id` — dados do usuário
  - `POST /api/bookings` — criar solicitação
  - `GET /api/bookings/:providerId` — listar solicitações

#### 2. **Banco de Dados Persistente**

- **Possibilidade**: PostgreSQL com tabelas para usuários, prestadores, serviços, avaliações, agendamentos
- Armazenamento centralizador; múltiplos dispositivos compartilham dados

#### 3. **Back-end Web**

- **Possibilidades de tecnologia**:
  - Python com **Flask** (framework leve) ou **Django** (framework completo)
  - JavaScript com **Node.js + Express**
  - Outras: Java Spring, Ruby on Rails, etc.
- Responsabilidades:
  - Autenticação segura (hashing de senhas, JWT)
  - Validação de dados no servidor
  - Persistência em banco de dados
  - Lógica de negócio complexa

#### 4. **Autenticação Segura**

- Substituir plain-text por hashing (bcrypt, argon2)
- Implementar JWT (JSON Web Tokens) ou sessões seguras
- Autenticação social (Google, GitHub)

#### 5. **Experiência Mobile**

- Aplicativo nativo (React Native, Flutter)
- Ou PWA (Progressive Web App) com service workers
- Push notifications para solicitações de visita

#### 6. **Funcionalidades Avançadas**

- Sistema de pagamento (Stripe, PayPal)
- Chat em tempo real entre morador e prestador
- Histórico de transações e relatórios
- Análise de dados e recomendações
- Gamificação (pontos, badges)

### Não São Objetivos Atuais

- ❌ Integração com redes sociais (Facebook login, etc.)
- ❌ Processamento de imagens em larga escala
- ❌ Machine learning ou recomendações automáticas
- ❌ Aplicativo desktop (Electron)
- ❌ Suporte multi-idioma (por enquanto, apenas português)

---

## 📝 Notas Adicionais

### Como o Projeto Demonstra Boas Práticas

1. **Modularização**: Código separado por responsabilidade (dados, serviços, UI)
2. **Sem Dependências Externas**: Funciona com tecnologias padrão do navegador
3. **Responsive Design**: Funciona em mobile, tablet e desktop
4. **Acessibilidade Básica**: Atributos `aria-hidden`, semântica HTML
5. **Comentários em Português**: Código legível para estudantes brasileiros

### Recursos para Aprendizado

- Estude `app.js` para entender o roteamento SPA
- Estude `data.js` para ver como dados são estruturados
- Estude `style.css` para aprender design responsivo com CSS Grid
- Experimente adicionar novas categorias ou prestadores em `data.js`
- Tente criar um novo módulo seguindo o padrão de `services.js`

### Feedback e Contribuições

Se encontrar bugs, tiver sugestões ou quiser expandir o projeto para fins educacionais, considere:

- Abrir uma **Issue** descrevendo o problema
- Criar um **Pull Request** com melhorias
- Documentar novos recursos ou módulos

---

## 📄 Licença

Projeto acadêmico. Livre para uso educacional.

---

**Última atualização**: Setembro de 2026  
**Versão**: 1.1.0  
**Status**: Estável para prototipagem e ensino
