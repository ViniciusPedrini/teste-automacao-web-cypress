# Automação Web com Cypress — Automation Exercise

Suíte de testes end-to-end que automatiza 10 casos de teste do site de prática [Automation Exercise](https://www.automationexercise.com/test_cases), seguindo o passo a passo descrito na página oficial de casos de teste.

## Sumário

- [Pré-requisitos e versões](#pré-requisitos-e-versões)
- [Instalação](#instalação)
- [Como executar os testes](#como-executar-os-testes)
- [Pipeline (GitHub Actions)](#pipeline-github-actions)
- [Casos de teste automatizados](#casos-de-teste-automatizados)
- [Estrutura do projeto](#estrutura-do-projeto)

## Pré-requisitos e versões

| Ferramenta | Versão utilizada | Observação |
|---|---|---|
| [Node.js](https://nodejs.org/) | v25.9.0 | Cypress 13 exige Node 18, 20 ou superior. Versões LTS (20 ou 22) são recomendadas. O CI usa a versão do arquivo `.nvmrc` (20). |
| npm | 11.12.1 | Instalado junto com o Node.js. |
| [Cypress](https://www.cypress.io/) | 13.7.3 | Declarado como `^13.7.3` no `package.json`. |
| Navegador | Electron 118 (embutido no Cypress) | Chrome também é suportado (`npm run test:chrome`). |
| Sistema operacional | macOS (Darwin) | Também funciona em Windows e Linux. |

## Instalação

```bash
# 1. Clone o projeto (ou copie a pasta) e entre nele
cd teste-automacao-web-cypress

# 2. Instale as dependências (baixa o pacote do Cypress)
npm install

# 3. Baixe o binário do Cypress, se ainda não estiver instalado
npx cypress install

# 4. (Opcional) Confirme que a instalação está correta
npx cypress verify
```

## Como executar os testes

| Comando | O que faz |
|---|---|
| `npm test` | Executa todos os specs em modo headless (Electron) e imprime o resumo final. |
| `npm run test:chrome` | Igual ao anterior, usando o Chrome. |
| `npm run test:auth` | Só TC01 a TC05 (cadastro, login, logout). |
| `npm run test:products` | Só TC08 e TC09 (produtos e busca). |
| `npm run test:subscription` | Só TC10 (assinatura de newsletter). |
| `npm run test:checkout` | Só TC15 e TC16 (pedido completo). |
| `npm run lint` | Valida o código com ESLint e `eslint-plugin-cypress` (também roda no CI). |
| `npm run lint:fix` | Corrige automaticamente o que for possível. |
| `npm run cy:open` | Abre o Test Runner interativo do Cypress. |
| `npm run cy:run` | Executa o `cypress run` com o navegador padrão. |

## Pipeline (GitHub Actions)

O workflow [`.github/workflows/cypress.yml`](.github/workflows/cypress.yml) roda toda a suíte em dois cenários:

- **Automático:** a cada Pull Request aberto, atualizado ou reaberto contra `main` ou `master`. PRs em rascunho são ignorados, e um novo commit cancela a execução anterior do mesmo PR.
- **Manual:** na aba **Actions**, escolha **Testes E2E (Cypress)** e clique em **Run workflow**. É possível escolher o navegador (`electron`, `chrome`, `firefox` ou `edge`) e, opcionalmente, um spec específico. Deixando o spec vazio, roda todos.

Ao final, o resumo de testes que passaram e falharam aparece no **Summary** do job. Os screenshots de falha e o relatório ficam como artifacts por 14 dias.

## Casos de teste automatizados

Os nomes dos testes seguem a numeração da [página de casos de teste](https://www.automationexercise.com/test_cases).

| ID | Spec | Descrição resumida |
|---|---|---|
| **TC01** | `auth.cy.js` | **Registrar usuário.** Cadastro completo pela UI (dados pessoais, endereço e opt-ins), validação de "Account Created", usuário logado e exclusão da conta. |
| **TC02** | `auth.cy.js` | **Login com dados corretos.** Usuário criado via API, login pela UI, validação de "Logged in as" e exclusão da conta. |
| **TC03** | `auth.cy.js` | **Login com dados incorretos.** Valida a mensagem "Your email or password is incorrect!" e que o usuário não foi autenticado. |
| **TC04** | `auth.cy.js` | **Logout.** Login seguido de logout, com redirecionamento para `/login` e sessão encerrada. |
| **TC05** | `auth.cy.js` | **Registrar com e-mail já existente.** Valida a mensagem "Email Address already exist!" e que o cadastro não avança. |
| **TC08** | `products.cy.js` | **Todos os produtos e detalhe do produto.** Valida a lista de produtos e, na página de detalhe, nome, categoria, preço, disponibilidade, condição e marca. |
| **TC09** | `products.cy.js` | **Buscar produto.** Pesquisa por nome, valida "Searched Products" e que todos os resultados são relacionados ao termo. |
| **TC10** | `subscription.cy.js` | **Assinatura na home.** Preenche o e-mail no rodapé e valida "You have been successfully subscribed!". |
| **TC15** | `checkout.cy.js` | **Pedido: cadastrar antes do checkout.** Cadastro, carrinho com 2 produtos, endereço, revisão do pedido, pagamento, confirmação e exclusão da conta. |
| **TC16** | `checkout.cy.js` | **Pedido: login antes do checkout.** Usuário criado via API, login, carrinho, checkout, pagamento, confirmação e exclusão da conta. |

## Estrutura do projeto

```
cypress.config.js                       configuração (baseUrl, timeouts, screenshots, retries, blockHosts)
eslint.config.mjs                       regras de lint
cypress/
├── e2e/automation-exercise/            specs (um arquivo por funcionalidade)
│   ├── auth.cy.js                      TC01–TC05
│   ├── products.cy.js                  TC08, TC09
│   ├── subscription.cy.js              TC10
│   └── checkout.cy.js                  TC15, TC16
├── fixtures/                           massa de dados estática (cartão, produtos, pedido)
├── plugins/testSummaryReporter.js      resumo final: o que passou e o que falhou
└── support/
    ├── actions/                        application actions via UI (navegação, auth, conta, produtos, checkout)
    ├── api/userApi.js                  application actions via API (criar/remover usuário)
    ├── api/cartApi.js                  application actions via API (adicionar produtos ao carrinho)
    ├── assertions/pageAssertions.js    asserções reutilizáveis entre os specs
    ├── factories/userFactory.js        geração de usuários únicos por execução
    ├── hooks/globalHooks.js            tratamento de erros de terceiros, screenshot e limpeza de dados
    ├── selectors/index.js              mapa central de seletores
    ├── routes.js                       rotas da aplicação centralizadas
    └── e2e.js                          carregado automaticamente antes de cada spec
```
