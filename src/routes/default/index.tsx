import { $, QwikChangeEvent, component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Input from "~/components/input/input";
import { TemplateType } from "~/constants";
import { EmailIcon, GithubIcon, LinkedInIcon, PhoneIcon } from "~/icons";
import { Template } from "~/types";
import styles from './default.module.css';
import Education from "./education";
import Experience from "./experience";
import Interests from "./interests";
import Projects from "./projects";
import Skills from "./skills";

const DEFAULT_TEMPLATE: Template = {
  type: TemplateType.DEFAULT,
  sections: {
    header: {
      sectionLabel: 'Header',
      name: 'Kashyap Gohil',
      description: 'Senior Software Engineer',
      postScript: 'Learning new things and having fun while at it',
      profiles: {
        github: 'github.com/kashgohil',
        linkedIn: '',
        email: '',
        phone: ''
      }
    },
    experience: {
      sectionLabel: 'Experience',
      list: []
    },
    education: {
      sectionLabel: 'Education',
      list: []
    },
    skills: {
      sectionLabel: 'Skills',
      list: []
    },
    projects: {
      sectionLabel: 'Projects',
      list: []
    },
    interests: {
      sectionLabel: 'Interests',
      list: []
    }
  }
}

export default component$(() => {
  // states
  const template = useStore<Template>(DEFAULT_TEMPLATE);

  // actions
  const updateHeaderProperty = $((e: QwikChangeEvent<HTMLInputElement>) => {
    template.sections.header[e.target.name] = e.target.value;
  })

  const updateProfileProperty = $((e: QwikChangeEvent<HTMLInputElement>) => {
    template.sections.header.profiles[e.target.name] = e.target.value;
  })

  // renderers
  function renderHeader() {
    return (
      <div class='flex justify-between w-full items-start'>
        <div class='w-1/2'>
          <Input
            name="name"
            class="w-full text-[36px]"
            onChange$={updateHeaderProperty}
            value={template.sections.header.name}
          />
          <Input
            name='description'
            onChange$={updateHeaderProperty}
            value={template.sections.header.description}
            class="text-gray-300 mt-8 w-full text-[16px]"
          />
          <Input
            name='postScript'
            onChange$={updateHeaderProperty}
            value={template.sections.header.postScript}
            class="text-gray-400 mt-4 w-full text-[14px]"
          />
        </div>

        <div class='w-1/2'>
          <div class='flex items-center justify-end'>
            <Input
              name='github'
              placeholder="Github"
              onChange$={updateProfileProperty}
              value={template.sections.header.profiles.github}
              class='mr-8 text-gray-400 text-end w-full text-[12px]'
            />
            <a href={template.sections.header.profiles.github} target="__blank">
              <GithubIcon color="white" height="20" width="20" />
            </a>
          </div>
          <div class='flex items-center justify-end'>
            <Input
              name='linkedIn'
              placeholder="LinkedIn"
              onChange$={updateProfileProperty}
              value={template.sections.header.profiles.linkedIn}
              class='mr-8 text-gray-400 text-end w-full text-[12px]'
            />
            <a href={template.sections.header.profiles.linkedIn} target="__blank">
              <LinkedInIcon color="white" height="20" width="20" />
            </a>
          </div>
          <div class='flex items-center justify-end'>
            <Input
              name='email'
              placeholder="Email"
              onChange$={updateProfileProperty}
              value={template.sections.header.profiles.email}
              class='mr-8 text-gray-400 text-end w-full text-[12px]'
            />
            <EmailIcon color="white" class='px-2' height="20" width="20" />
          </div>
          <div class='flex items-center justify-end'>
            <Input
              name='phone'
              placeholder="Phone Number"
              onChange$={updateProfileProperty}
              value={template.sections.header.profiles.phone}
              class='mr-8 text-gray-400 text-end w-full text-[12px]'
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
        <div class='w-1/2 border-r-[1px] border-gray-500 pr-12 space-y-20'>
          <Experience experience={template.sections.experience} />
          <Education education={template.sections.education} />
        </div>
        <div class='w-1/2 pl-12 space-y-20'>
          <Projects projects={template.sections.projects} />
          <Skills skills={template.sections.skills} />
          <Interests interests={template.sections.interests} />
        </div>
      </div>
    )
  }

  return (
    <div class='py-30 flex justify-center items-center'>
      <div class={`${styles.page} p-20 flex flex-col text-slate-200`}>
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