import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

export default function NotFoundPage() {
  return (
    <div className="page-not-found">
      <h1>Page Not Found</h1>
      <div>404</div>
      <p>Sorry, there is nothing to see here.</p>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
}
