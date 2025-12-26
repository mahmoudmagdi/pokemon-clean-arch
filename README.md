<div align="center">

<img src="./docs/pokeball.png" alt="Poké Ball" width="100" />

# Pokémon Clean Architecture (Next.js App Router)

A production-style **Clean Architecture** demo built with **Next.js App Router**, using **PokeAPI** (remote) + *
*PostgreSQL/Prisma** (local) for **Favorites** and a **7-day Pokémon details cache**.  
Includes **email/password auth** with an **httpOnly cookie session**, **Suspense + skeleton UI**, **TypeScript strict**,
and **Zod** validation.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-316192?logo=postgresql)
![Zod](https://img.shields.io/badge/Zod-Validation-3068b7)
![License](https://img.shields.io/github/license/mahmoudmagdi/pokemon-clean-arch)
![Repo Stars](https://img.shields.io/github/stars/mahmoudmagdi/pokemon-clean-arch?style=social)

<br/>

📖 **Medium article:**  
Clean Architecture for Frontend with Next.js App Router — A Practical Pokédex Case Study  
[Medium URL](https://khlafawi.medium.com/clean-architecture-for-frontend-with-next-js-app-router-a-practical-pok%C3%A9dex-case-study-45c1eb8e08d4)

</div>

---

## ✨ What this project demonstrates

✅ Clean Architecture applied to a modern **frontend-fullstack** Next.js app  
✅ Stable API contracts via **`/app/api/*`** (BFF proxy style)  
✅ Two data sources:

- 🌐 **Remote**: PokeAPI (no keys)
- 🗄️ **Local**: PostgreSQL (Favorites + cached Pokémon details)

✅ Cache policy: **refresh Pokémon details if older than 7 days**  
✅ Auth: **email/password** + **httpOnly cookie** session  
✅ UI: **Suspense + skeletons** for fast perceived performance  
✅ Type safety: **TypeScript strict** + **Zod**  
✅ No Server Actions: **all mutations are Route Handlers** (`/app/api/*`)

---

## 🧠 Architecture Overview

This repo uses three layers:

### 1) Domain (core rules)

- Entities (e.g., `Pokemon`, `User`)
- Use-cases (business actions)
- Repository interfaces (contracts)

**No Next.js, no Prisma, no implementation details.**

### 2) Data (implementations)

- Prisma repositories (DB)
- Remote services (PokeAPI)
- Local services (Favorites + Cache)
- DTOs + mappers
- Cache policy enforcement
- DI container (composition root)

### 3) Presentation (UI)

- Pages / views / widgets
- Skeletons + Suspense boundaries
- SessionProvider (client auth state)
- HTTP helpers

---

## 🗂️ Project Structure

```txt
app/
  (public)/                 # Public routes (login/register/pokemon pages)
  (app)/                    # Auth-required routes (favorites, etc.)
  api/                      # Stable API contracts (BFF proxy)
    auth/                   # login/register/session/logout
    pokemon/                # list + details proxy endpoints
    favorites/              # favorites endpoints (cookie auth)
libs/
  domain/                   # Entities, repo interfaces, use-cases (pure TS)
  data/                     # Prisma, services, repo impls, mappers, DI
  presentation/             # Views, widgets, skeletons, session provider
prisma/
  schema.prisma             # Postgres schema (User, Favorite, PokemonCache)
````

---

## 🔁 Data Flow (end-to-end)

### Fetch Pokémon details (with DB cache)

<img src="./docs/fetch-pokemon-details.png" alt="Poké Ball" width="1080" />

### Favorites (cookie-authenticated)

<img src="./docs/favorites.png" alt="Poké Ball" width="1080" />


---

## 🔐 Authentication model

* `POST /api/auth/login` sets an **httpOnly cookie** (e.g., `pokedex_token`)
* `GET /api/auth/session` returns `{ isLoggedIn, user }`
* A client `SessionProvider` keeps UI state in sync:

    * `refresh()` → re-checks session
    * `syncAfterLogin()` → call after login/register
    * `logout()` → clears cookie and updates state

Why httpOnly cookies?

* Client JS never reads your JWT
* Safer by default
* Works naturally for server rendering + API routes

---

## 🧪 Type safety and validation (Zod)

We validate external input at boundaries:

* PokeAPI responses → parsed/validated DTO → mapped to domain entity
* Auth requests (login/register) → validated body before use-cases
* DB payloads (if JSON stored) → validated before mapping

Example pattern:

```ts
import {z} from "zod";

export const PokemonDetailsDtoSchema = z.object({
    name: z.string(),
    id: z.number(),
    sprites: z.object({
        front_default: z.string().nullable(),
    }),
});

export type PokemonDetailsDto = z.infer<typeof PokemonDetailsDtoSchema>;
```

---

## 🚀 Running the project locally

### 1) Requirements

* Node.js 18+ (recommended 20+)
* Docker (recommended for Postgres) or a local Postgres installation

### 2) Clone

```bash
git clone https://github.com/mahmoudmagdi/pokemon-clean-arch.git
cd pokemon-clean-arch
```

### 3) Install dependencies

```bash
npm install
```

### 4) Create `.env`

Copy the example env file:

```bash
cp .env.example .env
```

Set values in `.env`:

* `DATABASE_URL=...`
* `AUTH_SECRET=...` (any long random string)

Example `AUTH_SECRET` generation:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5) Start PostgreSQL (Docker)

```bash
docker run -d \
  --name pokedex-postgres \
  -p 5432:5432 \
  -e POSTGRES_DB=pokedex_db \
  -e POSTGRES_USER=pokedex_user \
  -e POSTGRES_PASSWORD=pokedex_password \
  -v pokedex_pg_data:/var/lib/postgresql/data \
  postgres:16
```

Then set `DATABASE_URL` accordingly:

```env
DATABASE_URL="postgresql://pokedex_user:pokedex_password@localhost:5432/pokedex_db?schema=public"
```

### 6) Run Prisma migrations

```bash
npx prisma migrate dev
```

### 7) Start Next.js

```bash
npm run dev
```

Open:

* [http://localhost:3000](http://localhost:3000)

---

## 🧩 Key routes

### Pages

* `/pokemon` → list
* `/pokemon/[name]` → details
* `/favorites` → favorites (requires login)
* `/login`, `/register`

### API (stable contracts)

* `GET /api/pokemon/list?limit=30&offset=0`
* `GET /api/pokemon/[name]`
* `GET /api/favorites`
* `POST /api/favorites` (add)
* `DELETE /api/favorites/[name]`
* `POST /api/auth/login`
* `POST /api/auth/register`
* `GET /api/auth/session`
* `POST /api/auth/logout`

---

## 🧱 How Clean Architecture is enforced in code

### Domain: only interfaces + use-cases

Example (simplified):

```ts
// libs/domain/repositories/PokemonRepo.ts
export interface PokemonRepo {
    list(limit: number, offset: number): Promise<{ items: { name: string }[]; nextOffset: number | null }>;

    getByName(name: string): Promise<{ pokemon: Pokemon; cached: boolean }>;
}
```

```ts
// libs/domain/usecases/pokemon/GetPokemonDetails.ts
export class GetPokemonDetails {
    constructor(private readonly repo: PokemonRepo) {
    }

    execute(name: string) {
        return this.repo.getByName(name);
    }
}
```

### Data: implementations + DI container

```ts
// libs/data/di/container.ts
let _container: { useCases: any } | null = null;

export function getContainer() {
    if (_container) return _container;

    // Instantiate Prisma client, services, repos
    // Wire use-cases with repo interfaces
    _container = {useCases: {/* ... */}};

    return _container;
}
```

### Presentation: UI calls stable APIs + uses session provider

```ts
// libs/presentation/state/SessionProvider.tsx
// loads /api/auth/session and exposes isLoggedIn/user
```

---

## 📄 License

This project is licensed under the terms in the `LICENSE` file.

---

## 🙌 Credits

* Pokémon data powered by **PokeAPI**: [https://pokeapi.co/](https://pokeapi.co/)

---

## 🤝 Contributing

PRs and suggestions are welcome:

* improvements to the architecture explanation
* additional tests
* UI polish (shadcn/ui)
* more use-cases / features (teams, categories, etc.)
