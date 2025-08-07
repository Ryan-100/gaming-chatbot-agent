import { Button } from '../ui/button';
import { Image } from '../ui/image';

interface SenBtnProps {
  onPress: () => void;
  disable?: boolean;
}

const SendBtn: React.FC<SenBtnProps> = ({ onPress, disable }) => {
  return (
    <Button
      disabled={disable}
      className="rounded-full min-w-[40px] min-h-[40px] p-0"
      onClick={onPress}
    >
      <Image
        src="/upload/icons/send.svg"
        width={20}
        height={20}
        alt="send icon"
        className="w-[20px] h-[20px]"
      />
    </Button>
  );
};

export default SendBtn;
