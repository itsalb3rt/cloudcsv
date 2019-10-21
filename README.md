<center>
<img src="https://i.imgur.com/BwKm56Q.png" />
</center>

---

CloudCSV is a Open source web application for the storage of dynamic CSV files, user management, email notifications and more ...

**Auth**
- User Registration
- Login
- Password recovery

**Data treatment**

- CSV file data upload
- Check the data already uploaded

**Settings**

- Section to specify the delimited csv files
	- Eat (,)
	- Semicolon ( ; )
	- Tabulation
	- Pipe (|)
	- Automatic

**Database access settings for creating the table to which the data will be uploaded**

- Section to establish the credentials of the database
- Section for creating and editing the database

Mail setting for sending password recovery emails.
Mail settings to notify when data is uploaded
Notification mail and password recovery will be saved in the config file


**Development tools**

- [Vue-cli](https://vuejs.org/ "Vue-cli")
	- [Vuex](https://vuex.vuejs.org/ "Vuex")
	- [Vue route](https://router.vuejs.org/ "Vue route")
	- [Papaparse CSV parse Javascript](https://www.papaparse.com/ "Papaparse CSV parse Javascript")

- [Vuetify (UI)](https://vuetifyjs.com "Vuetify (UI)")
- [PHP (Framework Ligne Api Rest)](https://ligne-framework.gitbook.io/ligne-framework-php/ "PHP (Framework Ligne Api Rest)")

**Depdendencys**
- [Config_lite (Edit ini files System)](https://packagist.org/packages/pear/config_lite "Config_lite (Edit ini files System)")
	- Email and password settings
	- Database credentials
	- Allow the registration of new users

- [Phpmailer](https://packagist.org/packages/phpmailer/phpmailer "Phpmailer")
- [Ingenerator/tokenista](https://packagist.org/packages/ingenerator/tokenista "Ingenerator/tokenista")

**Database**
 - Postgres

Authentication will be based on Tokens, the token will be stored in the database and validated if the token corresponds to the users, the token must be self-generated every time the user logs on.
Records cannot be deleted if you do not migrate to a deletion table, when a main table is modified, the deletion table should be modified, only when a column is created.
