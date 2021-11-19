import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { access_token, accountName } = cookies;
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (!access_token && pathname !== "/") {
      router.push("/");
    } else if (pathname === "/" && access_token) {
      router.push("/graph");
    }
  }, [pathname, access_token]);

  if (!cookies) {
    return <div></div>;
  }

  const logout = () => {
    removeCookie("accountName");
    removeCookie("access_token");
    router.push("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-xs text-gray-500 mb-2 w-full">
          {accountName && (
            <div className="flex gap-2 justify-between">
              <div>You are connected to {accountName}</div>
              <button onClick={logout}>Log out of this Account</button>
            </div>
          )}
          {/* <a href="#">Change Account</a> */}
        </div>
        <div className="p-4 bg-white border shadow-sm rounded-sm">
          <Component {...pageProps} {...cookies} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
