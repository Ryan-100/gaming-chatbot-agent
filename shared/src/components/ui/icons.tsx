import { FaArrowLeft, FaFileArrowDown, FaCalendarDay } from 'react-icons/fa6';
import { FiDownload } from 'react-icons/fi';
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosLock,
  IoMdTrash,
  IoIosInformationCircle,
  IoIosSearch,
} from 'react-icons/io';
import {
  MdClose,
  MdError,
  MdChevronRight,
  MdOutlineReplay,
  MdOutlineDoNotDisturbAlt,
} from 'react-icons/md';

import {
  RiMessageFill,
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiEyeCloseLine,
  RiCheckDoubleFill,
} from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { TbRefresh, TbReplace } from 'react-icons/tb';
import {
  IoNotificationsSharp,
  IoAdd,
  IoCopy,
  IoEyeSharp,
} from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';
import { HiOutlineTrash } from 'react-icons/hi2';
import { LuImagePlus } from 'react-icons/lu';
import { CgChevronDoubleRight } from 'react-icons/cg';
import { RxSlash, RxDragHandleHorizontal } from 'react-icons/rx';
import { TfiMenuAlt } from 'react-icons/tfi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GrStatusGood } from 'react-icons/gr';
import { RxCross2 } from 'react-icons/rx';
import { PiCaretDoubleRightFill, PiPencilSimpleLine } from 'react-icons/pi';

export const Icons = {
  loading: ({ ...props }) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block animate-spin"
        {...props}
      >
        <path
          opacity="0.2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          fill="currentColor"
        />
        <path
          d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  Cross: RxCross2,
  Good: GrStatusGood,
  Drag: RxDragHandleHorizontal,
  Cancel: MdOutlineDoNotDisturbAlt,
  Info: IoIosInformationCircle,
  Calendar: FaCalendarDay,
  CheckDouble: RiCheckDoubleFill,
  Deposit: FaFileArrowDown,
  DoubleNextArrow: PiCaretDoubleRightFill,
  Dollar: BsCurrencyDollar,
  Replay: MdOutlineReplay,
  Trash: HiOutlineTrash,
  Trash2: IoMdTrash,
  Replace: TbReplace,
  Lock: IoIosLock,
  Plus: IoAdd,
  Eye: IoEyeSharp,
  EyeOff: RiEyeCloseLine,
  BackArrow: FaArrowLeft,
  Close: MdClose,
  Error: MdError,
  Notification: IoNotificationsSharp,
  Message: RiMessageFill,
  ArrowUp: IoIosArrowUp,
  ArrowDown: IoIosArrowDown,
  DpArrowDown: RiArrowDownSFill,
  DpArrowUp: RiArrowUpSFill,
  DpArrowRight: CgChevronDoubleRight,
  Copy: IoCopy,
  Refresh: TbRefresh,
  Edit: BiEdit,
  Edit2: PiPencilSimpleLine,
  ImgUpload: LuImagePlus,
  RightArrow: LuImagePlus,
  Right: MdChevronRight,
  ForwardArrow: IoIosArrowForward,
  BackwardArrow: IoIosArrowBack,
  Slash: RxSlash,
  Type: TfiMenuAlt,
  Search: IoIosSearch,
  Menu: LuMenu,
  Download: FiDownload,
};
