import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import Layout from "@/components/layout";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Layout>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <Link to="/">Go back to the home page</Link>
        <p>
          {isRouteErrorResponse(error) ? (
            <i>{error?.statusText || error?.status}</i>
          ) : (
            "Unknown error"
          )}
        </p>
      </div>
    </Layout>
  );
}
