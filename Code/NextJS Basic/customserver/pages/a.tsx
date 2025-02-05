import React, { useEffect } from "react";
import { useRouter } from 'next/router';

// # Custom server / Dùng router.beforePopState
const A: React.FC = () => {
    const router = useRouter()
    useEffect(() => {
        // beforePopState xử lý trước khi xử lý sự kiện popstate navigate đi trang khác
        // Nhận vào hàm có object: url là router for new state, as là url trên browser(có TH giá trị khác cái url), options là options của router.push
        router.beforePopState(({ url, as, options }) => {
            console.log(url);
            console.log(as);
            console.log(options);
            // Nếu returns false, Next.js router sẽ k xử lý popstate mà ta phải tự xử lý

            if (as !== '/') {
                // VD: ở đây ta xử lý kiểu, nếu người dùng navigate bằng 2 cái button của browser thì nếu trang là "/" thì sẽ k có tác dụng, nhưng trang là "/a" thì sẽ chuyển sang đúng trang a
                // Vì return false thì router k xử lý nên k chuyển trang gì hết, return true thì next/router vẫn sẽ xử lý chuyển trang
                // Thông thường ta ít khi thao tác với 2 cái button navigate của browser nên ít dùng tới

                // window.location.href = as // Ở dưới return false tức là next/rouer sẽ k xử lý navigate page theo cấu trúc thư mục nữa nhưng ta vẫn có thể chủ động navigate nó như này và chỉ muốn bỏ qua các xử lý khác của next/router thôi

                return false
            }
        
            return true
        })
    }, [])
    return(
        <>
            <div>A</div>
            <button onClick={() => router.push("/")}>Click</button>
        </>
    )
}

export default A;