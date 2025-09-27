import { useState } from "react";
import api from "../../axios";

export function useDelete(endpoint) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await api.delete(`${endpoint}/${id}`);
      setSuccess(true);
      console.log(true);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { success, loading, error, deleteData };
}
