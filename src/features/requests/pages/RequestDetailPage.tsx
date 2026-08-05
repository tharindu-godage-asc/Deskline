import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { RequestDetail } from "../components/request detail/RequestDetail";
import { getRequestById } from "../../../shared/api/requestApi";
import { ErrorState } from "../components/states/ErrorState";
import { LoadingState } from "../components/states/LoadingState";
import type { Message } from "../../../shared/types";
import { mapMessage } from "../../../shared/mappers/messageMapper";
import type { ApiMessage } from "../../../shared/types/api/ApiMessage";
import type { ErrorInfo } from "../../../shared/mappers/errorMapper";
import { mapStatusCodeToError } from "../../../shared/mappers/errorMapper";

export function RequestDetailPage() {
  const { id } = useParams();
 
  const [isLoading, setIsLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<ErrorInfo | null>(null);

  useEffect(() => {
    if (!id) {
      setRequest(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    void getRequestById(id)
      .then((result) => {
        if (!cancelled) {
          setRequest(result.request);
          setMessages(
            result.messages.map(
              (message: ApiMessage) =>
                mapMessage(message)
            )
          );
          setIsLoading(false);
          console.log(
            "Request API Response - Comments + Details:",
            result
          );

          console.log(
            "Comments:",
            result.messages
          );
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setError(
            mapStatusCodeToError(
              (error as any)?.status
            )
          );
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        title={error.title}
        description={error.description}
        onRetry={() =>
          window.location.reload()
        }
      />
    );
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
      messages={messages}
    />
  );
}