import { $, QwikChangeEvent, component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Input from "~/components/input/input";
import { TemplateType } from "~/constants";
import { EmailIcon, GithubIcon, LinkedInIcon, PhoneIcon } from "~/icons";
import { Template } from "~/types";
import styles from './builder.module.css';

const DEFAULT_TEMPLATE: Template = {
  type: TemplateType.DEFAULT,
  sections: {
    header: {
      name: 'Kashyap Gohil',
      description: 'Senior Software Engineer',
      postScript: 'Learning new things and having fun while at it',
      profiles: {
        github: 'github.com/kashgohil',
        linkedIn: '',
        email: '',
        phone: ''
      }
    }
  }
}

export default component$(() => {
  // states
  const template = useStore<Template>(DEFAULT_TEMPLATE, { deep: false });

  // actions
  const updateHeaderProperty = (key: string) => {
    return $((e: QwikChangeEvent<HTMLInputElement>) => {
      template.sections.header[key] = e.target.value;
    })
  }

  const updateProfileProperty = (key: string) => {
    return $((e: QwikChangeEvent<HTMLInputElement>) => {
      template.sections.header.profiles[key] = e.target.value;
    })
  }

  function renderHeader() {

    return (
      <div class='flex justify-between w-full items-start'>
        <div class='w-1/2'>
          <Input
            fontSize={36}
            class="w-full"
            value={template.sections.header.name}
            onChange$={updateHeaderProperty('name')}
          />
          <Input
            fontSize={16}
            class="text-gray-300 mt-8 w-full"
            value={template.sections.header.description}
            onChange$={updateHeaderProperty('description')}
          />
          <Input
            fontSize={14}
            class="text-gray-400 mt-4 w-full"
            value={template.sections.header.postScript}
            onChange$={updateHeaderProperty('postScript')}
          />
        </div>

        <div class='w-1/2'>
          <div class='flex items-center justify-end'>
            <Input
              fontSize={12}
              placeholder="Github"
              class='mr-8 text-gray-400 text-end w-full'
              onChange$={updateProfileProperty('github')}
              value={template.sections.header.profiles.github}
            />
            <a href={template.sections.header.profiles.github} target="__blank">
              <GithubIcon color="white" height="20" width="20" />
            </a>
          </div>
          <div class='flex items-center justify-end'>
            <Input
              fontSize={12}
              placeholder="LinkedIn"
              class='mr-8 text-gray-400 text-end w-full'
              onChange$={updateProfileProperty('linkedIn')}
              value={template.sections.header.profiles.linkedIn}
            />
            <a href={template.sections.header.profiles.linkedIn} target="__blank">
              <LinkedInIcon color="white" height="20" width="20" />
            </a>
          </div>
          <div class='flex items-center justify-end'>
            <Input
              fontSize={12}
              placeholder="Email"
              class='mr-8 text-gray-400 text-end w-full'
              onChange$={updateProfileProperty('email')}
              value={template.sections.header.profiles.email}
            />
            <EmailIcon color="white" class='px-2' height="20" width="20" />
          </div>
          <div class='flex items-center justify-end'>
            <Input
              fontSize={12}
              placeholder="Phone Number"
              class='mr-8 text-gray-400 text-end w-full'
              onChange$={updateProfileProperty('phone')}
              value={template.sections.header.profiles.phone}
            />
            <PhoneIcon color="white" height="20" width="20" />
          </div>
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