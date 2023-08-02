export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-[#000428] to-[#004e92] min-h-screen">
      <div className="font-semibold text-4xl py-4 font-bold text-gray-300 text-transparent">
        Welcome to your TO DO list
      </div>
      <div className="flex flex-col gap-y-3 w-2/5 items-center pt-4">
        <input
          className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent"
          autoFocus={true}
          type="text"
          id="anime-input"
          name="anime-input"
          placeholder="Enter a title"
          onChange={() => {}}
        />
        <textarea
          className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent min-h-[40px]"
          id="description-id"
          name="description-name"
          placeholder="Enter a description"
          rows="4"
          cols="50"
        />
        <select
          className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent"
          name="pets"
          id="pet-select"
        >
          <option value="">Pending ⌛</option>
          <option value="dog">Completed ✅</option>
        </select>
        <button
          className="w-full color-gray-400 bg-gradient-to-tr from-[#000428] to-[#004e92] rounded-sm px-2 text-bold text-center"
          type="button"
          name="get-anime"
          onClick={() => {}}
        >
          <b className="text-gray-400">Add</b>
        </button>
      </div>
    </div>
  );
}
