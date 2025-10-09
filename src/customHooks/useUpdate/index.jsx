import { useState } from "react";
import api from "../../service/axios/index";

export default function useUpdate(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (id, body) => {
    setLoading(true);
    try {
      const res = await api.put(`${endpoint}/${id}`, body);
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, updateData };
}
