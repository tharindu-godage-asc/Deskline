import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { getRequestById } from "../../../shared/services/requests";
import { RequestDetail } from "../components/RequestDetail";

export function RequestDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState<Awaited<ReturnType<typeof getRequestById>>>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setRequest(undefined);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    void getRequestById(id).then((result) => {
      if (!cancelled) {
        setRequest(result);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return null;
  }

  if (!request) {
    return (
      <Navigate
        to="/my-requests"
        replace
      />
    );
  }

  return (
    <RequestDetail
      request={request}
    />
  );
}