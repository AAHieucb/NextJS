import { Meta } from "./Meta";
import { Footer } from "./Footer";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Meta />
      <div>
        {children}
      </div>
      <Footer />
    </>
  );
};