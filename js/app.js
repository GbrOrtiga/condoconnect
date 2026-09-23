import { categories, reviews } from "./data.js";
import { searchServices, filterServices, getServiceById, getServices, saveRegisteredService } from "./services.js";
import { authenticateUser, getLoggedUser, logoutUser, saveLoggedUser, saveRegisteredAccount } from "./users.js";
import { formatCurrency, getElement, getQueryParam } from "./utils.js";

const page = document.body.dataset.page;
const app = getElement("#app");

const icon = (name) => `<span aria-hidden="true">${name}</span>`;

function renderHeader() {
  const sectionLink = (section) => page === "home" ? `#${section}` : `index.html#${section}`;
  const loggedUser = getLoggedUser();
  const navigation = loggedUser ? `<a href="index.html">Home</a><a href="servicos.html">Serviços</a><a href="perfil.html">Meu perfil</a>${loggedUser.type === "prestador" ? `<a href="meus-servicos.html">Meus serviços</a>` : ""}<a href="dashboard.html">Dashboard</a>` : `<a href="${sectionLink("categorias")}">Categorias</a><a href="${sectionLink("servicos")}">Serviços</a><a href="${sectionLink("como-funciona")}">Como funciona</a><a href="${sectionLink("depoimentos")}">Sobre</a>`;
  const actions = loggedUser ? `<span class="user-greeting">Olá, ${loggedUser.name.split(" ")[0]}</span><button class="button button-secondary" id="logout-button" type="button">Sair</button>` : `<a class="button button-secondary" href="login.html">Entrar</a><a class="button button-primary" href="cadastro.html">Cadastrar</a>`;
  return `<header class="site-header"><div class="container nav-bar" id="main-nav"><a class="brand" href="index.html" aria-label="CondoConnect, página inicial"><span class="brand-mark">CC</span><span class="brand-name">Condo<span>Connect</span></span></a><nav class="nav-links" aria-label="Navegação principal">${navigation}</nav><div class="nav-actions">${actions}</div><button class="mobile-menu" id="mobile-menu" aria-label="Abrir menu" aria-expanded="false">☰</button></div></header>`;
}

function renderHero() {
  return `<section class="hero"><div class="container hero-grid"><div><p class="eyebrow">A comunidade que resolve junto</p><h1>Serviços de confiança, <span>bem perto de você.</span></h1><p class="hero-copy">Encontre profissionais talentosos que fazem parte do seu condomínio e facilite a sua rotina com quem você pode confiar.</p><form class="search-box" id="service-search"><span class="search-icon">⌕</span><input id="search-input" type="search" placeholder="O que você precisa hoje?" aria-label="Buscar serviços"><button class="button button-primary" type="submit">Buscar</button></form><div class="hero-note"><strong>● Comunidade verificada</strong><span>Conectando vizinhos com segurança.</span></div></div><div class="hero-visual" aria-label="Destaque de serviços da comunidade"><article class="hero-card hero-card-main"><div class="hero-card-art"><span class="hero-card-tag">EM DESTAQUE</span></div><div class="hero-card-body"><h3>O melhor do seu condomínio</h3><p>Talentos locais, serviços próximos e relações de confiança.</p></div></article><article class="hero-card hero-card-float"><div class="float-row"><span class="avatar">BA</span><div><strong>Bianca Alves</strong><small>Cuidados com pets</small></div><span class="rating">★ 5.0</span></div></article></div></div></section>`;
}

function renderCategories() {
  return `<section class="section" id="categorias"><div class="container"><div class="section-heading"><div><p class="eyebrow">Explore por categoria</p><h2>O que você precisa?</h2><p>Serviços para deixar o dia a dia mais leve.</p></div><a class="button button-quiet" href="servicos.html">Ver todas <span aria-hidden="true">→</span></a></div><div class="category-grid">${categories.map((category) => `<button class="category-card" data-category="${category.id}" type="button"><span class="category-icon">${icon(category.icon)}</span><strong>${category.name}</strong></button>`).join("")}</div></div></section>`;
}

function serviceCard(service) {
  return `<article class="service-card"><div class="service-image ${service.tone}"><span class="service-visual-mark">${icon(service.visual)}</span><span class="service-category">${service.categoryName}</span></div><div class="service-content"><h3>${service.name}</h3><p class="service-description">${service.description}</p><div class="service-meta"><div class="service-provider"><span class="avatar">${service.initials}</span><span>${service.providerName}</span></div><div><div class="service-price">${formatCurrency(service.price)} <small>${service.priceUnit}</small></div><div class="rating">★ ${service.rating}</div></div></div></div></article>`;
}

function renderServices(serviceList = getServices()) {
  const grid = getElement("#service-grid");
  if (!grid) return;
  grid.innerHTML = serviceList.length ? serviceList.map(serviceCard).join("") : `<p class="empty-state">Nenhum serviço encontrado. Tente outra busca.</p>`;
}

