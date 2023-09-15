import { $, QwikChangeEvent, component$, useTask$ } from "@builder.io/qwik";
import Button from "~/components/button/button";
import Input from "~/components/input/input";
import { _isEmpty } from "~/utils";

interface Props {
  interests: any;
}

const DEFAULT_INTEREST = {
  label: 'Web Assembly',
}

const Interests = component$<Props>((props) => {
  // props and metadata

  // actions
  const addInterest = $(() => {
    props.interests.list = [...props.interests.list, DEFAULT_INTEREST];
  })

  const updateInterestsProperty = $((e: QwikChangeEvent<HTMLInputElement>) => {
    props.interests[e.target.name] = e.target.value;
  })

  const updateInterestsListProperty = (index: number) => $((e: QwikChangeEvent<HTMLInputElement>) => {
    props.interests[index][e.target.name] = e.target.value;
  });

  //effects
  useTask$(({ track }) => {
    track(props.interests.list);
    if (_isEmpty(props.interests.list)) {
      props.interests.list = [DEFAULT_INTEREST];
    }
  })

  // renderers
  function renderInterestItem(interest: any, index: number) {
    return (
      <div class='px-8 py-4 bg-slate-100 text-gray-700 mb-4 mr-4 rounded'>
        <Input
          name='label'
          class='text-[12px]'
          value={interest.label}
          onChange$={updateInterestsListProperty(index)}
        />
      </div>
    )
  }

  return (
    <div key='INTERESTS'>
      <div class='group bg-slate-100 rounded mb-12 flex justify-between px-8 py-6'>
        <Input
          name='sectionLabel'
          onChange$={updateInterestsProperty}
          value={props.interests.sectionLabel}
          class='text-gray-700 text-[16px]'
        />
        <Button
          onClick$={addInterest}
          class='bg-gray-500 hidden group-hover:flex px-4 py-0 items-center justify-center'
        >
          +
        </Button>
      </div>
      <div class='mt-12 flex flex-wrap items-start'>
        {props.interests.list.map(renderInterestItem)}
      </div>
    </div>
  )
})

export default Interests;