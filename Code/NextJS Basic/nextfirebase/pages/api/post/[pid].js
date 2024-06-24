// # Dùng pages/api
// Dùng với dynamic router
export default function handler(req, res) {
    const { pid } = req.query
    res.end(`Post: ${pid}`)
}