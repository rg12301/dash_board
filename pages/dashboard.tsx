import Head from "next/head";
import Dashboard from "../views/Dashboard";

export default function Home() {
  return (
    <div>
      <Head>
        <title>_board | Dashboard</title>
        <meta name="dashboard" content="" />
      </Head>
      <Dashboard />
    </div>
  );
}
