import { Header } from "../components/Header";
import "./NotFoundPage.css";
export function NotFoundPage() {
  return (
    <>
      <title>404 Page Not Found</title>
      <Header />
      <div className="not-found-message">Page not found</div>
    </>
  );
}
