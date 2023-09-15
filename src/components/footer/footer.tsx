import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  // props and metadata


  return (
    <footer class='w-full p-20 flex items-center justify-center text-gray-400 hide-in-print'>
      Made by <span class='font-semibold ml-4 text-slate-200'>Kashyap Gohil</span>
    </footer>
  )
})