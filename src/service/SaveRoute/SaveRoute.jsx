import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function SaveLastPage() {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastPage", location.pathname);
  }, [location]);
  return null;
}

export default SaveLastPage;
