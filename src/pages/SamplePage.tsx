import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '@/store';
import { decrement, increment } from '@/store/counterSlice';

export function SamplePage() {
  const count = useSelector<IRootState, number>((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
