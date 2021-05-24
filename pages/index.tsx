import Head from "next/head";
import Login from "../views/Login";

export default function Home() {
  return (
    <div>
      <Head>
        <title>_board | Login</title>
        <meta name="Login" content="" />
      </Head>
      <Login />
    </div>
  );
}
