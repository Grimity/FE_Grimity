import Banner from "@/components/Layout/Banner/Banner";
import { InitialPageMeta } from "@/components/MetaData/MetaData";
import { SSRMetaProps } from "@/components/MetaData/MetaData.type";
import { serviceUrl } from "@/constants/serviceurl";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const OGTitle = "Grimity";
  const OGUrl = `${serviceUrl}`;
  return {
    props: {
      OGTitle,
      OGUrl,
    },
  };
};

export default function Home({ OGTitle, OGUrl }: SSRMetaProps) {
  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <Banner />
    </>
  );
}
