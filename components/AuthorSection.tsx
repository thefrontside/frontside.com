export function AuthorSection(
  { author, date, authorImage }: {
    author: string;
    date: Date;
    authorImage: string;
  },
) {
  return (
    <div class="flex flex-row items-center mt-auto pt-4">
      <div>
        <img
          class="mr-4 rounded-full w-10 h-10 object-cover"
          src={authorImage}
          alt={`${author}'s profile`}
        />
      </div>
      <div>
        <p class="m-0 font-black">{author}</p>
        <p class="m-0 text-gray-500 text-sm">
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }).format(date)}
        </p>
      </div>
    </div>
  );
}
