npm run build &&
pm2 delete static-page-server-5000 && pm2 -f serve build --spa --port 5000
