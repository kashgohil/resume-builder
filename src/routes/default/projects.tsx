import { $, QwikChangeEvent, component$, useTask$ } from "@builder.io/qwik";
import Button from "~/components/button/button";
import Input from "~/components/input/input";
import { _isEmpty } from "~/utils";

interface Props {
  // source
  projects: any;
}

const DEFAULT_PROJECT = {
  title: 'React Projects',
  subtitle: 'copy-paste-able packages for react',
  details: ['react-router - configuration driven router', 'react-store - signal-like react state management', 'react-components - components developed with tailwindcss']
}

const Projects = component$<Props>((props) => {
  // props and metadata

  // states

  // actions
  const addProject = $(() => {
    props.projects.list = [...props.projects.list, DEFAULT_PROJECT]
  })

  const updateProjectsListProperty = (index: number) => $((e: QwikChangeEvent<HTMLInputElement>) => {
    props.projects.list[index][e.target.name] = e.target.value;
  })

  const updateProjectsProperty = $((e: QwikChangeEvent<HTMLInputElement>) => {
    props.projects[e.target.name] = e.target.value;
  });

  // effects
  useTask$(({ track }) => {
    track(props.projects.list);
    if (_isEmpty(props.projects.list)) {
      props.projects.list = [DEFAULT_PROJECT];
    }
  });

  // renderers
  function renderDetailItem(item: string, index: number) {
    return (
      <li>
        <Input multiple value={item} class='text-[14px] w-full' />
      </li>

    )
  }

  function renderEducationItem(project: any, index: number) {
    return (
      <div key={index}>
        <Input
          name='title'
          value={project.title}
          class='font-semibold text-[16px] w-full'
          onChange$={updateProjectsListProperty(index)}
        />
        <Input
          name='subtitle'
          value={project.subtitle}
          class='text-gray-300 mt-2 text-[14px] flex-1'
          onChange$={updateProjectsListProperty(index)}
        />
        <div>
          <ul class='list-disc space-y-4 mt-8 pl-20'>
            {project.details.map(renderDetailItem)}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div key='PROJECTS'>
      <div class='group bg-slate-100 rounded mb-12 flex justify-between px-8 py-6'>
        <Input
          name='sectionLabel'
          class='text-gray-700 text-[16px]'
          onChange$={updateProjectsProperty}
          value={props.projects.sectionLabel}
        />
        <Button
          onClick$={addProject}
          class='bg-gray-500 hidden group-hover:flex px-4 py-0 items-center justify-center'
        >
          +
        </Button>
      </div>
      <div class='space-y-12'>
        {props.projects.list.map(renderEducationItem)}
      </div>
    </div>
  )
})

export default Projects;