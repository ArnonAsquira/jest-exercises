import React from "react";

export default function List(props) {
  // Implement this component to pass the tests in ./__tests/index.spec.js
  return (
    <ul>
      {props.data.map((li) => (
        <li
          className={li.selected ? "selected" : ""}
          key={li.key}
          onClick={(e) => props.onClick(Number(li.key))}
        >
          {li.name}
        </li>
      ))}
    </ul>
  );
}
