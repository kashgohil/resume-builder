import { component$ } from "@builder.io/qwik";

export const Header = component$(() => {
  // props and metadata



  return (
    <>
      <header class='sticky top-0 w-full left-0 pb-30 transparent'>
        <div class='px-30 pt-30 flex items-center justify-between w-full backdrop-blur-md'>
          <div>
            <h1 class='text-2xl text-slate-200'>Resume Builder</h1>
            <h3 class='text-base text-gray-500'>make it yours</h3>
          </div>
        </div>
      </header>
    </>

  )
})