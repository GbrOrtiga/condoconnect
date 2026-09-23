// Fonte única dos dados simulados. Será substituída por respostas da API futuramente.
export const categories = [
	{ id: "pets", name: "Pets", icon: "✦" },
	{ id: "limpeza", name: "Limpeza", icon: "✧" },
	{ id: "jardinagem", name: "Jardinagem", icon: "❋" },
	{ id: "tecnologia", name: "Tecnologia", icon: "⌘" },
	{ id: "automotivo", name: "Automotivo", icon: "◈" },
	{ id: "manutencao", name: "Manutenção", icon: "⚒" },
	{ id: "educacao", name: "Educação", icon: "A+" },
	{ id: "alimentacao", name: "Alimentação", icon: "⌁" },
	{ id: "beleza", name: "Beleza", icon: "✿" },
	{ id: "outros", name: "Outros", icon: "•••" }
];

export const users = [
	{ id: 1, name: "Gabriel Ortiga", email: "gabriel@email.com", password: "123456", type: "morador", condominium: "Residencial Aurora" },
	{ id: 2, name: "João Silva", email: "joao@email.com", password: "123456", type: "prestador", phone: "(11) 98888-1001", condominium: "Residencial Aurora", providerId: 1 },
	{ id: 3, name: "Marina Costa", email: "marina@email.com", password: "123456", type: "morador", condominium: "Parque das Flores" },
	{ id: 4, name: "Lucas Mendes", email: "lucas@email.com", password: "123456", type: "prestador", phone: "(11) 97777-2202", condominium: "Residencial Aurora", providerId: 2 },
	{ id: 5, name: "Bianca Alves", email: "bianca@email.com", password: "123456", type: "prestador", phone: "(11) 96666-3303", condominium: "Parque das Flores", providerId: 3 }
];

