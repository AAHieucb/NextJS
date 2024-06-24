// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// # Dùng pages/api / Request Helper
export default function handler(req, res) {
  console.log(req.cookies);
  console.log(req.query);
  console.log(req.body);
  if(req.method == "GET"){
    res.status(200).json({ name: 'John Doe' })
  }
}

// Có thể override config default API router
export const config = {
  api: {
    // bodyParser: false, // auto enabled, muốn bỏ thì set false là được
    bodyParser: { 
      sizeLimit: '1mb', // maximum size allow for parsed body
    },

    // responseLimit: false, // automatically enabled và báo warning khi response quá 4mb
    responseLimit: '8mb', 

    externalResolver: true // explicit flag tells the server that this route is being handled by an external resolver like express
    // or connect. Enabling this option disables warnings for unresolved requests.
  },
}