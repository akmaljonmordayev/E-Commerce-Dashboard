export default function ErrorMessage({ message }) {
  return (
    <div className="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded-lg shadow-sm">
      <p className="font-medium">Xato!</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
