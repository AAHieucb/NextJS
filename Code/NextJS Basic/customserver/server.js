// # Custom server

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

// when using middleware `hostname` and `port` must be provided below. Còn k chỉ cần truyền dev là môi trường thôi
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`. This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      console.log(parsedUrl);
      const { pathname, query } = parsedUrl

      // Để fetch được, buộc phải dùng đúng if else như dưới. Đầu tiên khi request vào 1 page nó sẽ chạy vào await handle(req, res, parsedUrl) 
      // render ra đúng page ta cần. Nhưng sau đó nó sẽ gọi request đến các file static chunk và cần await handle(req, res, parsedUrl) xử lý

      // Nếu ta enable router theo file system mặc định thì chỉ cần await handle(req, res, parsedUrl) là đủ r. Nhưng nếu k enable điều đó thì buộc 
      // phải làm thủ công như dưới
      if (pathname === '/') { 
        await app.render(req, res, '/', query)
      } else if(pathname === "/a"){
        await app.render(req, res, '/a', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})