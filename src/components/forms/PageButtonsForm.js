'use client';

import SectionBox from "@/components/layout/SectionBox";
import { ReactSortable } from "react-sortablejs";
import { faGripLines, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { allButtons } from "@/constants/buttons";
import { allColors } from "@/constants/colors";

function upperFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default function PageButtonsForm({ user, page }) {
  const pageButtons = page.buttons || {};
  const pageSavedButtonsKeys = Object.keys(pageButtons);
  const pageSavedButtonsInfo = pageSavedButtonsKeys.map(k => allButtons.find(b => b.key === k));
  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);
  const [isIconLoading, setIsIconLoading] = useState(true);

  const [iconColor, setIconColor] = useState(page.btnIconColor);

  const handleIconColor = (e) => setIconColor(e.target.value);
  

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsIconLoading(false);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timeoutId);
  }, []);

  function addButtonToProfile(button) {
    setActiveButtons(prevButtons => {
      return [...prevButtons, button];
    });
  }

  function removeButton({ key: keyToRemove }) {
    setActiveButtons(prevButtons => {
      return prevButtons
        .filter(button => button.key !== keyToRemove);
    });
  }

  const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));
  return (
    <SectionBox>
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      <ReactSortable
        handle=".handle"
        list={activeButtons}
        setList={setActiveButtons}>
        {activeButtons.map(b => (
          <div key={b.key} className="mb-4 md:flex items-center">
            <div className="w-56 flex h-full text-gray-700 p-2 gap-2 items-center">
              {isIconLoading ? (
                <div className="animate-pulse bg-gray-300 w-4 h-4 rounded-full" />
              ) : (
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="cursor-pointer text-gray-400 handle p-2" />
              )}
              {isIconLoading ? (
                <div className="animate-pulse bg-gray-300 w-4 h-4 rounded-full" />
              ) : (
                <FontAwesomeIcon icon={b.icon} style={{ color: iconColor }} />
              )}
              <span>{upperFirst(b.label)}:</span>
            </div>
            <div className="grow flex">
              <input
                className="rounded-md"
                placeholder={b.placeholder}
                name={b.key}
                defaultValue={page.buttons?.[b.key] ?? ''} // Use optional chaining and provide a default value
                type="text" style={{ marginBottom: '0' }} />

              <button
                onClick={() => removeButton(b)}
                type="button"
                className="py-2 px-4 bg-gray-300 cursor-pointer rounded-md hover:bg-red-500 hover:text-white">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </ReactSortable>

      <div>
        <label htmlFor="btnIconColor" className="block text-sm font-medium mb-2 input-label">Icon Color</label>
        <div className="flex justify-start items-center gap-4 mt-4">
          <input type="color" className="p-1 h-10 w-14 block bg-white cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none" id="btnIconColor" name="btnIconColor" value={iconColor} onChange={handleIconColor} title="Choose your color" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
        {availableButtons.map(b => (
          <button
            key={b.key}
            type="button"
            onClick={() => addButtonToProfile(b)}
            className="flex items-center gap-1 p-2 bg-gray-200 rounded-md hover:bg-gray-100">
            {isIconLoading ? (
              <div className="animate-pulse bg-gray-300 w-4 h-4 rounded-full" />
            ) : (
              <FontAwesomeIcon icon={b.icon} />
            )}
            <span className="">
              {upperFirst(b.label)}
            </span>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        ))}
      </div>
    </SectionBox>
  );
}
