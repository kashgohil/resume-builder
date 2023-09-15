import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";

type ButtonType = QwikIntrinsicElements['button'];

interface ButtonProps extends ButtonType {
  // metadata
  to?: string;
  variant?: 'link' | 'default';
}

export default component$((props: ButtonProps) => {
  // props and metadata
  const { onClick$, variant, to, class: classes } = props;

  // renderers
  switch (variant) {
    case 'link':
      return (
        <a class={`outline-none p-8 rounded border text-slate-200 hover:bg-white hover:text-black transition-all ease-in-out delay-100 ${classes}`} href={to}>
          <Slot />
        </a>
      );
    default:
      return (
        <button onClick$={onClick$} class={`${classes} p-8 outline-none rounded`}>
          <Slot />
        </button>
      )

  }
})