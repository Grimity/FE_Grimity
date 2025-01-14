import Edit from "@/components/ProfileEdit/ProfileEdit";
import { InitialPageMeta } from "@/components/MetaData/MetaData";
import { SSRMetaProps } from "@/components/MetaData/MetaData.type";
import { serviceUrl } from "@/constants/serviceurl";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const OGTitle = "프로필 편집 - 그리미티";
  const OGUrl = `${serviceUrl}`;
  return {
    props: {
      OGTitle,
      OGUrl,
    },
  };
};

export default function MyProfileEdit({ OGTitle, OGUrl }: SSRMetaProps) {
  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <Edit />
    </>
  );
}
