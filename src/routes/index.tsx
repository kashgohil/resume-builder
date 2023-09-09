
import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import styles from './index.module.css';
import ImgResume from '/public/resume.svg?jsx';


export default component$(() => {
  return (
    <>
      <section class='h-full'>
        <div class='text-center text-3xl text-slate-200 my-20'>
          Create Clean Resumes
          <div class='mt-4 text-2xl text-slate-600'>
            without any hassle, without any charges
          </div>
        </div>
        <div class='flex items-center justify-center'>
          <Button variant='link' to='/builder'>
            Create Your Resume
          </Button>
        </div>
        <div class='flex items-center justify-center py-50 rounded'>
          <ImgResume
            class={`border-2 border-transparent transition-all ease-in-out delay-75 cursor-pointer hover:border-slate-100 my-40 hover:border-2 rounded ${styles.shadow} ${styles.resume} ${styles.preview} ${styles.active}`}
          />
        </div>
      </section>

    </>
  );
});

export const head: DocumentHead = {
  title: "Resume Builder",
  meta: [
    {
      name: "description",
      content: "Resume Builder",
    },
  ],
};