# ProjetWebS6

<h3>Author:</h3>

&nbsp;Quang Viet NGUYEN<br>
&nbsp;Charles LUCAS

<h3>Description:</h3>

<p>This is an webapp project for the Advanced Web Programming course in EFREI Paris.<br>

The webapp is used to manage a library. Any user who wishes to use library service will have to register an account and use this account to check and borrow books.<br>

Library admins can add books and modify their information into the library. Furthermore, they can also check lending history and verify the return of books.</p>

<h3>How to use</h3>

<p>First of all, after getting the source code, you have to set up the server. In the terminal, open the server folder and use `npm i` to install all dependencies.<br>

Afterward, set up a schema in MySQL, then modifying the database configuration in `./server/src/database/config/config.js`.<br>

Create the tables by using `npn run start`. Once the tables have been created, exit npm.<br>

Run the following scripts in this order to populate some test entries in the database:
<code>
npm run devinituser
npm run devinitbook
npm run devinitcart
</code>

Afterward, keep the database running by using `npn run start` again.<br>

For the client, go into client folder and run `npm i` to install all dependencies. Run `npm run dev` to start the client. Access the link provided on the client script to open the webapp.
</p>