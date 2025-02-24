import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Input } from '@/components/Input/Input';

describe('<Input/>', () => {
    it('Should match snapshot', () => {
        const rendered = render(<Input value="" onChange={() => {}} />);

        expect(rendered).toMatchSnapshot();
    });

    it('Should update value when user types', () => {
        const fn = vi.fn();

        const { getByRole } = render(<Input value="" onChange={fn} />);
        const input = getByRole('textbox');

        fireEvent.change(input, { target: { value: 'hello world' } });

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(expect.anything());
    });
});