export const providers = [
	{ id: 1, name: "João Silva", role: "Cuidados com pets", initials: "JS", verified: true, rating: 4.9, reviewCount: 28, serviceName: "Passeador de cães", category: "pets", price: 25, priceUnit: "por passeio", availability: ["Segunda", "Quarta", "Sexta"], description: "Passeios individuais de até 40 minutos dentro do condomínio." },
	{ id: 2, name: "Lucas Mendes", role: "Tecnologia", initials: "LM", verified: true, rating: 4.9, reviewCount: 22, serviceName: "Suporte para computador", category: "tecnologia", price: 80, priceUnit: "por hora", availability: ["Terça", "Quinta", "Sábado"], description: "Instalação, configuração e pequenos reparos em computadores." },
	{ id: 3, name: "Bianca Alves", role: "Cuidados com pets", initials: "BA", verified: true, rating: 5.0, reviewCount: 19, serviceName: "Cuidados para pets", category: "pets", price: 35, priceUnit: "por visita", availability: ["Todos os dias"], description: "Cuidado atencioso para seu pet se exercitar com segurança." },
	{ id: 4, name: "Mariana Oliveira", role: "Limpeza residencial", initials: "MO", verified: true, rating: 4.8, reviewCount: 41, serviceName: "Limpeza residencial", category: "limpeza", price: 120, priceUnit: "por diária", availability: ["Segunda", "Quarta", "Sexta"], description: "Limpeza cuidadosa para apartamentos e casas do condomínio." },
	{ id: 5, name: "Rafael Nunes", role: "Jardinagem", initials: "RN", verified: true, rating: 4.8, reviewCount: 34, serviceName: "Manutenção de jardim", category: "jardinagem", price: 60, priceUnit: "por visita", availability: ["Terça", "Quinta"], description: "Seu jardim bonito e saudável com manutenção regular." },
	{ id: 6, name: "Carlos Mendes", role: "Manutenção", initials: "CM", verified: false, rating: 4.7, reviewCount: 16, serviceName: "Manutenção elétrica", category: "manutencao", price: 80, priceUnit: "a partir de", availability: ["Segunda a sábado"], description: "Pequenos reparos elétricos, tomadas, lâmpadas e instalações." },
	{ id: 7, name: "Fernanda Rocha", role: "Automotivo", initials: "FR", verified: true, rating: 4.9, reviewCount: 31, serviceName: "Lavagem de veículos", category: "automotivo", price: 45, priceUnit: "por veículo", availability: ["Sábado", "Domingo"], description: "Lavagem prática do seu carro sem precisar sair do condomínio." },
	{ id: 8, name: "Paulo Henrique", role: "Educação", initials: "PH", verified: false, rating: 4.6, reviewCount: 12, serviceName: "Aulas de matemática", category: "educacao", price: 70, priceUnit: "por hora", availability: ["Segunda a sexta"], description: "Aulas particulares para alunos do ensino fundamental e médio." },
	{ id: 9, name: "Juliana Martins", role: "Beleza", initials: "JM", verified: true, rating: 4.9, reviewCount: 25, serviceName: "Manicure e pedicure", category: "beleza", price: 50, priceUnit: "por atendimento", availability: ["Quarta a sábado"], description: "Atendimento com hora marcada no conforto da sua casa." },
	{ id: 10, name: "André Luiz", role: "Alimentação", initials: "AL", verified: true, rating: 4.8, reviewCount: 18, serviceName: "Marmitas caseiras", category: "alimentacao", price: 28, priceUnit: "por unidade", availability: ["Segunda a sexta"], description: "Comida caseira fresquinha para facilitar a sua semana." },
	{ id: 11, name: "Patrícia Souza", role: "Limpeza", initials: "PS", verified: false, rating: 4.5, reviewCount: 9, serviceName: "Organização de ambientes", category: "limpeza", price: 100, priceUnit: "por sessão", availability: ["Terça e quinta"], description: "Organização de armários e ambientes para uma rotina mais leve." },
	{ id: 12, name: "Diego Ferreira", role: "Manutenção", initials: "DF", verified: true, rating: 4.7, reviewCount: 20, serviceName: "Montagem de móveis", category: "manutencao", price: 90, priceUnit: "a partir de", availability: ["Sábado e domingo"], description: "Montagem e ajustes de móveis com cuidado e agilidade." }
];

export const services = [
	...providers.map((provider) => ({ id: provider.id, name: provider.serviceName, category: provider.category, categoryName: categories.find((category) => category.id === provider.category)?.name || provider.category, price: provider.price, priceUnit: provider.priceUnit, rating: provider.rating, providerId: provider.id, providerName: provider.name, initials: provider.initials, description: provider.description, visual: provider.category === "pets" ? "✦" : provider.category === "tecnologia" ? "⌘" : provider.category === "jardinagem" ? "❋" : "◈", tone: provider.category === "pets" ? "pink" : provider.category === "jardinagem" ? "green" : "" }))
];

export const reviews = [
	{ id: 1, providerId: 1, author: "Ana Paula", role: "Moradora há 3 anos", initials: "AP", rating: 5, text: "O João foi muito cuidadoso e pontual com a Mel. Recomendo demais!" },
	{ id: 2, providerId: 1, author: "Carlos Reis", role: "Morador", initials: "CR", rating: 4, text: "Passeio tranquilo e comunicação excelente." },
	{ id: 3, providerId: 2, author: "Marina Costa", role: "Moradora", initials: "MC", rating: 5, text: "Resolveu meu problema com o computador no mesmo dia." },
	{ id: 4, providerId: 5, author: "Diego Ramos", role: "Morador", initials: "DR", rating: 5, text: "Meu jardim ficou muito mais bonito depois da manutenção." },
	{ id: 5, providerId: 4, author: "Carolina Reis", role: "Moradora", initials: "CR", rating: 4, text: "Serviço caprichado e muito organizado." },
	{ id: 6, providerId: 9, author: "Fernanda Lima", role: "Moradora", initials: "FL", rating: 5, text: "Atendimento ótimo e resultado impecável." }
];
