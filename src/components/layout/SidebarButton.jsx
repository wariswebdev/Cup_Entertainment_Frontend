import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SidebarButton = ({onClick, isOpen}) => {
  return (
    <div
      onClick={onClick}
      className={`absolute top-9 -translate-y-1/2 z-[9999] cursor-pointer transition-all duration-300 ${
        isOpen ? 'left-[240px]' : 'left-[65px]'
      }`}
    >
      <div className="w-7 h-7 rounded-full bg-[#af3494] flex items-center justify-center text-white shadow-md hover:bg-[#9c2d84] transition">
        <FontAwesomeIcon icon={faArrowLeft} className={`transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
      </div>
    </div>
  );
};

export default SidebarButton;