function renderServiceSection() {
  return `<section class="section section-tinted" id="servicos"><div class="container"><div class="section-heading"><div><p class="eyebrow">Feitos para sua rotina</p><h2>Serviços em destaque</h2><p>Profissionais avaliados pela própria comunidade.</p></div><a class="button button-secondary" href="servicos.html">Explorar serviços</a></div><div class="service-grid" id="service-grid"></div></div></section>`;
}

function renderHowItWorks() {
  const steps = ["Encontre", "Conheça", "Combine"];
  const descriptions = ["Busque o serviço que você precisa ou explore as categorias.", "Veja avaliações, detalhes e quem está por trás de cada serviço.", "Entre em contato e combine tudo com praticidade."];
  return `<section class="section" id="como-funciona"><div class="container"><div class="section-heading"><div><p class="eyebrow">Simples assim</p><h2>Como o CondoConnect funciona</h2></div></div><div class="feature-grid">${steps.map((step, index) => `<article class="feature-card"><span class="feature-number">0${index + 1}</span><h3>${step}</h3><p>${descriptions[index]}</p></article>`).join("")}</div></div></section>`;
}

function renderTestimonials() {
  return `<section class="section section-tinted" id="depoimentos"><div class="container"><div class="section-heading"><div><p class="eyebrow">Vizinhos recomendam</p><h2>Confiança que circula</h2></div></div><div class="quote-grid">${reviews.map((review) => `<article class="quote-card"><blockquote>“${review.text}”</blockquote><div class="quote-author"><span class="avatar">${review.initials}</span><div><strong>${review.author}</strong><small>${review.role}</small></div></div></article>`).join("")}</div></div></section>`;
}

