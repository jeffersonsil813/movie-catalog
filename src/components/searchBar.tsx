interface SearchBarProps extends React.ComponentProps<"input"> {}

const SearchBar = ({ ...props }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      className="bg-gray-800/15 backdrop-blur-sm border-b-2 border-gray-300 w-full text-gray-200 placeholder:text-gray-300 p-3 outline-none transition-colors focus-within:border-yellow"
      {...props}
    />
  );
};

export default SearchBar;
