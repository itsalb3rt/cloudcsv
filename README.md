<div align="center">
	<img src="https://i.imgur.com/BwKm56Q.png" />
</div>


CloudCSV is a Open source web application for the storage all CSV file data into your data base from a friendly graphical interface for non-technical people, user management, email notifications and more ...

## Index

- [:computer: App Interface](#app-interface)
- [🤔 What can be done in this application ?](#what-can-be-done-in-this-application)
- [:wrench: Development tools](#development-tools)
	- [Front-end](#front-end)
	- [Back-end](#back-end)
- [:blue_book: How to install on my own server](#how-to-install-on-my-own-server)
	- [Front-end implementation](#front-end-implementation)
	- [Back-end implementation](#back-end-implementation)
	- [Database](#database-postgres)
- [:whale:Docker](#docker)


## App interface

> **Create a table**

![Create a table](https://i.imgur.com/Rj4AWlj.png)

> **Main app Settings**

![Main Settings](https://i.imgur.com/kDqxmiC.png)

> **Upload data**

![Upload data](https://i.imgur.com/yYrcJmU.png)

> **Data Query**

![Data Query](https://i.imgur.com/ZWpGJ2K.png)


**[⬆ Back to Index](#index)**

### What can be done in this application

**Auth**
- User Registration
- Login
- Password recovery (Via Email)

**Data treatment**

- CSV file data upload
	- When you try upload new data file into a table, the app validate if the file have same columns of the table.
	- Define the file delimiter
- Get a report of data upload

**Settings**

- Multi language app
- SMTP email configuration in app
- Notification via email when user upload data or delete any record, you choose
- User management for admins
- Create, edit or delete dynamics tables data base for keep organize your data

**[⬆ Back to Index](#index)**

## Development tools

#### Front-end

- [Vue-cli](https://vuejs.org/ "Vue-cli")
	- [Vuex](https://vuex.vuejs.org/ "Vuex")
	- [Vue route](https://router.vuejs.org/ "Vue route")
	- [Papaparse CSV parse Javascript](https://www.papaparse.com/ "Papaparse CSV parse Javascript")

- [Vuetify (UI)](https://vuetifyjs.com "Vuetify (UI)")

#### Back-end

- [PHP (Framework Ligne Api Rest)](https://ligne-framework.gitbook.io/ligne-framework-php/ "PHP (Framework Ligne Api Rest)")
- [Http Foundation](https://packagist.org/packages/symfony/http-foundation)
- - The HttpFoundation component defines an object-oriented layer for the HTTP specification.
- [ConfigFileManager (Edit ini files System)](https://github.com/ghalambaz/ConfigFileManager "ConfigFileManager (Edit ini files System)")
	- Email and password settings
	- Database credentials
	- Allow the registration of new users

- [Phpmailer](https://packagist.org/packages/phpmailer/phpmailer "Phpmailer")
- - Email send
- [Ingenerator/tokenista](https://packagist.org/packages/ingenerator/tokenista "Ingenerator/tokenista")
- - Generate a unique token with time mark, for example for account recovery
- [Email Validator](https://packagist.org/packages/egulias/email-validator)

#### Database
 - Postgres >= 9.6


**[⬆ Back to Index](#index)**

## How to install on my own server

#### :exclamation: Requirements

- PHP >= 7.2
- Composer >= 1.8
- Postgres SQL >= 9.6
- Vue-Cli >= 4.0
- NodeJs >= 10.14

<br>

#### Front-end implementation


```bash
$ git clone https://github.com/itsalb3rt/cloudcsv.git
# After cd cloudcsv
$ npm install
```

All setings in `.env` file in root dir

> This ref to you API implementation without the final slash ( / );

```env
VUE_APP_BASE_URL_DEV=http://localhost/cloudcsv_api
VUE_APP_BASE_URL_PRO=http://localhost:8018/cloudcsv_api
```

#### Back-end implementation

**PHP extensions required**;
- pdo_pgsql 


```bash
$ git clone https://github.com/itsalb3rt/cloudcsv_api.git
#After cd cloudcsv_api
$ composer install
```

After run `composer install` go to `system/config/config.php.ini` file and put your `postgres` auth information.


### Database Postgres

In the `API` dir, go to file in `etc/init_db.sql` copy this script an run in your database;

**:warning:IMPORTANT**: Make a sure the `dbname` and `prefix` is same on you `API config` file and you database instance;

Example:

```ini
dbname=cloudcsv
prefix=public.
```
> Please include the dot ( . ) in the final of the `prefix`


---

# :tada: Now you system is ready!

# Docker

By default the App and the API is ready for used with docker;

**App**

```bash
$ git clone https://github.com/itsalb3rt/cloudcsv.git
# After cd cloudcsv
$ docker-compose up
```

**API**

```bash
$ git clone https://github.com/itsalb3rt/cloudcsv_api.git
#After cd cloudcsv_api
$ docker-compose up
```

Now go to http://localhost:8017 and is done :tada:

---
## Extra information

Authentication will be based on Tokens, the token will be stored in the database and validated if the token corresponds to the users, the token must be self-generated every time the user logs on.

Into `API/etc` dir you have a `Adobe XD` project and `UML`  dir `StarUML` project. feel free to modicate this and send you suggestion.

---

## Contribute

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Start making changes