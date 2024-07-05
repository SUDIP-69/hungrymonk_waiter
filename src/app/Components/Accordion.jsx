"use client"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Accordion({ id, title, isOpen, onToggle, children, status }) {
  //console.log(status);  
  return (
    <div >
      <button
        className="flex justify-between w-full shadow-lg p-5 text-left text-[#565556] text-lg poppins-semibold bg-[#ffffff] hover:bg-gray-100"
        onClick={() => onToggle(id)}
      >
        {title}
        <div className="flex items-center">
          <span className={`rounded-full border-[1px] border-black ${status=='updated'?'bg-[#0ace55]':'bg-[#e0f903]'} text-white p-2 mr-2`}>
            {/* Add the circular span content here */}
          </span>
          <span>{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
        </div>
      </button>
      {isOpen && <div className="p-4 ">{children}</div>}
    </div>
  );
}

export default Accordion;
