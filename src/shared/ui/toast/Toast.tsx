type Props = {
  message: string;
};

export function Toast({
  message,
}: Props) {
  return (
    <div className="fixed right-4 top-4 rounded-lg bg-green-600 px-4 py-3 text-white shadow-lg">
      {message}
    </div>
  );
}