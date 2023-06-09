import { Root, Track, Range } from '@radix-ui/react-slider';

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider = ({ value = 1, onChange }: SliderProps) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <Root
      className='relative flex items-center select-none touch-none w-full h-full'
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.01}
      aria-label='Volume'
    >
      <Track className={`bg-neutral-600 relative grow rounded-full h-[10px]`}>
        <Range className='absolute bg-white rounded-full h-full' />
      </Track>
    </Root>
  );
};

export default Slider;
