1) install bower http://bower.io/
npm install -g bower

2) Add bower to the Windows PATH variable
C:\Users\michelf\AppData\Roaming\npm

3) Execute bower in the client directory



Server Setup:
1) pull
2) npm install
3) bower install
4) node bin

cd C:\dev\repo\
npm install

cd C:\dev\repo\client
bower install

C:\dev\repo\
modify secret in conf

cd C:\dev\repo\bin
setx NODE_ENV production || set NODE_ENV=production || $env:NODE_ENV="production" (for power shell)
node www

