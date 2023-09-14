import { component$, useSignal, type QwikIntrinsicElements } from "@builder.io/qwik";

type InputType = QwikIntrinsicElements['input'];

interface InputProps extends InputType {
  // metadata
  value?: string;
  class?: string;
  fontSize?: number;
  // actions
}

export default component$((props: InputProps) => {
  // props and metadata
  const { class: classes, value = '', fontSize = 24, onChange$ } = props;

  // states
  const editing = useSignal<boolean>(false);

  if (!editing.value) {
    return (
      <div
        class={`text-[${fontSize}px] ${classes}`}
        onClick$={() => { editing.value = !editing.value; }}
      >
        {value}
      </div>
    )
  }

  return (
    <input
      value={value}
      onChange$={onChange$}
      onBlur$={() => { editing.value = !editing.value; }}
      class={`text-[${fontSize}px] ${classes} underline outline-none bg-transparent`}
    />
  )
})