import { $, QwikChangeEvent, component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Input from "~/components/input/input";
import { TemplateType } from "~/constants";
import { GithubIcon } from "~/icons";
import { Template } from "~/types";
import styles from './builder.module.css';

const DEFAULT_TEMPLATE: Template = {
  type: TemplateType.DEFAULT,
  sections: {
    header: {
      name: 'Kashyap Gohil',
      description: 'Senior Software Engineer',
      postScript: 'Learning new things and having fun while at it'
    }
  }
}

export default component$(() => {
  // states
  const template = useStore<Template>(DEFAULT_TEMPLATE, { deep: false });

  // actions
  const updateHeaderProperty$ = (key: string) => {
    return $((e: QwikChangeEvent<HTMLInputElement>) => {
      template.sections.header[key] = e.target.value;
    })
  }

  function renderHeader() {

    return (
      <div class='flex justify-between w-full items-start'>
        <div>
          <Input
            fontSize={36}
            class="w-full"
            value={template.sections.header.name}
            onChange$={updateHeaderProperty$('name')} />
          <Input
            fontSize={16}
            class="text-gray-300 mt-8 w-full"
            value={template.sections.header.description}
            onChange$={updateHeaderProperty$('description')} />
          <Input
            fontSize={14}
            class="text-gray-400 mt-4 w-full"
            value={template.sections.header.postScript}
            onChange$={updateHeaderProperty$('postScript')} />
        </div>
        <div>
          <a href="https://www.github.com/kashgohil" target="__blank">
            <GithubIcon color="white" />
          </a>
        </div>
      </div>
    )
  }

  function renderContent() {
    return (
      <div class='w-full flex flex-1 pt-20'>
        <div class='w-1/2 border-r-[1px] border-gray-500'></div>
        <div class='w-1/2'></div>
      </div>
    )
  }

  return (
    <div class='py-30 flex justify-center items-center'>
      <div class={`${styles.page} p-20 flex flex-col text-slate-200 font-serif`}>
        {renderHeader()}
        {renderContent()}
      </div>
    </div>
  )
})

export const head: DocumentHead = {
  title: "Builder | Resume Builder",
  meta: [
    {
      name: "description",
      content: "Builder screen of Resume Builder",
    },
  ],
};