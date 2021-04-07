import { useCookies } from "react-cookie";
import LoggedIn from "../components/LoggedIn";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { access_token, accountName, appSpecificAccountId } = cookies;

  if (access_token) {
    return <LoggedIn />;
  } else {
    return (
      <div className="flex flex-col items-center">
        <h1>Knowledge Graph Dynamic Relationships</h1>
        <p>
          This app makes it easy to build dynamic relationships in the Knowledge
          Graph without manually keeping them up to date.
        </p>
        <div>{accountName}</div>
        <a href="/api/auth/start">Get Started</a>
      </div>
    );
  }
}
