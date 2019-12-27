# Vulnerable Bank

## Run the application

### Install node & npm

To run the application you will need to install `node` and `npm`. You can check your versions in the following way:

```bash
node -v # Mine is v12.14.0
npm -v # Mine is 6.13.4
```

#### Linux (Ubuntu)

You can install node and npm with curl on Ubuntu in the following way:

```bash
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```

#### macOS

With Homebrew:

```bash
brew install node
```

With bash:

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|._>node-(._)\.pkg</a>.\*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

#### Windows

Download the Windows Installer from the [nodejs.org web site](https://nodejs.org)

#### Others

For others [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)

### Install dependencies

Clone the project and navigate to the project. You will need to install dependencies before you can run the app.

```bash
git clone https://github.com/valtterikodisto/vulnerable-bank
cd vulnerable-bank
npm install # Install the dependencies
```

### Run the application

To run the application, run the following in the project root:

```
npm start
```

## OWASP Top 10 Web Application Security Risks

### A2: Broken Authentication

- Easy to brute force login credentials via `/login`

### A3: Sensitive Data Exposure

- Uses HTTP only so username and password can be easily captured (e.g `wireshark`)
- Passwords are stored in plain text

### A5: Broken Access Control

- Easy to access another user's account with the user id

### A7: Cross-Site Scripting (XSS)

- Easy to XSS with username

### A10: Insufficient Logging & Monitoring

- No logging for transactions which makes it easy to steal assets
