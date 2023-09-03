import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';

interface SeekbarProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Seekbar = ({ value = 0, onChange }: SeekbarProps) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <Root
      className='relative flex items-center select-none touch-none w-full h-full cursor-pointer'
      defaultValue={[0]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.01}
      aria-label='Seekbar'
    >
      <Track className={`bg-neutral-600 relative grow rounded-full h-[5px]`}>
        <Range className='absolute bg-white rounded-full h-full' />
      </Track>
      <Thumb className='block w-[10px] h-[10px] bg-white border-r-[10px] rounded-full' />
    </Root>
  );
};

export default Seekbar;
