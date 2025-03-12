# instamint

_Si vous avez des soucis de crendentials vous pouvez nous contacter_

## Prérequis

Assurez-vous d'avoir les logiciels suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 18.x ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)
- [Prisma CLI](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-cli)
- [PostgreSql](https://www.postgresql.org/)
- [Docker](https://www.docker.com/products/docker-desktop/)

### Lancer le service Gateway

```
cd gateway
```

**Créer une base de données pour la gateway sur PostgreSQL**

```
touch .env
```

remplir le .env avec le .env.sample

##### Installer les dépendances

```
npm install
```

##### Migrer la base de données

```
npx prisma migrate deploy
```

##### Installer les dépendances

```
npx prisma generate
```

##### Lancer le projet

```
npm run dev
```

### Lancer l'application Instamint

```
cd application
```

```
touch .env
```

remplir le .env avec le .env.sample

```
NEXT_PUBLIC_API_BASEURL : correspond à l'url de l'api Gateway
```

Pour generer une clé pour l'environement de variable AUTH_SECRET utiliser la commande :

```
 openssl rand -base64 32
```

##### Installer les dépendances

```
npm install
```

##### Lancer le projet

```
npm run dev
```

### Lancer le service Minter

```
cd minters
```

**Créer une base de données pour Minter sur PostgreSQL**

```
touch .env
```

remplir le .env avec le .env.sample

##### Installer les dépendances

```
npm install
```

##### Migrer la base de données

```
npx prisma migrate deploy
```

##### Installer les dépendances

```
npx prisma generate
```

##### Lancer le projet

```
npm run dev
```

### Lancer le service Notification

```
cd notifications-service
```

```
touch .env
```

Pour générer les crendential de pour l'envoie de mail : il faut utiliser Azure communication et le sub domaine est gratuit
remplir le .env avec le .env.sample

##### Installer les dépendances

```
npm install
```

##### Lancer le projet

```
npm run dev
```

### Lancer le service Kafka

```
cd kafka
docker compose up
```

```
cd kafka
touch .env
```

remplir le .env avec le .env.sample

```
npm install
```

```
npm run dev
```

### Lancer le service ContentManagmentService

```
cd content-managment-service
```

**Créer une base de données pour ContentManagmentService sur PostgreSQL**

```
touch .env
```

remplir le .env avec le .env.sample

##### Installer les dépendances

```
npm install
```

##### Migrer la base de données

```
npx prisma migrate deploy
```

##### Installer les dépendances

```
npx prisma generate
```

##### Lancer le projet

```
npm run dev
```

### Lancer le service NFT

```
cd nft-service
```

**Créer une base de données pour ContentManagmentService sur NFT**

[Documentation pour obtenir les crendatials](https://instamint1.atlassian.net/wiki/spaces/~601d22088fb6ea014ad8ac0a/pages/23625729/Azure+key+vault)

```
touch .env
```

remplir le .env avec le .env.sample

##### Installer les dépendances

```
npm install
```

##### Migrer la base de données

```
npx prisma migrate deploy
```

##### Installer les dépendances

```
npx prisma generate
```

##### Lancer le projet

```
npm run dev
```
# Instamint
