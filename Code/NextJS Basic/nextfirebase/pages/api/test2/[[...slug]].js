// # Dùng pages/api
// Optionally catch all url: dạng pages/test/<bất kỳ>
// Khi dùng dạng này thì dù k có params nào thì nó vẫn bắt, còn cái trước sẽ báo trang trống

export default function handler(req, res) {
    try{
        const { slug } = req.query
        res.end(`Post: ${slug.join(', ')}`) // k có params nào slug.join sẽ lỗi catch bên dưới gửi lại lỗi
    } catch(e){
        res.status(500).send({ error: 'failed' })
    }
}