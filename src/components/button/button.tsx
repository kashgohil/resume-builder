import { Slot, component$ } from "@builder.io/qwik";

interface ButtonProps {
  // metadata
  to?: string;
  variant?: 'link' | 'default';
  // actions
  onClick?(): void;
}

export default component$((props: ButtonProps) => {
  // props and metadata
  const { onClick, variant, to } = props;

  // renderers
  switch (variant) {
    case 'link':
      return (
        <a class='outline-none p-8 rounded border text-slate-200 hover:bg-white hover:text-black transition-all ease-in-out delay-100' href={to}>
          <Slot />
        </a>
      );
    default:
      return (
        <button onClick$={onClick} class='p-8 outline-none rounded'>
          <Slot />
        </button>
      )

  }
})