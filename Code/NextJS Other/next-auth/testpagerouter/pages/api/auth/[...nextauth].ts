import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import mongoose from "mongoose";
import User from "@/models/User";

// # Dùng next-auth
// Force lưu vào db dù dùng jwt

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI ?? "");
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID ?? "",
      clientSecret: process.env.CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent", // Forces the consent screen, buộc phải login và cấp quyền lại dù đã login trước đó rồi, có nó sẽ k có tính năng auto login
          access_type: "offline", // Phải có mới request trả về refresh token
          response_type: "code", // Google sẽ trả về một mã xác thực (authorization code) mà server có thể sử dụng để đổi lấy access token và refresh token.
        },
      },
    }),
    GithubProvider({
      // github k hỗ trợ refresh token như gg
      clientId: "test1",
      clientSecret: "test2",
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      // Được gọi khi 1 JWT được tạo hoặc cập nhật, khi login, khi làm mới token, khi truy cập token
      console.log("token", token);
      console.log("account2", account);
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      // Có thể check access_token exprires thì lấy lại bằng refresh_token ở đây. Gán data vào token có thể lấy ở hàm session bên dưới
      return token;
    },
    async signIn({ user, account, profile }: any) {
      // Được gọi khi đăng nhập, có thể check or thay đổi thông tin login trước khi tạo phiên đăng nhập
      await connectDB();
      const { email, name, image } = user;
      console.log("account", account);
      console.log("profile", profile);

      // Check if user already exists in the database
      // Giải quyết email dot trick bằng cách normalize email thoi. Login kiểu này luôn dùng đúng email. 
      let dbUser = await User.findOne({ email });

      // If user doesn't exist, create a new user
      if (!dbUser) {
        dbUser = await User.create({
          email,
          name,
          image,
          accessToken: account?.access_token, // Store access token
          refreshToken: account?.refresh_token, // Store refresh token
        });
      } else {
        // Update tokens if user already exists
        dbUser.accessToken = account?.access_token;
        dbUser.refreshToken = account?.refresh_token;
        await dbUser.save();
      }
      return true;
    },
    async session({ session, token }: any) {
      // Khi login thành công sẽ tạo 1 phiên đăng nhập thì gọi.
      // Khi client dùng getSession() hoặc useSession(), NextAuth.js sẽ gọi hàm này để lấy thông tin phiên đăng nhập hiện tại và trả về cho client
      // Khi dùng refresh token để làm mới session

      // Hàm này k trả ra token vì muốn che giấu token k được lấy ở client, nhưng ta có thể custom vẫn lấy token nếu k sợ hack bằng cách lưu vào db rồi lấy ra, hoặc custom truyền từ server qua client thông qua biến token ở hàm jwt.
      // Ở đây lấy data trong db là token lưu từ lúc signin, ta nên lấy data từ param token là chuẩn hơn vì khi token được làm mới từ hàm jwt sẽ có đây
      await connectDB();
      console.log("session", session);
      const dbUser = await User.findOne({ email: session.user?.email });
      if (dbUser) {
        session.user = {
          ...session.user,
          id: dbUser._id.toString(),
          name: dbUser.name,
          image: dbUser.image,
          accessToken: dbUser.accessToken,
          refreshToken: dbUser.refreshToken, 
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
}

export default NextAuth(authOptions)