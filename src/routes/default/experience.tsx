import { $, QwikChangeEvent, component$, useTask$ } from "@builder.io/qwik";
import Button from "~/components/button/button";
import Input from "~/components/input/input";
import { _isEmpty } from "~/utils";

interface Props {
  // source
  experience: any;
}

const DEFAULT_EXPERIENCE = {
  current: false,
  company: 'XYZ Company',
  position: 'Senior Software Engineer',
  duration: {
    startMonth: '2', startYear: '2022', endMonth: '2', endYear: '2023',
  },
  details: [
    'Worked on something',
    'Worked on something else',
    'Worked on something other as well'
  ]
}

const Experience = component$<Props>((props) => {
  // props and metadata

  // actions
  const addExperience = $(() => {
    props.experience.list = [...props.experience.list, (DEFAULT_EXPERIENCE)];
  })

  const updateExperienceListProperty = (index: number) => $((e: QwikChangeEvent<HTMLInputElement>) => {
    props.experience.list[index][e.target.name] = e.target.value;
  })

  const updateExperienceProperty = $((e: QwikChangeEvent<HTMLInputElement>) => {
    props.experience[e.target.name] = e.target.value;
  })

  // effects
  useTask$(({ track }) => {
    track(props.experience.list);
    if (_isEmpty(props.experience.list)) {
      props.experience.list = [DEFAULT_EXPERIENCE];
    }
  });

  // renderers
  function renderDetailItem(item: string, index: number) {
    return (
      <li>
        <Input multiple value={item} class='text-[14px] w-full word-wrap' />
      </li>

    )
  }

  function renderExperienceItem(experience: any, index: number) {
    return (
      <div key={index}>
        <Input
          name='company'
          value={experience.company}
          class='font-semibold text-[16px] w-full'
          onChange$={updateExperienceListProperty(index)}
        />
        <div class='flex items-center justify-between'>
          <Input
            name='position'
            value={experience.position}
            class='text-gray-300 mt-2 text-[14px] flex-1'
            onChange$={updateExperienceListProperty(index)}
          />
          <div class='flex items-center text-gray-400 text-[12px] mt-2'>
            <Input
              name='duration'
              value={experience.duration.startMonth}
              class='text-gray-400 text-[12px] w-[2ch] text-end'
              onChange$={updateExperienceListProperty(index)}
            />
            <span class='mx-1'>/</span>
            <Input
              name='duration'
              value={experience.duration.startYear}
              class='text-gray-400 text-[12px] w-[4ch] text-end'
              onChange$={updateExperienceListProperty(index)}
            />
            <span class='mx-4'>-</span>
            {experience.current
              ? <span class='text-[12px] text-end text-gray-400'>Present</span>
              : <>
                <Input
                  name='duration'
                  value={experience.duration.endMonth}
                  class='text-gray-400 text-[12px] w-[2ch] text-end'
                  onChange$={updateExperienceListProperty(index)}
                />
                <span class='mx-1'>/</span>
                <Input
                  name='duration'
                  value={experience.duration.endYear}
                  class='text-gray-400 text-[12px] w-[4ch] text-end'
                  onChange$={updateExperienceListProperty(index)}
                />
              </>
            }
          </div>
        </div>
        <div>
          <ul class='list-disc space-y-4 mt-8 pl-20'>
            {experience.details.map(renderDetailItem)}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div key='EXPERIENCE'>
      <div class='group bg-slate-100 rounded mb-12 flex justify-between px-8 py-6'>
        <Input
          name='sectionLabel'
          class='text-gray-700 text-[16px]'
          onChange$={updateExperienceProperty}
          value={props.experience.sectionLabel}
        />
        <Button
          onClick$={addExperience}
          class='bg-gray-500 hidden group-hover:flex px-4 py-0 items-center justify-center'
        >
          +
        </Button>
      </div>
      <div class='space-y-12'>
        {props.experience.list.map(renderExperienceItem)}
      </div>
    </div>
  )

})

export default Experience;