import React from "react";
import Image from "next/image";

function CustomImage({...props}) {
  const [src, setSrc] = React.useState("https://picsum.photos/id/237/200/300");

  return (
    // # Dùng next/image
    // Dùng onError và imageplaceholder ok
    <Image
      {...props}
      width={100}
      height={100}
      src={src}
      alt={""}
      onError={() => setSrc('https://static.thenounproject.com/png/741653-200.png')}
      placeholder="blur"
      blurDataURL="/a.png" // Nên là base64 image nhỏ
    />
  );
}

export default CustomImage;