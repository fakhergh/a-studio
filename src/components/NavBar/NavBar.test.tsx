import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NavBar } from '@/components/NavBar/NavBar';

describe('<NavBar/>', () => {
    it('Should match snapshot', () => {
        const rendered = render(<NavBar />);

        expect(rendered).toMatchSnapshot();
    });
});
