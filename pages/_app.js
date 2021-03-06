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
      router.push("/home");
    }
  }, [pathname, access_token]);

  if (!cookies) {
    return <div></div>;
  }

  const logout = () => {
    removeCookie("accountName");
    removeCookie("access_token");
    alert("LOGGED OUT");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-screen-sm mx-auto">
        <div className="text-xs text-gray-500 mb-2 flex justify-between">
          {accountName && (
            <div>
              You are connected to {accountName}{" "}
              <div onClick={logout}>logout</div>
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
