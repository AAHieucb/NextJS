import React, { useState } from "react"
import dynamic from "next/dynamic"

// # Dynamic import
const DynamicComponent = dynamic(() => import('./DynamicImport1'));
const DynamicHello = dynamic(() => 
	import('./DynamicImport2').then(component => component.Hello),
    {
    	loading: () => <p>Loading...</p>
	}
);
const DynamicHi = dynamic(() => 
	import('./DynamicImport2').then(component => component.Hi),
    {
    	ssr: false
	}
);

// Nếu ta cho điều kiện và import nó kiểu bình thường (k dùng dynamic) thì nó sẽ load file ngay
// VD: dùng import Component bth và chơi kiểu {show && <Component/>} thì nếu Component chưa hiển thị, nó vẫn sẽ load file js đó

// Khi 1 file được import lần thứ 2 thì cái dynamic import vô dụng vì nó load rồi thì còn dynamic gì nữa (nên k cần dùng dynamic import cùng 1 file)
// Ở case này server chạy vào sẽ load luôn DynamicImport2 nên vc cản vói ssr: false ở DynamicHi k có tác dụng. Nếu xóa DynamicHello đi sẽ thấy server kbh log ra "Y" tức kbh load vào DynamicImport2 vì ta chặn ssr nó r, client phải tự request file đó khi render tới và tự xử lý mọi thứ

const DynamicImport = () => {
    const [show, setShow] = useState(false);
    console.log("X");
    // Ở đây, file DynamicImport1 được load ngay vì cần hiển thị nhưng DynamicImport2 thì chưa.
    // Chỉ khi phải thực sự render ra component DynamicHello, browser mới bắt đầu tải file js DynamicImport2 về
    
    return(
        <div>
            <DynamicComponent/>
            {show && <DynamicHello/>}
            {show && <DynamicHi/>}
            <button onClick={() => setShow(true)}>Show</button>
        </div>
    )
};

export default DynamicImport;