function renderFooter() {
  return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a class="brand" href="index.html"><span class="brand-mark">CC</span><span class="brand-name">Condo<span>Connect</span></span></a><p class="footer-copy">A plataforma que aproxima talentos e necessidades dentro do seu condomínio.</p></div><div class="footer-column"><h3>CondoConnect</h3><a href="#como-funciona">Como funciona</a><a href="#depoimentos">Sobre nós</a><a href="cadastro.html">Seja um prestador</a></div><div class="footer-column"><h3>Para moradores</h3><a href="servicos.html">Encontrar serviços</a><a href="login.html">Entrar</a><a href="cadastro.html">Criar conta</a></div><div class="footer-column"><h3>Ajuda</h3><a href="#">Central de ajuda</a><a href="#">Segurança</a><a href="#">Contato</a></div></div><div class="footer-bottom">© 2026 CondoConnect. Feito para comunidades mais próximas.</div></div></footer>`;
}

function renderLogin() {
  return `${renderHeader()}<main class="auth-page"><div class="auth-layout container"><section class="auth-intro"><p class="eyebrow">Bem-vindo de volta</p><h1>Sua comunidade está esperando por você.</h1><p>Entre para encontrar serviços, acompanhar seus contatos e aproveitar tudo o que o CondoConnect oferece.</p><div class="auth-highlight"><span>✦</span><div><strong>Conta de demonstração</strong><small>Morador: gabriel@email.com / 123456<br>Prestador: joao@email.com / 123456</small></div></div></section><section class="auth-card"><p class="eyebrow">Acesse sua conta</p><h2>Entrar</h2><p class="auth-subtitle">Use seus dados para continuar.</p><form id="login-form" class="auth-form"><label>Email<input name="email" type="email" placeholder="voce@email.com" autocomplete="email" required></label><label>Senha<div class="password-field"><input name="password" type="password" placeholder="Digite sua senha" autocomplete="current-password" required><button type="button" id="toggle-password" aria-label="Mostrar senha">Mostrar</button></div></label><a class="forgot-link" href="#" id="forgot-password">Esqueci minha senha</a><button class="button button-primary auth-submit" type="submit">Entrar <span aria-hidden="true">→</span></button><p class="form-feedback" id="login-feedback" role="status"></p></form><p class="signin-prompt">Ainda não tem uma conta? <a href="cadastro.html">Criar conta</a></p></section></div></main>${renderFooter()}`;
}

function renderUserProfile() {
  const user = getLoggedUser();
  if (!user) return `${renderHeader()}<main class="profile-page"><div class="container empty-panel"><h1>Entre para acessar seu perfil</h1><p>Faça login para visualizar e editar suas informações.</p><a class="button button-primary" href="login.html">Entrar</a></div></main>${renderFooter()}`;
  const userServices = user.type === "prestador" ? getServices().filter((service) => String(service.providerId) === String(user.providerId)) : [];
  const residence = user.residenceType === "apartamento" ? `Apartamento ${user.apartmentNumber || ""}${user.block ? `, bloco ${user.block}` : ""}` : user.residenceType === "casa" ? `Casa ${user.houseNumber || ""}` : "Não informado";
  return `${renderHeader()}<main class="profile-page"><div class="container"><div class="account-page-heading"><div><p class="eyebrow">Área pessoal</p><h1>Meu perfil</h1><p>Confira e atualize suas informações no CondoConnect.</p></div><span class="account-type-label">${user.type === "prestador" ? "Prestador de serviço" : "Morador"}</span></div><div class="account-layout"><section class="account-card"><div class="account-profile-head"><div class="profile-avatar">${user.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div><div><h2>${user.name}</h2><p>${user.email}</p></div></div><form id="profile-form" class="account-form"><div class="form-row"><label>Nome completo<input name="name" value="${user.name}" required></label><label>Telefone<input name="phone" value="${user.phone || ""}" placeholder="(00) 00000-0000"></label></div><div class="form-row"><label>Email<input value="${user.email}" disabled></label><label>Tipo de conta<input value="${user.type === "prestador" ? "Prestador de serviço" : "Morador"}" disabled></label></div>${user.type === "morador" ? `<div class="account-details"><strong>Residência</strong><span>${user.condominium || "Condomínio não informado"}</span><span>${residence}</span></div>` : ""}<button class="button button-primary" type="submit">Salvar alterações</button><p class="form-feedback" id="profile-feedback" role="status"></p></form></section><aside class="account-card account-summary"><p class="eyebrow">Resumo</p><div><small>Status da conta</small><strong class="status-positive">● Ativa</strong></div><div><small>Participação</small><strong>${user.type === "prestador" ? `${userServices.length} serviço${userServices.length === 1 ? "" : "s"} cadastrado${userServices.length === 1 ? "" : "s"}` : "Morador da comunidade"}</strong></div>${user.type === "prestador" ? `<a class="button button-secondary" href="meus-servicos.html">Gerenciar meus serviços</a>` : `<a class="button button-secondary" href="servicos.html">Encontrar serviços</a>`}</aside></div></div></main>${renderFooter()}`;
}

function renderMyServices() {
  const user = getLoggedUser();
  if (!user || user.type !== "prestador") return `${renderHeader()}<main class="profile-page"><div class="container empty-panel"><h1>Área exclusiva para prestadores</h1><p>Entre com uma conta de prestador para gerenciar seus serviços.</p><a class="button button-primary" href="login.html">Entrar</a></div></main>${renderFooter()}`;
  const ownServices = getServices().filter((service) => String(service.providerId) === String(user.providerId));
  return `${renderHeader()}<main class="catalog-page"><div class="container"><div class="account-page-heading"><div><p class="eyebrow">Área profissional</p><h1>Meus serviços</h1><p>Gerencie o que você oferece para a comunidade.</p></div><button class="button button-primary" id="toggle-service-form" type="button">Adicionar serviço <span aria-hidden="true">+</span></button></div><section class="new-service-panel" id="new-service-panel" hidden><form id="new-service-form" class="signup-form"><div class="form-row"><label>Nome do serviço<input name="name" placeholder="Ex.: Passeador de cães" required></label><label>Categoria<select name="category" required><option value="">Selecione</option>${categories.map((category) => `<option value="${category.id}">${category.name}</option>`).join("")}</select></label></div><div class="form-row"><label>Preço inicial<input name="price" type="number" min="0" required></label><label>Unidade de preço<input name="priceUnit" placeholder="por visita" required></label></div><label>Descrição<textarea name="description" rows="3" required></textarea></label><label>Disponibilidade<input name="availability" placeholder="Ex.: Segunda a sexta" required></label><button class="button button-primary" type="submit">Publicar serviço</button><p class="form-feedback" id="service-feedback" role="status"></p></form></section><div class="provider-grid my-services-grid" id="my-services-grid">${ownServices.length ? ownServices.map(providerCard).join("") : `<p class="empty-state">Você ainda não cadastrou serviços.</p>`}</div></div></main>${renderFooter()}`;
}

function renderSignupV2() {
  return `${renderHeader()}<main class="signup-page"><div class="container signup-layout"><section class="signup-intro"><p class="eyebrow">Faça parte da comunidade</p><h1>Crie sua conta e conecte-se ao seu condomínio.</h1><p>Escolha como você quer participar e preencha apenas as informações necessárias para o seu perfil.</p><div class="signup-benefits"><div><span class="benefit-icon">✓</span><div><strong>Moradores encontram soluções</strong><small>Descubra serviços e profissionais perto de você.</small></div></div><div><span class="benefit-icon">✓</span><div><strong>Prestadores mostram seu talento</strong><small>Crie um perfil profissional para ser encontrado.</small></div></div><div><span class="benefit-icon">✓</span><div><strong>Comece gratuitamente</strong><small>Esta é uma simulação local, sem cadastro real.</small></div></div></div></section><section class="signup-card"><div class="signup-card-heading"><p class="eyebrow">Novo por aqui?</p><h2>Crie sua conta</h2><p>Escolha como você quer participar do CondoConnect.</p></div><div class="account-types" role="radiogroup" aria-label="Tipo de conta"><button class="account-type is-selected" type="button" data-account-type="morador" aria-pressed="true"><span class="account-type-icon">⌂</span><span><strong>Morador</strong><small>Quero encontrar serviços</small></span><span class="account-check">✓</span></button><button class="account-type" type="button" data-account-type="prestador" aria-pressed="false"><span class="account-type-icon">✦</span><span><strong>Prestador de serviço</strong><small>Quero oferecer meu trabalho</small></span><span class="account-check">✓</span></button></div><form id="signup-form-v2" class="signup-form"><input type="hidden" name="accountType" value="morador"><div class="form-row"><label>Nome completo<input name="name" type="text" placeholder="Como podemos chamar você?" required></label><label>Email<input name="email" type="email" placeholder="voce@email.com" required></label></div><div class="form-row"><label>Senha<input name="password" type="password" placeholder="Crie uma senha segura" minlength="6" required></label><label>Confirmar senha<input name="passwordConfirmation" type="password" placeholder="Repita sua senha" minlength="6" required></label></div><div class="resident-fields"><label>Condomínio<input name="condominium" type="text" placeholder="Nome do seu condomínio" required></label><fieldset><legend>Tipo de residência</legend><label class="choice"><input type="radio" name="residenceType" value="casa" checked> Casa</label><label class="choice"><input type="radio" name="residenceType" value="apartamento"> Apartamento</label></fieldset><div id="house-fields"><label>Número da casa<input name="houseNumber" type="text" placeholder="Ex.: 12"></label></div><div id="apartment-fields" hidden><div class="form-row"><label>Bloco<input name="block" type="text" placeholder="Ex.: B"></label><label>Número do apartamento<input name="apartmentNumber" type="text" placeholder="Ex.: 1204"></label></div></div></div><div class="provider-fields" id="provider-fields-v2" hidden><div class="form-row"><label>Telefone<input name="phone" type="tel" placeholder="(00) 00000-0000" required></label><label>Categoria principal<select name="category"><option value="">Selecione uma categoria</option>${categories.map((category) => `<option value="${category.id}">${category.name}</option>`).join("")}</select></label></div><label>Nome do serviço<input name="serviceName" type="text" placeholder="Ex.: Passeador de cães"></label><label>Descrição do serviço<textarea name="serviceDescription" rows="3" placeholder="Descreva brevemente o que você oferece"></textarea></label><div class="form-row"><label>Preço inicial<input name="price" type="number" min="0" step="0.01" placeholder="Ex.: 50"></label><label>Disponibilidade<input name="availability" type="text" placeholder="Ex.: Segunda a sexta"></label></div><label>Foto ou imagem de perfil <span class="label-optional">(opcional)</span><input name="photo" type="file" accept="image/*"></label></div><label class="resident-phone">Telefone <span class="label-optional">(opcional)</span><input name="residentPhone" type="tel" placeholder="(00) 00000-0000"></label><label class="terms-check"><input name="terms" type="checkbox" required><span>Li e concordo com os <a href="#">termos de uso</a> e a política de privacidade.</span></label><button class="button button-primary signup-submit" type="submit">Criar conta <span aria-hidden="true">→</span></button><p class="form-feedback" id="signup-feedback" role="status"></p></form><p class="signin-prompt">Já possui uma conta? <a href="login.html">Entrar</a></p></section></div></main>${renderFooter()}`;
}

function renderServiceBrowser() {
  return `${renderHeader()}<main class="catalog-page"><div class="container"><div class="catalog-heading"><div><p class="eyebrow">Marketplace da comunidade</p><h1>Encontre o serviço ideal para você.</h1><p>Pesquise por serviço, categoria ou prestador e encontre alguém perto.</p></div><span class="catalog-count" id="catalog-count"></span></div><div class="catalog-search"><span>⌕</span><input id="catalog-search-input" type="search" placeholder="O que você está procurando?" aria-label="Pesquisar serviços"></div><div class="catalog-layout"><aside class="filters-panel"><div class="filter-heading"><strong>Filtre os resultados</strong><button type="button" id="clear-filters">Limpar</button></div><label>Categoria<select id="filter-category"><option value="todos">Todas as categorias</option>${categories.map((category) => `<option value="${category.id}">${category.name}</option>`).join("")}</select></label><label>Faixa de preço<select id="filter-price"><option value="todos">Qualquer preço</option><option value="30">Até R$ 30</option><option value="30-50">R$ 30 - R$ 50</option><option value="50-100">R$ 50 - R$ 100</option><option value="100+">Acima de R$ 100</option></select></label><label>Avaliação<select id="filter-rating"><option value="todas">Todas as avaliações</option><option value="4">4 estrelas ou mais</option><option value="45">4,5 estrelas ou mais</option></select></label></aside><section class="catalog-results"><div class="category-pills"><button class="category-pill is-active" type="button" data-catalog-category="todos">Todos</button>${categories.map((category) => `<button class="category-pill" type="button" data-catalog-category="${category.id}">${category.name}</button>`).join("")}</div><div class="provider-grid" id="provider-grid"></div></section></div></div></main>${renderFooter()}`;
}

function providerCard(service) {
  return `<article class="provider-card"><div class="provider-card-image ${service.tone}"><span class="provider-initials">${service.initials}</span><span class="provider-category">${service.categoryName}</span></div><div class="provider-card-content"><div class="provider-card-title"><div><h2>${service.providerName} ${service.verified ? `<span class="verified-badge" title="Prestador verificado">✓</span>` : ""}</h2><p>${service.name}</p></div><span class="provider-rating">★ ${service.rating}</span></div><p class="provider-card-description">${service.description}</p><div class="provider-card-meta"><strong>${formatCurrency(service.price)}</strong><small>${service.priceUnit}</small><a class="button button-secondary" href="prestador.html?id=${service.providerId}">Ver perfil</a></div></div></article>`;
}

function renderProviderProfile() {
  const service = getServiceById(getQueryParam("id")) || getServices()[0];
  const providerReviews = reviews.filter((review) => review.providerId === service.providerId);
  const provider = { name: service.providerName, initials: service.initials, serviceName: service.name, categoryName: service.categoryName, verified: service.providerId !== 6 && service.providerId !== 8 && service.providerId !== 11, rating: service.rating, reviewCount: providerReviews.length || 1, price: service.price, priceUnit: service.priceUnit, description: service.description, availability: service.providerId === 1 ? ["Segunda", "Quarta", "Sexta"] : ["Segunda a sexta"] };
  return `${renderHeader()}<main class="profile-page"><div class="container"><a class="back-link" href="servicos.html">← Voltar para serviços</a><section class="profile-hero"><div class="profile-avatar">${provider.initials}</div><div class="profile-heading"><p class="eyebrow">Perfil do prestador</p><h1>${provider.name} ${provider.verified ? `<span class="verified-label">✓ Verificado</span>` : ""}</h1><p>${provider.serviceName} · ${provider.categoryName}</p><div class="profile-rating">★ ${provider.rating} <span>(${provider.reviewCount} avaliações)</span></div></div><button class="button button-primary contact-button" id="contact-provider" type="button">Entrar em contato</button></section><div class="profile-grid"><section class="profile-main"><div class="profile-section"><p class="eyebrow">Sobre o serviço</p><h2>${provider.serviceName}</h2><p>${provider.description}</p></div><div class="profile-section"><p class="eyebrow">Avaliações</p><div class="review-list">${(providerReviews.length ? providerReviews : [{ author: "Comunidade CondoConnect", initials: "CC", rating: provider.rating, text: "Este prestador está começando a receber avaliações da comunidade." }]).map((review) => `<article class="review-item"><div class="review-item-head"><span class="avatar">${review.initials}</span><div><strong>${review.author}</strong><small>★ ${review.rating}</small></div></div><p>${review.text}</p></article>`).join("")}</div></div></section><aside class="profile-side"><div class="profile-info-card"><div><small>Preço</small><strong>${formatCurrency(provider.price)}</strong><span>${provider.priceUnit}</span></div><div><small>Disponibilidade</small><strong class="availability-list">${provider.availability.map((day) => `<span>${day}</span>`).join("")}</strong></div></div></aside></div></div></main>${renderFooter()}`;
}

function renderSignup() {
  return `${renderHeader()}<main class="signup-page"><div class="container signup-layout"><section class="signup-intro"><p class="eyebrow">Faça parte da comunidade</p><h1>Crie sua conta e conecte-se ao seu condomínio.</h1><p>Encontre soluções para a sua rotina ou compartilhe o seu talento com pessoas que estão por perto.</p><div class="signup-benefits"><div><span class="benefit-icon">✓</span><div><strong>Comunidade mais próxima</strong><small>Descubra profissionais e oportunidades dentro do seu condomínio.</small></div></div><div><span class="benefit-icon">✓</span><div><strong>Perfil do seu jeito</strong><small>Você escolhe se quer contratar serviços ou oferecer o seu trabalho.</small></div></div><div><span class="benefit-icon">✓</span><div><strong>Comece gratuitamente</strong><small>Crie seu cadastro agora e explore a plataforma.</small></div></div></div></section><section class="signup-card"><div class="signup-card-heading"><p class="eyebrow">Novo por aqui?</p><h2>Crie sua conta</h2><p>Escolha como você quer participar do CondoConnect.</p></div><div class="account-types" role="radiogroup" aria-label="Tipo de conta"><button class="account-type is-selected" type="button" data-account-type="morador" aria-pressed="true"><span class="account-type-icon">⌂</span><span><strong>Morador</strong><small>Quero encontrar serviços</small></span><span class="account-check">✓</span></button><button class="account-type" type="button" data-account-type="prestador" aria-pressed="false"><span class="account-type-icon">✦</span><span><strong>Prestador de serviço</strong><small>Quero oferecer meu trabalho</small></span><span class="account-check">✓</span></button></div><form id="signup-form" class="signup-form"><input type="hidden" id="account-type" name="accountType" value="morador"><div class="form-row"><label>Nome completo<input name="name" type="text" placeholder="Como podemos chamar você?" required></label><label>Email<input name="email" type="email" placeholder="voce@email.com" required></label></div><div class="form-row"><label>Senha<input name="password" type="password" placeholder="Crie uma senha segura" minlength="6" required></label><label>Confirmar senha<input name="passwordConfirmation" type="password" placeholder="Repita sua senha" minlength="6" required></label></div><div class="form-row"><label>Condomínio<input name="condominium" type="text" placeholder="Nome do seu condomínio" required></label><label>Apartamento<input name="apartment" type="text" placeholder="Ex.: 1204" required></label></div><label>Telefone <span class="label-optional">(opcional)</span><input name="phone" type="tel" placeholder="(00) 00000-0000"></label><div class="provider-fields" id="provider-fields" hidden><label>Área de atuação<input name="serviceArea" type="text" placeholder="Ex.: jardinagem, beleza ou tecnologia"></label><label>Conte um pouco sobre o seu serviço<textarea name="serviceDescription" rows="3" placeholder="Descreva brevemente o que você oferece"></textarea></label></div><label class="terms-check"><input name="terms" type="checkbox" required><span>Li e concordo com os <a href="#">termos de uso</a> e a política de privacidade.</span></label><button class="button button-primary signup-submit" type="submit">Criar conta <span aria-hidden="true">→</span></button><p class="form-feedback" id="form-feedback" role="status"></p></form><p class="signin-prompt">Já possui uma conta? <a href="login.html">Entrar</a></p></section></div></main>${renderFooter()}`;
}

function bindHomeEvents() {
  const searchForm = getElement("#service-search");
  const searchInput = getElement("#search-input");
  searchForm?.addEventListener("submit", (event) => { event.preventDefault(); renderServices(searchServices(searchInput.value)); getElement("#servicos")?.scrollIntoView({ behavior: "smooth" }); });
  document.querySelectorAll("[data-category]").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll("[data-category]").forEach((item) => item.classList.remove("is-active")); button.classList.add("is-active"); renderServices(getServices().filter((service) => service.category === button.dataset.category)); getElement("#servicos")?.scrollIntoView({ behavior: "smooth" }); }));
  const menu = getElement("#mobile-menu");
  menu?.addEventListener("click", () => { const navigation = getElement("#main-nav"); const isOpen = navigation.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(isOpen)); });
}

function bindSignupEvents() {
  const typeInput = getElement("#account-type");
  const providerFields = getElement("#provider-fields");
  document.querySelectorAll("[data-account-type]").forEach((button) => button.addEventListener("click", () => {
    const isProvider = button.dataset.accountType === "prestador";
    document.querySelectorAll("[data-account-type]").forEach((item) => { item.classList.toggle("is-selected", item === button); item.setAttribute("aria-pressed", String(item === button)); });
    typeInput.value = button.dataset.accountType;
    providerFields.hidden = !isProvider;
    providerFields.querySelectorAll("input, textarea").forEach((field) => { field.required = isProvider; });
  }));
  getElement("#signup-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const feedback = getElement("#form-feedback");
    const password = form.elements.password.value;
    const confirmation = form.elements.passwordConfirmation.value;
    if (password !== confirmation) { feedback.className = "form-feedback is-error"; feedback.textContent = "As senhas precisam ser iguais."; form.elements.passwordConfirmation.focus(); return; }
    feedback.className = "form-feedback is-success";
    feedback.textContent = `Cadastro de ${typeInput.value === "prestador" ? "prestador" : "morador"} simulado com sucesso. A próxima etapa será conectar este formulário ao back-end.`;
    form.reset();
    typeInput.value = "morador";
    providerFields.hidden = true;
    document.querySelector('[data-account-type="morador"]')?.click();
  });
  const menu = getElement("#mobile-menu");
  menu?.addEventListener("click", () => { const navigation = getElement("#main-nav"); const isOpen = navigation.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(isOpen)); });
}

function bindLoginEvents() {
  const form = getElement("#login-form");
  const menu = getElement("#mobile-menu");
  menu?.addEventListener("click", () => { const navigation = getElement("#main-nav"); const isOpen = navigation.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(isOpen)); });
  getElement("#toggle-password")?.addEventListener("click", (event) => {
    const password = form.elements.password;
    const showing = password.type === "text";
    password.type = showing ? "password" : "text";
    event.currentTarget.textContent = showing ? "Mostrar" : "Ocultar";
  });
  getElement("#forgot-password")?.addEventListener("click", (event) => { event.preventDefault(); getElement("#login-feedback").textContent = "A recuperação de senha será conectada ao back-end futuramente."; });
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = getElement("#login-feedback");
    const user = authenticateUser(form.elements.email.value, form.elements.password.value);
    if (!user) { feedback.className = "form-feedback is-error"; feedback.textContent = "Email ou senha incorretos. Use uma conta de demonstração."; return; }
    const safeUser = saveLoggedUser(user);
    feedback.className = "form-feedback is-success";
    feedback.textContent = `Login realizado. Olá, ${safeUser.name}!`;
    window.location.assign(safeUser.type === "prestador" ? `prestador.html?id=${safeUser.providerId || 1}` : "servicos.html");
  });
}

function bindSignupV2Events() {
  const form = getElement("#signup-form-v2");
  const typeButtons = document.querySelectorAll("[data-account-type]");
  const residenceFields = getElement(".resident-fields");
  const providerFields = getElement("#provider-fields-v2");
  const phone = getElement(".resident-phone");
  const residenceType = () => form.elements.residenceType.value;
  const updateResidence = () => { getElement("#house-fields").hidden = residenceType() !== "casa"; getElement("#apartment-fields").hidden = residenceType() !== "apartamento"; };
  const updateAccountType = (type) => {
    const isProvider = type === "prestador";
    typeButtons.forEach((button) => { const selected = button.dataset.accountType === type; button.classList.toggle("is-selected", selected); button.setAttribute("aria-pressed", String(selected)); });
    form.elements.accountType.value = type;
    residenceFields.hidden = isProvider;
    phone.hidden = isProvider;
    providerFields.hidden = !isProvider;
    residenceFields.querySelectorAll("input, select").forEach((field) => { field.required = !isProvider && field.name === "condominium"; });
    providerFields.querySelectorAll("input, select, textarea").forEach((field) => { field.required = isProvider && ["phone", "category", "serviceName", "serviceDescription", "price", "availability"].includes(field.name); });
  };
  typeButtons.forEach((button) => button.addEventListener("click", () => updateAccountType(button.dataset.accountType)));
  form.querySelectorAll("input[name='residenceType']").forEach((radio) => radio.addEventListener("change", updateResidence));
  updateResidence();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = getElement("#signup-feedback");
    if (form.elements.password.value !== form.elements.passwordConfirmation.value) { feedback.className = "form-feedback is-error"; feedback.textContent = "As senhas precisam ser iguais."; return; }
    const isProvider = form.elements.accountType.value === "prestador";
    const accountId = Date.now();
    const account = { id: accountId, name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), password: form.elements.password.value, type: form.elements.accountType.value, phone: isProvider ? form.elements.phone.value.trim() : form.elements.residentPhone.value.trim(), condominium: isProvider ? "" : form.elements.condominium.value.trim(), residenceType: isProvider ? "" : form.elements.residenceType.value, houseNumber: isProvider ? "" : form.elements.houseNumber.value.trim(), block: isProvider ? "" : form.elements.block.value.trim(), apartmentNumber: isProvider ? "" : form.elements.apartmentNumber.value.trim(), providerId: isProvider ? accountId : null };
    saveRegisteredAccount(account);
    if (isProvider) { const selectedCategory = categories.find((category) => category.id === form.elements.category.value); saveRegisteredService({ id: accountId, name: form.elements.serviceName.value.trim(), category: form.elements.category.value, categoryName: selectedCategory?.name || "Outros", price: Number(form.elements.price.value), priceUnit: "a partir de", rating: 0, providerId: accountId, providerName: account.name, initials: account.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase(), description: form.elements.serviceDescription.value.trim(), visual: "✦", tone: "" }); }
    feedback.className = "form-feedback is-success";
    feedback.textContent = `Cadastro de ${form.elements.accountType.value} salvo localmente. Você já pode entrar com seus dados.`;
  });
  const menu = getElement("#mobile-menu");
  menu?.addEventListener("click", () => { const navigation = getElement("#main-nav"); const isOpen = navigation.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(isOpen)); });
}

function bindCatalogEvents() {
  const queryInput = getElement("#catalog-search-input");
  const grid = getElement("#provider-grid");
  const renderResults = () => {
    const textResults = searchServices(queryInput.value);
    const filtered = filterServices(textResults, { category: getElement("#filter-category").value, price: getElement("#filter-price").value, rating: getElement("#filter-rating").value });
    grid.innerHTML = filtered.length ? filtered.map(providerCard).join("") : `<p class="empty-state">Nenhum prestador encontrado com esses filtros.</p>`;
    getElement("#catalog-count").textContent = `${filtered.length} ${filtered.length === 1 ? "serviço encontrado" : "serviços encontrados"}`;
  };
  [queryInput, getElement("#filter-category"), getElement("#filter-price"), getElement("#filter-rating")].forEach((control) => control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderResults));
  document.querySelectorAll("[data-catalog-category]").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll("[data-catalog-category]").forEach((item) => item.classList.remove("is-active")); button.classList.add("is-active"); getElement("#filter-category").value = button.dataset.catalogCategory; renderResults(); }));
  getElement("#clear-filters")?.addEventListener("click", () => { queryInput.value = ""; getElement("#filter-category").value = "todos"; getElement("#filter-price").value = "todos"; getElement("#filter-rating").value = "todas"; document.querySelectorAll("[data-catalog-category]").forEach((item) => item.classList.toggle("is-active", item.dataset.catalogCategory === "todos")); renderResults(); });
  const menu = getElement("#mobile-menu");
  menu?.addEventListener("click", () => { const navigation = getElement("#main-nav"); const isOpen = navigation.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(isOpen)); });
  renderResults();
}

function bindProfileEvents() {
  const menu = getElement("#mobile-menu");
  menu?.addEventListener("click", () => { const navigation = getElement("#main-nav"); const isOpen = navigation.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(isOpen)); });
  getElement("#contact-provider")?.addEventListener("click", () => window.alert("O contato será implementado quando o back-end estiver conectado."));
}

function bindUserProfileEvents() {
  const form = getElement("#profile-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = getLoggedUser();
    const storedUsers = JSON.parse(localStorage.getItem("condoConnectUsers") || "[]");
    const updatedUser = { ...user, name: form.elements.name.value.trim(), phone: form.elements.phone.value.trim() };
    const index = storedUsers.findIndex((item) => item.id === user.id);
    if (index >= 0) { storedUsers[index] = { ...storedUsers[index], ...updatedUser }; localStorage.setItem("condoConnectUsers", JSON.stringify(storedUsers)); }
    saveLoggedUser(updatedUser);
    getElement("#profile-feedback").className = "form-feedback is-success";
    getElement("#profile-feedback").textContent = "Alterações salvas localmente.";
  });
  const menu = getElement("#mobile-menu");
  menu?.addEventListener("click", () => { const navigation = getElement("#main-nav"); const isOpen = navigation.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(isOpen)); });
}

function bindMyServicesEvents() {
  const panel = getElement("#new-service-panel");
  getElement("#toggle-service-form")?.addEventListener("click", () => { panel.hidden = !panel.hidden; });
  getElement("#new-service-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const user = getLoggedUser();
    const selectedCategory = categories.find((category) => category.id === form.elements.category.value);
    const newService = { id: Date.now(), name: form.elements.name.value.trim(), category: form.elements.category.value, categoryName: selectedCategory?.name || "Outros", price: Number(form.elements.price.value), priceUnit: form.elements.priceUnit.value.trim(), rating: 0, providerId: user.providerId, providerName: user.name, initials: user.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase(), description: form.elements.description.value.trim(), visual: "✦", tone: "" };
    saveRegisteredService(newService);
    getElement("#my-services-grid")?.insertAdjacentHTML("afterbegin", providerCard(newService));
    getElement("#service-feedback").className = "form-feedback is-success";
    getElement("#service-feedback").textContent = "Serviço salvo localmente e adicionado à sua lista.";
    form.reset();
  });
  const menu = getElement("#mobile-menu");
  menu?.addEventListener("click", () => { const navigation = getElement("#main-nav"); const isOpen = navigation.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(isOpen)); });
}

function bindSessionEvents() {
  getElement("#logout-button")?.addEventListener("click", () => { logoutUser(); window.location.href = "index.html"; });
}

function renderHome() {
  app.innerHTML = `${renderHeader()}${renderHero()}${renderCategories()}${renderServiceSection()}${renderHowItWorks()}${renderTestimonials()}${renderFooter()}`;
  renderServices();
  bindHomeEvents();
}

if (app) {
  app.dataset.initialized = "true";
  app.dataset.page = page || "unknown";
  if (page === "home") renderHome();
  if (page === "login") { app.innerHTML = renderLogin(); bindLoginEvents(); }
  if (page === "cadastro") { app.innerHTML = renderSignupV2(); bindSignupV2Events(); }
  if (page === "servicos") { app.innerHTML = renderServiceBrowser(); bindCatalogEvents(); }
  if (page === "prestador") { app.innerHTML = renderProviderProfile(); bindProfileEvents(); }
  if (page === "perfil") { app.innerHTML = renderUserProfile(); bindUserProfileEvents(); }
  if (page === "meus-servicos") { app.innerHTML = renderMyServices(); bindMyServicesEvents(); }
  bindSessionEvents();
}
