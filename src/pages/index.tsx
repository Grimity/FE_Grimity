import Banner from "@/components/Layout/Banner/Banner";
import HotGallery from "@/components/Layout/HotGallery/HotGallery";
import styles from "@/styles/pages/home.module.scss";
import { InitialPageMeta } from "@/components/MetaData/MetaData";
import { SSRMetaProps } from "@/components/MetaData/MetaData.type";
import { serviceUrl } from "@/constants/serviceurl";
import { GetServerSideProps } from "next";
import WholeGallery from "@/components/Layout/WholeGallery/WholeGallery";

export const getServerSideProps: GetServerSideProps = async () => {
  const OGTitle = "그리미티";
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
      <div className={styles.container}>
        <Banner />
        <HotGallery />
        <WholeGallery />
      </div>
    </>
  );
}
