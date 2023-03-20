import { ReactElement, ReactNode } from "react";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "../interfaces";
import Header from "../components/Header";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Header title="Welcome to OpalLab!" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
          <div className="">Home</div>
        </div>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {/* Use ff you need per-Page Layouts
      link : https://nextjs.org/docs/basic-features/layouts#per-page-layouts
      <NestedLayout>{page}</NestedLayout> 
      */}
      {page}
    </Layout>
  );
};

export default Home;
