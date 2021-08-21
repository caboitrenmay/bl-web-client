npm run build && 
pm2 delete static-page-server-5000 && pm2 -f serve dist --spa --port 5000
