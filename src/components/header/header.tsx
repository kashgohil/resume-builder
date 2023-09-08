import { component$ } from "@builder.io/qwik";

export const Header = component$(() => {
  // props and metadata



  return (

    <header class='p-20 flex items-start justify-between'>
      <div>
        <h1 class='text-2xl text-slate-200'>Resume Builder</h1>
        <h3 class='text-base text-gray-500'>make it yours</h3>
      </div>
      <div>
        <button class='outline-none bg-gray-300 p-8 rounded'>
          Toggle
        </button>
      </div>
    </header>

  )
})