import { $, QwikChangeEvent, component$, useTask$ } from "@builder.io/qwik";
import Button from "~/components/button/button";
import Input from "~/components/input/input";
import { _isEmpty } from "~/utils";

interface Props {
  // source
  education: any;
}

const DEFAULT_EDUCATION = {
  sectionLabel: 'Education',
  degree: 'B.Tech. (ICT)',
  institution: 'DA-IICT',
  courses: ['Software Engineering', 'Database Management Systems', 'Operating Systems', 'Approximation Algorithms', 'Blockchain and Cryptocurrency'],
  duration: {
    startMonth: '7',
    startYear: '2016',
    endMonth: '5',
    endYear: '2020',
  }
}

const Education = component$<Props>((props) => {
  // props and metadata

  // states

  // actions
  const addEducation = $(() => {
    props.education.list = [...props.education.list, DEFAULT_EDUCATION]
  })

  const updateEducationListProperty = (index: number) => $((e: QwikChangeEvent<HTMLInputElement>) => {
    props.education.list[index][e.target.name] = e.target.value;
  })

  const updateEducationProperty = $((e: QwikChangeEvent<HTMLInputElement>) => {
    props.education[e.target.name] = e.target.value;
  });

  // effects
  useTask$(({ track }) => {
    track(props.education.list);
    if (_isEmpty(props.education.list)) {
      props.education.list = [DEFAULT_EDUCATION];
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

  function renderEducationItem(education: any, index: number) {
    return (
      <div key={index}>
        <Input
          name='degree'
          value={education.degree}
          class='font-semibold text-[16px] w-full'
          onChange$={updateEducationListProperty(index)}
        />
        <div class='flex items-center justify-between'>
          <Input
            name='institution'
            value={education.institution}
            class='text-gray-300 mt-2 text-[14px] flex-1'
            onChange$={updateEducationListProperty(index)}
          />
          <div class='flex items-center text-gray-400 text-[12px] mt-2'>
            <Input
              name='duration'
              value={education.duration.startMonth}
              class='text-gray-400 text-[12px] w-[2ch] text-end'
              onChange$={updateEducationListProperty(index)}
            />
            <span class='mx-1'>/</span>
            <Input
              name='duration'
              value={education.duration.startYear}
              class='text-gray-400 text-[12px] w-[4ch] text-end'
              onChange$={updateEducationListProperty(index)}
            />
            <span class='mx-4'>-</span>
            {education.current
              ? <span class='text-[12px] text-end text-gray-400'>Present</span>
              : <>
                <Input
                  name='duration'
                  value={education.duration.endMonth}
                  class='text-gray-400 text-[12px] w-[2ch] text-end'
                  onChange$={updateEducationListProperty(index)}
                />
                <span class='mx-1'>/</span>
                <Input
                  name='duration'
                  value={education.duration.endYear}
                  class='text-gray-400 text-[12px] w-[4ch] text-end'
                  onChange$={updateEducationListProperty(index)}
                />
              </>
            }
          </div>
        </div>
        <div>
          <ul class='list-disc space-y-4 mt-8 pl-20'>
            {education.courses.map(renderDetailItem)}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div key='EDUCATION'>
      <div class='group bg-slate-100 rounded mb-12 flex justify-between px-8 py-6'>
        <Input
          name='sectionLabel'
          class='text-gray-700 text-[16px]'
          onChange$={updateEducationProperty}
          value={props.education.sectionLabel}
        />
        <Button
          onClick$={addEducation}
          class='bg-gray-500 hidden group-hover:flex px-4 py-0 items-center justify-center'
        >
          +
        </Button>
      </div>
      <div class='space-y-12'>
        {props.education.list.map(renderEducationItem)}
      </div>
    </div>
  )
})

export default Education;