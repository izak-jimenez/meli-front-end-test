:: Run this batch file to setup the fullstack application in Windows

call npm i
call cd client
call npm i
call npm run build
call cd ..
call npm run init
pause