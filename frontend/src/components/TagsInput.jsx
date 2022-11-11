import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function TagsInput(props) {
  const [tags, setTags] = React.useState(props.tags);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    event.preventDefault();
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  return (
    <div className="flex items-center flex-wrap min-w-[48px] w-[100%] p-0 focus:outline-none border-[1px] border-slate-200 shadow-sm">
      <ul className="flex flex-wrap gap-2 p-2">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="bg-blue-500 text-sm text-white rounded-full py-1 px-2 capitalize"
          >
            <span> {tag} </span>
            <CloseIcon
              className="!text-base cursor-pointer"
              onClick={() => removeTags(index)}
            />
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="focus:outline-none pl-3 p-2 w-full"
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();

          addTags(event);
        }}
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
      />
    </div>
  );
}

export default TagsInput;
