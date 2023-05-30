import { getProviders, signIn } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";

const login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="">
      <div className="text-center ">
        <div className="mx-auto">
          <div className="">
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <div key={provider.name}>
                    <button
                      className=""
                      onClick={() =>
                        signIn(provider.id, {
                          callbackUrl: "/",
                        })
                      }
                    >
                      <span className=""></span>
                      <span className="">Sign in with {provider.name}</span>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;

/**
 * プロバイダーリストを取得
 */
export const getServerSideProps = async () => {
  const providers = await getProviders().then((res) => {
    console.log(res, "<<<<< : provider response");
    return res;
  });

  return {
    props: { providers },
  };
};
