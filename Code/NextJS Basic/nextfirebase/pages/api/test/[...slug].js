// # Dùng pages/api
// Catch all url: dạng pages/test/<bất kỳ>

export default function handler(req, res) {
    const { slug } = req.query
    res.end(`Post: ${slug.join(', ')}`)
}