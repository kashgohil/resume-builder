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
  const { class: classes, name, value = '', fontSize = 24, onChange$ } = props;

  // states
  const editing = useSignal<boolean>(false);

  if (!editing.value) {
    return (
      <div
        class={`${classes}`}
        onClick$={() => { editing.value = !editing.value; }}
      >
        {value}
      </div>
    )
  }

  return (
    <input
      name={name}
      value={value}
      onChange$={onChange$}
      autoFocus={editing.value}
      multiple={props.multiple}
      onBlur$={() => { editing.value = !editing.value; }}
      class={`${classes} outline-none bg-transparent underline`}
    />
  )
})