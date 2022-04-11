# NaiveMind
A web client for demo human expertise AI models.

# Building the demo
## Clone this repo
```git
git clone https://github.com/Mpendulo1/naivemind.git
```
Folder structure within the the root of the repo should look as seen below

![showing initial repo folder structure](https://github.com/Mpendulo1/naivemind/blob/master/initial-repo-structure.png?raw=true)

## Add dependencies
Navigate to the `client` folder to add the react app dependencies by running the command below

📂-client/
```
yarn install
```
Once done, navigate to the `server` folder and execute the same command to add dependencies for the server app.

📂-server/
```
yarn install
```

## Add dotnev files
Manually add a dotenv file to the react and server application folders to keep our secrets
### On UNIX terminal emulators
📂-client/
```bash
touch .env
```
📂-server/
```bash
touch .env
```
-Secrests to be sent over more secure channels-

Add the dotenv files at the root of the directories - see image below

![showing repo folder structure with env files](https://github.com/Mpendulo1/naivemind/blob/master/repo-structure-with-envs.png?raw=true)

## Test react application
📂-client/
```
yarn start
```
After filling in the client app dotenv file with the correct details, running the command above from the root of the client should open a browser tab at 🔗localhost:3000 with welcome screen shown below

![showing react app screenshot](https://github.com/Mpendulo1/naivemind/blob/master/react-app-snapshot.png?raw=true)

## Test server application
📂-server/
```
yarn run server
```
After filling in the server app dotenv file with its correct details, running the command above should confirm connection to a mongodb instance and server listening on port 5000

![showing terminal](https://github.com/Mpendulo1/naivemind/blob/master/server-app-snapshot.png?raw=true)

## Run app
📂-server/
```
yarn run dev
```
Run the command above from the root of the server folder to run the client and server apps concurrently. 

> :warning: **If you are using npm**: The app may fail to run because of discrepancies in the way _yarn_ and _npm_ handle relative paths! Use yarn to ensure the app works.

| WARNING: Also, if you wish or have to change the server port number, remember to also change it on the proxy setting in the client app's package.json! |
| --- |

# Additional features implemented
- [x] store simulation data in MongoDB
- [x] authenticate users before given access to database
- [x] process batched scenarios - implemented but buggy
- [x] allow user to pick any model - implemented but also buggy




