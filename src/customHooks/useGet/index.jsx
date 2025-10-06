import { useEffect, useState } from "react";
import api from "../../service/axios/index";

export default function useGet(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(endpoint, { signal: controller.signal });
        setData(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => controller.abort();
  }, [endpoint]);

  return { data, loading, error };
}
