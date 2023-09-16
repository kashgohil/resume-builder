import { $, QwikChangeEvent, QwikIntrinsicElements, component$, useSignal, useTask$ } from "@builder.io/qwik";

type InputType = QwikIntrinsicElements['input'];

interface InputProps extends InputType {
  // metadata
  value?: string;
  class?: string;
  onChange$?: (event: QwikChangeEvent<HTMLInputElement>) => any;
}

export default component$<InputProps>((props) => {
  // props and metadata

  // states
  const value = useSignal<any>(props.value);
  const editing = useSignal<boolean>(false);

  // actions
  const onChange = $((e: QwikChangeEvent<HTMLInputElement>) => {
    value.value = e.target.value;
    props.onChange$?.(e);
  })

  useTask$(({ track }) => {
    track(() => props.value);
    if (value.value !== props.value) {
      value.value = props.value;
    }
  })

  // renderers
  if (value.value && !editing.value) {
    return (
      <div
        class={`${props.class} leading-normal`}
        onClick$={() => { editing.value = !editing.value; }}
      >
        {value.value}
      </div>
    )
  }

  return (
    <input
      name={props.name}
      value={value.value}
      onChange$={onChange}
      autoFocus={editing.value}
      multiple={props.multiple}
      onBlur$={() => { editing.value = !editing.value; }}
      class={`${props.class} outline-none bg-transparent underline`}
    />
  )
})