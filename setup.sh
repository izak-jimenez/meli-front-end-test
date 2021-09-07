# Run this bash file to setup the application in Unix

echo "Installing dependencies..."
npm i
cd client
npm i
echo "Building client application..."
npm run build
cd ..
echo "Initializaing application..."
npm run init