import { $, QwikChangeEvent, component$, useTask$ } from "@builder.io/qwik";
import Button from "~/components/button/button";
import Input from "~/components/input/input";
import { _isEmpty } from "~/utils";

interface Props {
  skills: any;
}

const DEFAULT_SKILL = {
  label: 'React',
}

const Skills = component$<Props>((props) => {
  // props and metadata

  // actions
  const addSkill = $(() => {
    props.skills.list = [...props.skills.list, DEFAULT_SKILL];
  })

  const updateSkillsProperty = $((e: QwikChangeEvent<HTMLInputElement>) => {
    props.skills[e.target.name] = e.target.value;
  })

  const updateSkillsListProperty = (index: number) => $((e: QwikChangeEvent<HTMLInputElement>) => {
    props.skills[index][e.target.name] = e.target.value;
  });

  //effects
  useTask$(({ track }) => {
    track(props.skills.list);
    if (_isEmpty(props.skills.list)) {
      props.skills.list = [DEFAULT_SKILL];
    }
  })

  // renderers
  function renderSkillItem(skill: any, index: number) {
    return (
      <div class='px-8 py-4 bg-slate-100 text-gray-700 mb-4 mr-4 rounded'>
        <Input
          name='label'
          class='text-[12px]'
          value={skill.label}
          onChange$={updateSkillsListProperty(index)}
        />
      </div>
    )
  }

  return (
    <div key='SKILLS'>
      <div class='group bg-slate-100 rounded mb-12 flex justify-between px-8 py-6'>
        <Input
          name='sectionLabel'
          onChange$={updateSkillsProperty}
          value={props.skills.sectionLabel}
          class='text-gray-700 text-[16px]'
        />
        <Button
          onClick$={addSkill}
          class='bg-gray-500 hidden group-hover:flex px-4 py-0 items-center justify-center'
        >
          +
        </Button>
      </div>
      <div class='mt-12 flex flex-wrap items-start'>
        {props.skills.list.map(renderSkillItem)}
      </div>
    </div>
  )
})

export default Skills;