Mini-Description
-------------
This site has two pages: /calculate and /history. Calculate Page counts the fibonacci number with given index and saves IP, time, date, entered index number and result. History Page shows what the first one saved in database. This database is MySQL. Logic of site implemented in NodeJS. That's all.

Dependencies
-------------
1. NodeJS
2. MySQL
3. Docker (optional)

Install (Docker)
-------------
0. Did you install Docker & Docker Compose, didn't it? I hope you did.
1. Download [release](https://github.com/crazzymad777/fib/releases) and extract files.
2. `cd` into installation directory.
3. `docker-compose up`
4. Open page http://localhost:3000/

Install (without Docker)
-------------
0. First of all, we suppose you install dependencies (NodeJS, MySQL). Check: `nodejs --version; mysql --version`. There output should be two strings with versions.
1. Download [release](https://github.com/crazzymad777/fib/releases) and extract files.
2. `cd` into installation directory.
3. `npm install && cd frontend && npm install`
4. For MySQL create user/database or use existing. You should import `db/queries.sql`. It contains exactly one table `queries`.
4. `cp .env.example .env`
5. Edit `.env` file, set proper values of variables.
6. `npm start`
7. Open page http://localhost:3000/
