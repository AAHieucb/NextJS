import React from "react";
import { AppProps } from "next/app";
import Button from "../../../components/Button";

// # Typescript
// class BlogPage extends React.Component<number, any> {
class BlogPage extends React.Component<AppProps> {
    static async getInitialProps({ query }) {
        return {
        }
    }
    render() {
        return(
            <>
                <div>This is blog page</div>
                <Button/>
            </>
        )
    }
}
export default BlogPage;