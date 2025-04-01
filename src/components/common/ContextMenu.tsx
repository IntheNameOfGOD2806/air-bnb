import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContextMenu({
  options,
  cordinates,
  contextMenu,
  setContextMenu,
}: {
  options: { name: string; callback: () => void }[];
  cordinates: { x: number; y: number };
  contextMenu: { show: boolean; x: number; y: number };
  setContextMenu: (contextMenu: {
    show: boolean;
    x: number;
    y: number;
  }) => void;
}) {
  const contextMenuRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      ref={contextMenuRef}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        top: cordinates.y,
        left: cordinates.x,
      }}
      className="bg-white shadow-2xl fixed py-5 z-[100] rounded-lg border border-gray-200"
    >
      <ul className="flex flex-col">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options.map(({ name, callback }: any) => (
            <li
              key={name}
              onClick={() => {
                callback();
                setContextMenu({ show: false, x: 0, y: 0 });
              }}
              className="cursor-pointer px-5 py-2 hover:bg-gray-100"
            >
              <span>{name}</span>
            </li>
          ))
        }
        {contextMenu.show && (
          <div
            onClick={() => {
              setContextMenu({ show: false, x: 0, y: 0 });
            }}
            className="cursor-pointer px-5 py-2 hover:bg-gray-100"
          >
            Delete
          </div>
        )}
      </ul>
    </div>
  );
}
