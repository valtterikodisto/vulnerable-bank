LINK: https://github.com/valtterikodisto/vulnerable-bank

INSTRUCTIONS (check README for markdown file):
To run the application you will need to install node and npm. You can check your versions in the following way:

node -v # Mine is v12.14.0
npm -v # Mine is 6.13.4

You can install node and npm with curl on Ubuntu in the following way:

Ubuntu
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

macOS (Homebrew)
brew install node

macOS (bash)
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|._>node-(._)\.pkg</a>.\*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"

Windows
Download the Windows Installer from the website https://nodejs.org

For others https://nodejs.org/en/download/package-manager

FLAW 1:
OWASP A2: Broken Authentication
An attacker can easily brute force user passwords by sending unlimited amount of POST request to /login.

How to fix?
These kind of attacks can be easily avoided by having some sort of blocking. For example you can set a maximum number of subsequent invalid login attemps for a user. Another way is to log the IP address of the client and limit the requests. However this can easily be bypassed if the the attacker changes his / her IP address.

FLAW 2:
OWASP A3: Sensitive Data Exposure
The web application uses HTTP to send user credentials. An attacker can potentially capture this HTTP traffic and get complete access to victims account since all the traffic is unencrypted. If a database leak happens all the passwords are stored in plain text which is a huge security issue.

How to fix?
The app should use HTTPS so the traffic is more resistant to eavesdropping. Passwords should be hashed so the attacker can not obtain passwords easily. Hash function is a one-way function which is easy to compute on every input but hard to get the input from output of the function. A popular way to hash your passwords is to use bcrypt. To combat the use of rainbow tables, you can also salt your passwords. A salt is a random data that is also hashed with the actual password and thus two same passwords should not have the same hash. Users can potentially use very poor passwords that are easy to guess or brute force. In these scenarios you could a pepper. A pepper is a secret (unlike salt) that is added to the hashing function.

FLAW 3:
OWASP A5: Broken Access Control
After user logs in we need to make sure we "remember" the current user. We do this by setting a cookie to user's browser which has the user's unique id. When user performs a transaction we check the logged user from the cookie. User can very easily obtain another users id from the transaction form. When an attacker has the victims id he can easily make transactions as the victim.

How to fix?
The problem with the current approach is that it is very easy to obtain the id of the user. Much safer alternative is to use for example jsonwebtoken. Tokens are safer since they can securely transmit information between client and server. It is very easy to check if the token is valid but it is very difficult to guess.

FLAW 4:
OWASP A7: Cross-Site Scripting (XSS)
When a user registers to Vulnerable Bank he / she gets to choose a username. This username will be shown on every users homepage since there is a form which has all the usernames and they happen to be unescaped. An attacker can register to the site with a username that contains a script to wipe out every users bank account. When the victim logs in to the home page the script executes.

How to fix?
The web application uses pug to render the HTML. There is a option select which contains option tags. These option tags are all unescaped so the easy fix is to escape the by removing '!=' from the tag. Pug does the escaping automatically so it is harder for you to accidentally allow XSS on your site.

FLAW 5:
OWASP A10: Insufficient Logging & Monitoring
When a user performs a transaction there is absolutely no logging for it. This is extremely bad for example when we try to understand already happened attack. We could not even identify the person who got all the assets since we do not have a transaction history or logging. Also if the system happens to restart we would lose all our logs since they are all printed to console.

How to fix?
We should definitely log all our transaction so that we could track the assets. If the person sends malicious code we would like to know who sent it (IP adress), when did he send it and how did he send it. So there should also be logs for cases like that. Also all the logs are currently printed to console. A better alternative would be to save the logs to a file which can be examine afterwards.
