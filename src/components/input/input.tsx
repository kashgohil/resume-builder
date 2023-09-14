import { component$, useSignal, type QwikIntrinsicElements } from "@builder.io/qwik";

type InputType = QwikIntrinsicElements['input'];

interface InputProps extends InputType {
  // metadata
  value?: string;
  class?: string;
  fontSize?: number;
}

export default component$((props: InputProps) => {
  // props and metadata
  const { class: classes, value = '', fontSize = 24, onChange$ } = props;

  // states
  const editing = useSignal<boolean>(false);

  if (false && !editing.value) {
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
      class={`text-[${fontSize}px] ${classes} outline-none bg-transparent focus:underline`}
    />
  )
})