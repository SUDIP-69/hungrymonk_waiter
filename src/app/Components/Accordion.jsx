"use client"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
function Accordion({ id, title, isOpen, onToggle, children,status }) {
  console.log(status);
    return (

      <div className="pb-5 ">
        <button
          className="flex justify-between w-full  shadow-lg p-5 text-left text-[#565556] text-lg font-semibold bg-[#ffffff]  hover:bg-gray-100"
          onClick={() => onToggle(id)}
        >
          {title}
          <>
          {/* status */}
          </>
          <span>{isOpen ? <KeyboardArrowUpIcon/> :<KeyboardArrowDownIcon/> }</span>
        </button>
        {isOpen && <div className="p-4 ">{children}</div>}
      </div>
    );
  }
  
  export default Accordion;