import { getProviders } from "next-auth/react";

/**
 * プロバイダーリストを取得
 */
export const getServerSideProps = async () => {
  const providers = await getProviders();
  console.log(providers, "<<<<: Providers");
  return {
    props: { providers },
  };
};
