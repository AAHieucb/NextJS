import { useQuery, useQueryClient } from "react-query";

export const getData = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const data = await fetch("http://localhost:4000/news");
    console.log("Refetch data");
    const a = await data.json();
    console.log(a);
    return a;
}

export const getData1 = ({id}) => {
    const queryClient = useQueryClient(); // useQueryClient lấy ra instance query client ở đầu app
    return useQuery(
        ["query2", {id}], // Lần sau gọi hàm này mà id đổi có render lại => cx như 1 unique id
        async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await fetch(`http://localhost:4000/news?id=${id}`);
            console.log("Refetch data2");
            return await data.json();
        },
        {
            onSuccess: (products) => {
                queryClient.setQueryData(["tete", products[0]], [products[0]]); 
                // Phải chuẩn dependencies và giá trị lấy ra
                // lúc này chỗ nào dùng đoạn useQuery ["tete", products[0]] sẽ có data luôn (dù có set nó fetch lại thì cũng có cache data rồi) nên nếu chưa fetch nó thì tốc độ hiện của nó cũng là tức thì 
                // v5 bỏ và tự impl bằng useEffect
            }
        }
    )
}
