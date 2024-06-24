import React from "react";
import ldk from "@/assets/user/ldk.jpg";
import Image from "next/image";
import styles from "./styles/User.module.css";

const User = () => {
  return (
    <>
      <Image src={ldk} alt="lịch đăng ký"></Image>
      <div className="text-2xl font-bold">Hello</div>
      <div className={styles.largeFont}>Color</div>
    </>
  );
};

export default User;
