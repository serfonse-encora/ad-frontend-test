import '@testing-library/jest-dom';

declare global {
  namespace _jest {
    interface _Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(..._classNames: string[]): R;
      toHaveAttribute(_attr: string, _value?: string): R;
      toContainElement(_element: HTMLElement | null): R;
    }
  }
}
